"use client";

import { useEffect, useState } from "react";
import type { Folder, LinkItem } from "@/lib/types";
import FolderSelect from "../new-link/FolderSelect";

type Props = {
  link: LinkItem;
  folders: Folder[];
  onClose: () => void;
  onSave: (patch: Pick<LinkItem, "folderId" | "title" | "description">) => void;
};

export default function EditLinkModal({
  link,
  folders,
  onClose,
  onSave,
}: Props) {
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const trimmedTitle = title.trim();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-link-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (!trimmedTitle || !folderId) return;
          onSave({
            folderId,
            title: trimmedTitle,
            description: description.trim(),
          });
          onClose();
        }}
        className="flex w-full max-w-[480px] flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[var(--shadow-card-hover)]"
      >
        <h2
          id="edit-link-title"
          className="text-xl font-bold leading-[1.4] text-[var(--text)]"
        >
          링크 수정
        </h2>

        <FolderSelect
          folders={folders}
          value={folderId}
          onChange={setFolderId}
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-title"
            className="text-sm font-bold text-[var(--text-sub)]"
          >
            제목
          </label>
          <input
            id="link-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-description"
            className="text-sm font-bold text-[var(--text-sub)]"
          >
            설명
          </label>
          <textarea
            id="link-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="field resize-none rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 rounded-xl bg-[var(--accent-soft)] px-5 py-3.5 text-[17px] font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!trimmedTitle}
            className="btn-primary flex-1 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--text-sub)]"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
