"use client";

import { useCallback, useState } from "react";
import type { Folder, LinkItem } from "@/lib/types";
import LinkCard from "./LinkCard";
import { useLinks } from "./LinksProvider";
import EditLinkModal from "./EditLinkModal";
import ConfirmDeleteModal from "../folder/ConfirmDeleteModal";

type Props = {
  links: LinkItem[];
  folders: Folder[];
};

export default function LinkGrid({ links, folders }: Props) {
  const { updateLink, deleteLink } = useLinks();
  const [target, setTarget] = useState<LinkItem | null>(null);
  const [editTarget, setEditTarget] = useState<LinkItem | null>(null);
  const close = useCallback(() => setTarget(null), []);
  const closeEdit = useCallback(() => setEditTarget(null), []);
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {links.map((link) => (
          <li key={link.id} className="flex">
            <LinkCard
              link={link}
              folderName={folderNames.get(link.folderId)}
              onEdit={() => setEditTarget(link)}
              onDelete={() => setTarget(link)}
            />
          </li>
        ))}
      </ul>
      {editTarget && (
        <EditLinkModal
          link={editTarget}
          folders={folders}
          onClose={closeEdit}
          onSave={(patch) => updateLink(editTarget.id, patch)}
        />
      )}
      {target && (
        <ConfirmDeleteModal
          title="링크를 삭제할까요?"
          message={`'${target.title}' 링크가 삭제됩니다. 이 작업은 되돌릴 수 없어요.`}
          onClose={close}
          onConfirm={() => {
            deleteLink(target.id);
            setTarget(null);
          }}
        />
      )}
    </>
  );
}
