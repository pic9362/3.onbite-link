import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";
import FolderList from "./FolderList";

type Props = {
  folders: Folder[];
  totalCount: number;
  activeId?: string;
};

export default function Sidebar({
  folders,
  totalCount,
  activeId = "all",
}: Props) {
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
