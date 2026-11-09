type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LinkInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="url" className="text-sm font-medium">
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
        className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm outline-none focus:border-foreground dark:border-zinc-700"
      />
    </div>
  );
}
