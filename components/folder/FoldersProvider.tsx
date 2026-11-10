"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: ReactNode;
}) {
  const [folders, setFolders] = useState(initialFolders);

  const addFolder = useCallback(async (name: string) => {
    const { data, error } = await createClient()
      .from("folder")
      .insert({ name })
      .select("id, name")
      .single();
    if (error) throw error;
    setFolders((prev) => [
      ...prev,
      { id: String(data.id), name: data.name, count: 0 },
    ]);
  }, []);

  const deleteFolder = useCallback(async (id: string) => {
    const { error } = await createClient()
      .from("folder")
      .delete()
      .eq("id", Number(id));
    if (error) throw error;
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const renameFolder = useCallback(async (id: string, name: string) => {
    const { error } = await createClient()
      .from("folder")
      .update({ name })
      .eq("id", Number(id));
    if (error) throw error;
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  }, []);

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, renameFolder, deleteFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FoldersContext);
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider");
  return ctx;
}
