import FolderView from "@/components/folder/FolderView";

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;

  return <FolderView folderId={id} />;
}
