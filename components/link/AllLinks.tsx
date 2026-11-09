"use client";

import LinkGrid from "./LinkGrid";
import { useLinks } from "./LinksProvider";
import { useFolders } from "../folder/FoldersProvider";

export default function AllLinks() {
  const { links } = useLinks();
  const { folders } = useFolders();
  return <LinkGrid links={links} folders={folders} />;
}
