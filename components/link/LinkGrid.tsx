import type { Folder, LinkItem } from "@/lib/types";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
  folders: Folder[];
};

export default function LinkGrid({ links, folders }: Props) {
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {links.map((link) => (
        <li key={link.id} className="flex">
          <LinkCard link={link} folderName={folderNames.get(link.folderId)} />
        </li>
      ))}
    </ul>
  );
}
