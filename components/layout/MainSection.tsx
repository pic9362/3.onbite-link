import type { ReactNode } from "react";

export default function MainSection({ children }: { children: ReactNode }) {
  return <main className="flex-1 overflow-y-auto p-6">{children}</main>;
}
