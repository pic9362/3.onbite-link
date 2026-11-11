import type { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-9">
      <div className="w-full max-w-[420px] rounded-2xl bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
        <h1 className="mb-8 text-center text-[26px] font-bold leading-[1.3] tracking-tight text-[var(--text)]">
          한입 링크
        </h1>
        {children}
      </div>
    </main>
  );
}
