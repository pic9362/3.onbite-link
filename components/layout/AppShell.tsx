import type { ReactNode } from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import Sidebar from "../sidebar/Sidebar";
import { links } from "@/lib/mock-data";

type Props = {
  children: ReactNode;
  activeId?: string;
};

export default function AppShell({ children, activeId }: Props) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar totalCount={links.length} activeId={activeId} />
        <MainSection>{children}</MainSection>
      </div>
    </div>
  );
}
