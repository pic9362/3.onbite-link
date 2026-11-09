"use client";

import { useCallback, useState } from "react";
import type { Folder, LinkItem } from "@/lib/types";
import LinkCard from "./LinkCard";
import { useLinks } from "./LinksProvider";
import ConfirmDeleteModal from "../folder/ConfirmDeleteModal";

type Props = {
  links: LinkItem[];
  folders: Folder[];
};

export default function LinkGrid({ links, folders }: Props) {
  const { deleteLink } = useLinks();
  const [target, setTarget] = useState<LinkItem | null>(null);
  const close = useCallback(() => setTarget(null), []);
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {links.map((link) => (
          <li key={link.id} className="flex">
            <LinkCard
              link={link}
              folderName={folderNames.get(link.folderId)}
              onDelete={() => setTarget(link)}
            />
          </li>
        ))}
      </ul>
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
