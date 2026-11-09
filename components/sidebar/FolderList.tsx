"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";
import NewFolderModal from "../folder/NewFolderModal";
import DeleteFolderModal from "../folder/DeleteFolderModal";
import { useFolders } from "../folder/FoldersProvider";

type Props = {
  folders: Folder[];
  activeId?: string;
};

export default function FolderList({ folders, activeId }: Props) {
  const router = useRouter();
  const { renameFolder, deleteFolder } = useFolders();
  const [target, setTarget] = useState<Folder | null>(null);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);
  const close = useCallback(() => setTarget(null), []);
  const closeEdit = useCallback(() => setEditTarget(null), []);

  const confirmDelete = () => {
    if (!target) return;
    deleteFolder(target.id);
    if (activeId === target.id) router.push("/");
    setTarget(null);
  };

  return (
    <nav aria-label="폴더">
      <h2 className="mb-2 px-3.5 text-sm font-bold text-[var(--text-sub)]">
        폴더
      </h2>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <SidebarItem
              label={folder.name}
              href={`/folder/${folder.id}`}
              count={folder.count}
              active={activeId === folder.id}
              onEdit={() => setEditTarget(folder)}
              onDelete={() => setTarget(folder)}
            />
          </li>
        ))}
      </ul>
      {editTarget && (
        <NewFolderModal
          title="폴더 이름 수정"
          initialName={editTarget.name}
          onClose={closeEdit}
          onSave={(name) => renameFolder(editTarget.id, name)}
        />
      )}
      {target && (
        <DeleteFolderModal
          folderName={target.name}
          onClose={close}
          onConfirm={confirmDelete}
        />
      )}
    </nav>
  );
}
