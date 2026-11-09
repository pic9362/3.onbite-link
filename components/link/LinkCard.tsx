import type { LinkItem } from "@/lib/types";

type Props = {
  link: LinkItem;
  folderName?: string;
};

const gradients = [
  "from-sky-200 to-indigo-300",
  "from-rose-200 to-orange-300",
  "from-emerald-200 to-teal-300",
  "from-violet-200 to-fuchsia-300",
  "from-amber-200 to-yellow-300",
];

export default function LinkCard({ link, folderName }: Props) {
  const hostname = new URL(link.url).hostname.replace(/^www\./, "");
  const seed = [...link.id].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const gradient = gradients[seed % gradients.length];

  return (
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
  );
}
