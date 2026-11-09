import type { Metadata } from "next";
import "./globals.css";
import { FoldersProvider } from "@/components/folder/FoldersProvider";
import { folders } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FoldersProvider initialFolders={folders}>{children}</FoldersProvider>
      </body>
    </html>
  );
}
