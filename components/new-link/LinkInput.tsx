type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LinkInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="url" className="text-sm font-bold text-[var(--text-sub)]">
        링크
      </label>
      <input
        id="url"
        name="url"
        type="url"
        required
        placeholder="https://example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
      />
    </div>
  );
}
