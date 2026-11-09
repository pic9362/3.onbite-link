"use client";

import { useState } from "react";
import type { Folder } from "@/lib/types";
import LinkInput from "./LinkInput";
import FolderSelect from "./FolderSelect";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: 저장 로직 연결
      }}
      className="flex max-w-xl flex-col gap-5"
    >
      <LinkInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="submit"
        className="h-10 self-end rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        저장
      </button>
    </form>
  );
}
