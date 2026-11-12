"use client";

import Link from "next/link";
import SidebarItem from "./SidebarItem";
import FolderList from "./FolderList";
import LogoutButton from "./LogoutButton";
import { useLinks } from "../link/LinksProvider";
import { useFolders } from "../folder/FoldersProvider";

type Props = {
  activeId?: string;
};

export default function Sidebar({ activeId = "all" }: Props) {
  const { folders } = useFolders();
  const { links } = useLinks();
  const totalCount = links.length;
  const foldersWithCount = folders.map((f) => ({
    ...f,
    count: links.filter((l) => l.folderId === f.id).length,
  }));

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-4 overflow-y-auto px-4 pb-4 pt-9 md:flex">
      <SidebarItem
        label="All"
        href="/"
        count={totalCount}
        active={activeId === "all"}
      />
      <FolderList folders={foldersWithCount}activeId={activeId} />
      <LogoutButton />
      <Link
        href="/privacy"
        className="px-3.5 text-xs text-[var(--text-sub)] hover:underline"
      >
        개인정보 처리방침
      </Link>
    </aside>
  );
}
