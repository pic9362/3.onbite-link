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
      className="flex max-w-[640px] flex-col gap-5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]"
    >
      <LinkInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="submit"
        className="btn-primary rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
      >
        저장
      </button>
    </form>
  );
}
