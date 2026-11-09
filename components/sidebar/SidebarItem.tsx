"use client";

import Link from "next/link";

type Props = {
  label: string;
  href: string;
  count?: number;
  active?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function SidebarItem({
  label,
  href,
  count,
  active = false,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="sidebar-row relative">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`sidebar-item flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[15px] ${
          active
            ? "bg-[var(--accent-soft)] font-bold text-[var(--accent)]"
            : "text-[var(--text-sub)]"
        }`}
      >
        <span className="truncate">{label}</span>
        {count !== undefined && (
          <span className="sidebar-count ml-2 text-sm text-[var(--text-sub)]">
            {count}
          </span>
        )}
      </Link>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={`${label} 폴더 이름 수정`}
          className="row-action absolute right-10 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-sub)]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label={`${label} 폴더 삭제`}
          className="row-action row-action-danger absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-sub)]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      )}
    </div>
  );
}
