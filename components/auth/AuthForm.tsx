"use client";

import Link from "next/link";

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
};

// UI 전용 폼: 아직 로그인/회원가입 기능은 구현하지 않음
export default function AuthForm({
  fields,
  submitLabel,
  footerText,
  footerLinkLabel,
  footerHref,
}: Props) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
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
            className="field rounded-xl bg-[var(--bg)] px-4 py-3.5 text-[17px] text-[var(--text)] outline-none"
          />
        </div>
      ))}
      <button
        type="submit"
        className="btn-primary mt-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
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
