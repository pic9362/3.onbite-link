"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    if (pending) return;
    setPending(true);
    const { error } = await createClient().auth.signOut();
    if (error) {
      setPending(false);
      return;
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="sidebar-item mt-auto w-full rounded-xl px-3.5 py-2.5 text-left text-[15px] text-[var(--text-sub)] disabled:cursor-not-allowed"
    >
      로그아웃
    </button>
  );
}
