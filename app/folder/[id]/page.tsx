import { Suspense } from "react";
import FolderView from "@/components/folder/FolderView";

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
