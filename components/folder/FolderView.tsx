"use client";

import AppShell from "../layout/AppShell";
import LinkGrid from "../link/LinkGrid";
import { useLinks } from "../link/LinksProvider";
import { useFolders } from "./FoldersProvider";

export default function FolderView({ folderId }: { folderId: string }) {
  const { folders } = useFolders();
  const { links } = useLinks();
  const folder = folders.find((f) => f.id === folderId);
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <AppShell activeId={folderId}>
      {folder ? (
        <>
          <h1 className="mb-6 text-[26px] font-bold leading-[1.3] text-[var(--text)]">
            {folder.name}
          </h1>
          <LinkGrid links={folderLinks} folders={folders} />
        </>
      ) : (
        <p className="text-[var(--text-sub)]">존재하지 않는 폴더입니다.</p>
      )}
    </AppShell>
  );
}
