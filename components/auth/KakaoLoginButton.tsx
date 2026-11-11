"use client";

import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

type Props = {
  onError: (message: string) => void;
};

export default function KakaoLoginButton({ onError }: Props) {
  async function handleClick() {
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
      },
    });
    if (error) onError("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="카카오 로그인"
      className="btn-secondary block w-full overflow-hidden rounded-xl"
    >
      <Image
        src="/kakao_login_large_wide.png"
        alt="카카오 로그인"
        width={600}
        height={90}
        className="h-auto w-full"
      />
    </button>
  );
}
