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
  const gradient = gradients[Number(link.id) % gradients.length];

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div
        className={`flex h-32 items-center justify-center bg-gradient-to-br ${gradient} text-3xl font-bold text-white/90`}
        aria-hidden
      >
        {hostname.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-1 font-semibold group-hover:underline">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-zinc-400">
          <span className="truncate">{hostname}</span>
          {folderName && (
            <span className="ml-2 shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
              {folderName}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
