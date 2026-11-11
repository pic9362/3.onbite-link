"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthForm from "./AuthForm";
import Toast from "./Toast";

function toKoreanMessage(message: string, code?: string): string {
  const m = message.toLowerCase();
  if (code === "invalid_credentials" || m.includes("invalid login"))
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (code === "email_not_confirmed" || m.includes("not confirmed"))
    return "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.";
  if (code === "over_request_rate_limit" || m.includes("rate limit"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  return "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function handleSubmit(values: Record<string, string>) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setToast(toKoreanMessage(error.message, error.code));
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <>
      <Toast message={toast} onClose={closeToast} />
      <AuthForm
        fields={[
          {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "example@email.com",
            autoComplete: "email",
          },
          {
            id: "password",
            label: "비밀번호",
            type: "password",
            placeholder: "비밀번호를 입력하세요",
            autoComplete: "current-password",
          },
        ]}
        submitLabel="로그인"
        extraLink={{ label: "비밀번호를 잊으셨나요?", href: "/forgot-password" }}
        footerText="계정이 없으신가요?"
        footerLinkLabel="회원가입"
        footerHref="/signup"
        onSubmit={handleSubmit}
      />
    </>
  );
}
