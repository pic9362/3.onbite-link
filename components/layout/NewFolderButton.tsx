"use client";

import { useCallback, useState } from "react";
import NewFolderModal from "../folder/NewFolderModal";
import { useFolders } from "../folder/FoldersProvider";

export default function NewFolderButton() {
  const [open, setOpen] = useState(false);
  const { addFolder } = useFolders();
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--accent-soft)] px-4 text-[15px] font-bold text-[var(--accent)]"
      >
        새 폴더
      </button>
      {open && <NewFolderModal onClose={close} onSave={addFolder} />}
    </>
  );
}
