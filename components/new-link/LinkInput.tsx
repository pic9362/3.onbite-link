type Props = {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

export default function LinkInput({ value, onChange, hasError }: Props) {
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
        aria-invalid={hasError}
        className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none aria-[invalid=true]:shadow-[0_0_0_2px_var(--error)]"
      />
    </div>
  );
}
