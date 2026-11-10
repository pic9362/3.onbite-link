"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { LinkItem } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type LinksContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => Promise<LinkItem>;
  updateLink: (
    id: string,
    patch: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
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

  const addLink = useCallback(
    async (data: Omit<LinkItem, "id" | "createdAt">) => {
      const { data: row, error } = await createClient()
        .from("link")
        .insert({
          url: data.url,
          title: data.title,
          description: data.description,
          thumbnail_url: data.thumbnail ?? null,
          folder_id: data.folderId ? Number(data.folderId) : null,
        })
        .select("id, created_at")
        .single();
      if (error) throw error;
      const link: LinkItem = {
        ...data,
        id: String(row.id),
        createdAt: row.created_at.slice(0, 10),
      };
      setLinks((prev) => [link, ...prev]);
      return link;
    },
    [],
  );

  const deleteLink = useCallback(async (id: string) => {
    const { error } = await createClient()
      .from("link")
      .delete()
      .eq("id", Number(id));
    if (error) throw error;
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateLink = useCallback(
    async (
      id: string,
      patch: Pick<LinkItem, "folderId" | "title" | "description">,
    ) => {
      const { error } = await createClient()
        .from("link")
        .update({
          folder_id: patch.folderId ? Number(patch.folderId) : null,
          title: patch.title,
          description: patch.description,
        })
        .eq("id", Number(id));
      if (error) throw error;
      setLinks((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...patch } : l)),
      );
    },
    [],
  );

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within LinksProvider");
  return ctx;
}
