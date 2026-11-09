"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  initialName?: string;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function NewFolderModal({
  title = "새 폴더",
  initialName = "",
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = name.trim();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
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
        aria-labelledby="new-folder-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (!trimmed) return;
          onSave(trimmed);
          onClose();
        }}
        className="flex w-full max-w-[420px] flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[var(--shadow-card-hover)]"
      >
        <h2
          id="new-folder-title"
          className="text-xl font-bold leading-[1.4] text-[var(--text)]"
        >
          {title}
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="folder-name"
            className="text-sm font-bold text-[var(--text-sub)]"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            placeholder="폴더 이름을 입력하세요"
            className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
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
            disabled={!trimmed}
            className="btn-primary flex-1 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--text-sub)]"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
