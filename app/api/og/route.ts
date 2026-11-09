import type { NextRequest } from "next/server";
import { extractOpenGraph } from "@/lib/open-graph";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return Response.json({ error: "올바른 URL이 아닙니다." }, { status: 400 });
  }

  try {
    return Response.json(await extractOpenGraph(url));
  } catch (e) {
    const message = e instanceof Error ? e.message : "정보를 가져오지 못했습니다.";
    return Response.json({ error: message }, { status: 422 });
  }
}
