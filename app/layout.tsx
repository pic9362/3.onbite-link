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

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

async function DataProviders({ children }: { children: ReactNode }) {
  await connection();
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("folder")
    .select("id, name")
    .order("id", { ascending: true });
  const folders: Folder[] = (data ?? []).map((f) => ({
    id: String(f.id),
    name: f.name,
    count: 0,
  }));

  const { data: linkRows } = await supabase
    .from("link")
    .select("id, url, title, description, thumbnail_url, folder_id, created_at")
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
    <FoldersProvider initialFolders={folders}>
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
