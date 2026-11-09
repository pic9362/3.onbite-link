import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="logo-hover text-xl font-bold tracking-tight text-[var(--text)]"
    >
      한입 링크
    </Link>
  );
}
