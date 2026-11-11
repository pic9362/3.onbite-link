"use client";

import Link from "next/link";
import { useState } from "react";

type Field = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
};

type Props = {
  fields: Field[];
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
};

// 공용 인증 폼: onSubmit이 없으면 제출해도 아무 동작도 하지 않음 (로그인은 미구현)
export default function AuthForm({
  fields,
  submitLabel,
  footerText,
  footerLinkLabel,
  footerHref,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const allFilled = fields.every((f) => (values[f.id] ?? "") !== "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allFilled || pending || !onSubmit) return;
    setPending(true);
    try {
      await onSubmit(values);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {fields.map((f) => (
        <div key={f.id} className="flex flex-col gap-2">
          <label htmlFor={f.id} className="text-sm font-bold text-[var(--text-sub)]">
            {f.label}
          </label>
          <input
            id={f.id}
            name={f.id}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            value={values[f.id] ?? ""}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, [f.id]: e.target.value }))
            }
            className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={!allFilled || pending}
        className="btn-primary mt-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--text-sub)]"
      >
        {submitLabel}
      </button>
      <p className="text-center text-sm text-[var(--text-sub)]">
        {footerText}{" "}
        <Link
          href={footerHref}
          className="logo-hover font-bold text-[var(--accent)]"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </form>
  );
}
