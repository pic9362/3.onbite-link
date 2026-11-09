import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";

type Props = {
  folders: Folder[];
  activeId?: string;
};

export default function FolderList({ folders, activeId }: Props) {
  return (
    <nav aria-label="폴더">
      <h2 className="mb-2 px-3.5 text-sm font-bold text-[var(--text-sub)]">폴더</h2>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <SidebarItem
              label={folder.name}
              href={`/folder/${folder.id}`}
              count={folder.count}
              active={activeId === folder.id}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
