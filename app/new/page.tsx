import AppShell from "@/components/layout/AppShell";
import NewLinkForm from "@/components/new-link/NewLinkForm";
import { folders } from "@/lib/mock-data";

export const metadata = { title: "새 링크 | 한입 링크" };

export default function NewLinkPage() {
  return (
    <AppShell>
      <h1 className="mb-6 text-xl font-bold">새 링크 추가</h1>
      <NewLinkForm folders={folders} />
    </AppShell>
  );
}
