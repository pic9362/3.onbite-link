import type { Metadata } from "next";
import "./globals.css";
import { FoldersProvider } from "@/components/folder/FoldersProvider";
import { LinksProvider } from "@/components/link/LinksProvider";
import { links } from "@/lib/mock-data";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Folder } from "@/lib/types";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
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

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FoldersProvider initialFolders={folders}>
          <LinksProvider initialLinks={links}>{children}</LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
