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
      className={`sidebar-item flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[15px] ${
        active
          ? "bg-[var(--accent-soft)] font-bold text-[var(--accent)]"
          : "text-[var(--text-sub)]"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="text-sm text-[var(--text-sub)]">{count}</span>
      )}
    </Link>
  );
}
