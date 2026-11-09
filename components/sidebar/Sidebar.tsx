"use client";

import SidebarItem from "./SidebarItem";
import FolderList from "./FolderList";
import { useFolders } from "../folder/FoldersProvider";

type Props = {
  totalCount: number;
  activeId?: string;
};

export default function Sidebar({ totalCount, activeId = "all" }: Props) {
  const { folders } = useFolders();

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-4 overflow-y-auto px-4 pb-4 pt-9 md:flex">
      <SidebarItem
        label="All"
        href="/"
        count={totalCount}
        active={activeId === "all"}
      />
      <FolderList folders={folders} activeId={activeId} />
    </aside>
  );
}
