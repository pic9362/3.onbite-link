"use client";

import { useEffect } from "react";

type Props = {
  message: string | null;
  onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="fixed left-1/2 top-5 z-50 w-[calc(100%-40px)] max-w-[420px] -translate-x-1/2 rounded-xl bg-[var(--error)] px-5 py-3.5 text-center text-[15px] font-bold text-white shadow-[var(--shadow-card-hover)]"
    >
      {message}
    </div>
  );
}
