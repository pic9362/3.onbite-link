"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { LinkItem } from "@/lib/types";

type LinksContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => LinkItem;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: ReactNode;
}) {
  const [links, setLinks] = useState(initialLinks);

  const addLink = useCallback((data: Omit<LinkItem, "id" | "createdAt">) => {
    const link: LinkItem = {
      ...data,
      id: `link-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLinks((prev) => [link, ...prev]);
    return link;
  }, []);

  return (
    <LinksContext.Provider value={{ links, addLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within LinksProvider");
  return ctx;
}
