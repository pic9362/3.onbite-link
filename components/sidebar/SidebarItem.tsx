import Link from "next/link";

type Props = {
  label: string;
  href: string;
  count?: number;
  active?: boolean;
};

export default function SidebarItem({
  label,
  href,
  count,
  active = false,
}: Props) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
          : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="text-xs text-zinc-400">{count}</span>
      )}
    </Link>
  );
}
