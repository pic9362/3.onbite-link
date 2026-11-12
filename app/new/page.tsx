import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import NewLinkForm from "@/components/new-link/NewLinkForm";

export const metadata: Metadata = {
  title: "새 링크",
  description: "새로운 링크를 저장하세요.",
  openGraph: { title: "새 링크 | 한입 링크" },
};

export default function NewLinkPage() {
  return (
    <AppShell>
      <h1 className="mb-6 text-[26px] font-bold leading-[1.3] text-[var(--text)]">
        새 링크 추가
      </h1>
      <NewLinkForm />
    </AppShell>
  );
}
