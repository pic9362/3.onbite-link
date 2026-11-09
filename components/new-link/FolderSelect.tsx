import type { Folder } from "@/lib/types";

type Props = {
  folders: Folder[];
  value: string;
  onChange: (value: string) => void;
};

export default function FolderSelect({ folders, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="folder"
        className="text-sm font-bold text-[var(--text-sub)]"
      >
        폴더
      </label>
      <select
        id="folder"
        name="folder"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
