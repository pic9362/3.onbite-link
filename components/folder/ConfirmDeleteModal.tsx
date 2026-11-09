"use client";

import { useEffect } from "react";

type Props = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  title,
  message,
  onClose,
  onConfirm,
}: Props) {
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
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[420px] flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[var(--shadow-card-hover)]"
      >
        <div className="flex flex-col gap-2">
          <h2
            id="confirm-delete-title"
            className="text-xl font-bold leading-[1.4] text-[var(--text)]"
          >
            {title}
          </h2>
          <p className="text-[17px] text-[var(--text-sub)]">
            {message}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="btn-secondary flex-1 rounded-xl bg-[var(--accent-soft)] px-5 py-3.5 text-[17px] font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger flex-1 rounded-xl bg-[var(--error)] px-5 py-3.5 text-[17px] font-bold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
