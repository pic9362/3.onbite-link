import Logo from "./Logo";
import NewFolderButton from "./NewFolderButton";
import NewLinkButton from "./NewLinkButton";

export default function Header() {
  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between bg-[var(--surface)] px-5 shadow-[var(--shadow-nav)]">
      <Logo />
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  );
}
