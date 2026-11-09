import type { LinkItem } from "@/lib/types";

type Props = {
  link: LinkItem;
  folderName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const gradients = [
  "from-sky-200 to-indigo-300",
  "from-rose-200 to-orange-300",
  "from-emerald-200 to-teal-300",
  "from-violet-200 to-fuchsia-300",
  "from-amber-200 to-yellow-300",
];

export default function LinkCard({
  link,
  folderName,
  onEdit,
  onDelete,
}: Props) {
  const hostname = new URL(link.url).hostname.replace(/^www\./, "");
  const seed = [...link.id].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const gradient = gradients[seed % gradients.length];

  return (
    <div className="link-card relative h-full w-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[var(--surface)]"
      >
        {link.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-32 w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-32 items-center justify-center bg-gradient-to-br ${gradient} text-3xl font-bold text-white`}
            aria-hidden
          >
            {hostname.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1.5 p-5">
          <h3 className="line-clamp-1 text-[17px] font-bold text-[var(--text)]">
            {link.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-snug text-[var(--text-sub)]">
            {link.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3 text-sm text-[var(--text-sub)]">
            <span className="truncate">{hostname}</span>
            {folderName && (
              <span className="ml-2 shrink-0 rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 text-sm text-[var(--accent)]">
                {folderName}
              </span>
            )}
          </div>
        </div>
      </a>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={`${link.title} 링크 수정`}
          className="card-action card-action-edit absolute right-14 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--text-sub)] shadow-[var(--shadow-card)]"
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
          aria-label={`${link.title} 링크 삭제`}
          className="card-action absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--text-sub)] shadow-[var(--shadow-card)]"
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
