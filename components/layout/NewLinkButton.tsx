import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary inline-flex h-10 items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 text-[15px] font-bold text-white"
    >
      <span aria-hidden className="text-lg leading-none">
        +
      </span>
      새 링크
    </Link>
  );
}
