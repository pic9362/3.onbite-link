"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthForm from "./AuthForm";
import Toast from "./Toast";

function toKoreanMessage(message: string, code?: string): string {
  const m = message.toLowerCase();
  if (code === "over_email_send_rate_limit" || m.includes("rate limit"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  if (code === "email_address_invalid" || m.includes("invalid"))
    return "올바른 이메일 형식이 아닙니다.";
  return "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ForgotPasswordForm() {
  const [toast, setToast] = useState<{
    message: string;
    variant: "error" | "success";
  } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function handleSubmit(values: Record<string, string>) {
    const { error } = await createClient().auth.resetPasswordForEmail(
      values.email,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      },
    );

    if (error) {
      setToast({
        message: toKoreanMessage(error.message, error.code),
        variant: "error",
      });
      return;
    }
    setToast({
      message: "비밀번호 재설정 링크를 이메일로 발송했습니다.",
      variant: "success",
    });
  }

  return (
    <>
      <Toast
        message={toast?.message ?? null}
        variant={toast?.variant}
        onClose={closeToast}
      />
      <AuthForm
        fields={[
          {
            id: "email",
            label: "이메일",
            type: "email",
            placeholder: "가입한 이메일을 입력하세요",
            autoComplete: "email",
          },
        ]}
        submitLabel="비밀번호 재설정 링크 발송"
        footerText="비밀번호가 기억나셨나요?"
        footerLinkLabel="로그인"
        footerHref="/login"
        onSubmit={handleSubmit}
      />
    </>
  );
}
