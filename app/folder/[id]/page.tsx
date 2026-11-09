import FolderView from "@/components/folder/FolderView";
import { folders } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: folder.id }));
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;

  return <FolderView folderId={id} />;
}
