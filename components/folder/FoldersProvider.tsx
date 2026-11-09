"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Folder } from "@/lib/types";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
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

  const addFolder = useCallback((name: string) => {
    setFolders((prev) => [
      ...prev,
      { id: `folder-${Date.now()}`, name, count: 0 },
    ]);
  }, []);

  const deleteFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <FoldersContext.Provider value={{ folders, addFolder, deleteFolder }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FoldersContext);
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider");
  return ctx;
}
