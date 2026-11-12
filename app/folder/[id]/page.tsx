import type { Metadata } from "next";
import { Suspense } from "react";
import FolderView from "@/components/folder/FolderView";

export const metadata: Metadata = {
  title: "폴더",
  description: "폴더에 저장된 링크를 확인하세요.",
  openGraph: { title: "폴더 | 한입 링크" },
};

export default function FolderPage({ params }: PageProps<"/folder/[id]">) {
  return (
    <Suspense
      fallback={<p className="p-6 text-[var(--text-sub)]">불러오는 중...</p>}
    >
      <Folder params={params} />
    </Suspense>
  );
}

async function Folder({ params }: Pick<PageProps<"/folder/[id]">, "params">) {
  const { id } = await params;

  return <FolderView folderId={id} />;
}
