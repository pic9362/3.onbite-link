"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OpenGraphData } from "@/lib/types";
import { useFolders } from "../folder/FoldersProvider";
import { useLinks } from "../link/LinksProvider";
import LinkInput from "./LinkInput";
import FolderSelect from "./FolderSelect";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url.trim())}`);
      const data: OpenGraphData & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "링크 정보를 가져오지 못했습니다.");

      addLink({
        url: data.url,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        folderId,
      });
      router.push(`/folder/${folderId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "링크 정보를 가져오지 못했습니다.",
      );
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[640px] flex-col gap-5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]"
    >
      <LinkInput value={url} onChange={setUrl} hasError={!!error} />
      {error && (
        <p role="alert" className="-mt-3 text-sm text-[var(--error)]">
          {error}
        </p>
      )}
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--text-sub)]"
      >
        {loading ? "링크 정보를 가져오는 중..." : "확인"}
      </button>
    </form>
  );
}
