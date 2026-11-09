import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { OpenGraphData } from "./types";

const MAX_REDIRECTS = 3;
const MAX_BYTES = 1024 * 1024;

function isPrivateAddress(ip: string) {
  if (ip === "::1" || ip === "::") return true;
  const lower = ip.toLowerCase();
  if (lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80"))
    return true;
  const v4 = lower.startsWith("::ffff:") ? lower.slice(7) : lower;
  const m = v4.match(/^(\d+)\.(\d+)\.\d+\.\d+$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

async function assertPublicUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("http(s) 링크만 지원합니다.");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addresses = isIP(host)
    ? [{ address: host }]
    : await lookup(host, { all: true });
  if (addresses.some((a) => isPrivateAddress(a.address))) {
    throw new Error("허용되지 않는 주소입니다.");
  }
}

async function fetchHtml(startUrl: URL) {
  let current = startUrl;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    await assertPublicUrl(current);
    const res = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; OnbiteLinkBot/1.0)",
        accept: "text/html,application/xhtml+xml",
      },
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new Error("잘못된 리다이렉트입니다.");
      current = new URL(location, current);
      continue;
    }
    if (!res.ok) throw new Error(`페이지를 불러오지 못했습니다. (${res.status})`);
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("html")) return { html: "", finalUrl: current };
    const buf = await res.arrayBuffer();
    const html = new TextDecoder().decode(buf.slice(0, MAX_BYTES));
    return { html, finalUrl: current };
  }
  throw new Error("리다이렉트가 너무 많습니다.");
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .trim();
}

function parseMeta(html: string) {
  const head = html.split(/<\/head>/i)[0] ?? html;
  const meta = new Map<string, string>();
  for (const tag of head.match(/<meta\s[^>]*>/gi) ?? []) {
    const attrs: Record<string, string> = {};
    for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
      attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? "";
    }
    const key = (attrs.property ?? attrs.name)?.toLowerCase();
    if (key && attrs.content && !meta.has(key)) {
      meta.set(key, decodeEntities(attrs.content));
    }
  }
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return { meta, title: title ? decodeEntities(title) : undefined };
}

export async function extractOpenGraph(rawUrl: string): Promise<OpenGraphData> {
  const { html, finalUrl } = await fetchHtml(new URL(rawUrl));
  const { meta, title } = parseMeta(html);

  const image = meta.get("og:image") ?? meta.get("twitter:image");
  let thumbnail: string | undefined;
  if (image) {
    try {
      thumbnail = new URL(image, finalUrl).toString();
    } catch {}
  }

  return {
    url: rawUrl,
    title:
      meta.get("og:title") ??
      meta.get("twitter:title") ??
      title ??
      finalUrl.hostname.replace(/^www\./, ""),
    description:
      meta.get("og:description") ??
      meta.get("twitter:description") ??
      meta.get("description") ??
      "",
    thumbnail,
  };
}
