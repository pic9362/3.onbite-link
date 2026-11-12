import type { Metadata } from "next";
import { Suspense } from "react";
import type { ReactNode } from "react";
import "./globals.css";
import { FoldersProvider } from "@/components/folder/FoldersProvider";
import { LinksProvider } from "@/components/link/LinksProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { connection } from "next/server";
import type { Folder, LinkItem } from "@/lib/types";

const siteName = "한입 링크";
const siteDescription = "북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  // app/favicon.ico 는 파일 컨벤션으로 자동 등록됨
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: "/thumbnail.png", width: 2400, height: 1260, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/thumbnail.png"],
  },
};

async function DataProviders({ children }: { children: ReactNode }) {
  await connection();
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    return (
      <FoldersProvider key="anonymous" initialFolders={[]}>
        <LinksProvider initialLinks={[]}>{children}</LinksProvider>
      </FoldersProvider>
    );
  }

  const { data } = await supabase
    .from("folder")
    .select("id, name")
    .eq("user_id", userId)
    .order("id", { ascending: true });
  const folders: Folder[] = (data ?? []).map((f) => ({
    id: String(f.id),
    name: f.name,
    count: 0,
  }));

  const { data: linkRows } = await supabase
    .from("link")
    .select("id, url, title, description, thumbnail_url, folder_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  const links: LinkItem[] = (linkRows ?? []).map((l) => ({
    id: String(l.id),
    url: l.url,
    title: l.title ?? l.url,
    description: l.description ?? "",
    thumbnail: l.thumbnail_url ?? undefined,
    folderId: l.folder_id === null ? "" : String(l.folder_id),
    createdAt: l.created_at.slice(0, 10),
  }));

  return (
    <FoldersProvider key={userId} initialFolders={folders}>
      <LinksProvider initialLinks={links}>{children}</LinksProvider>
    </FoldersProvider>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Suspense
          fallback={
            <p className="p-6 text-[var(--text-sub)]">불러오는 중...</p>
          }
        >
          <DataProviders>{children}</DataProviders>
        </Suspense>
      </body>
    </html>
  );
}
