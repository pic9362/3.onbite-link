import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import LinkGrid from "@/components/link/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: folder.id }));
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folder = folders.find((f) => f.id === id);
  if (!folder) notFound();

  const folderLinks = links.filter((link) => link.folderId === folder.id);

  return (
    <AppShell activeId={folder.id}>
      <h1 className="mb-6 text-xl font-bold">{folder.name}</h1>
      <LinkGrid links={folderLinks} folders={folders} />
    </AppShell>
  );
}
