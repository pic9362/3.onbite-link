import AppShell from "@/components/layout/AppShell";
import LinkGrid from "@/components/link/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export default function Home() {
  return (
    <AppShell>
      <LinkGrid links={links} folders={folders} />
    </AppShell>
  );
}
