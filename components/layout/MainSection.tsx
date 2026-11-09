import type { ReactNode } from "react";

export default function MainSection({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto px-5 pb-10 pt-9 md:px-8">
      {children}
    </main>
  );
}
