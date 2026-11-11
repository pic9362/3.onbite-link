"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthForm from "./AuthForm";
import Toast from "./Toast";

function toKoreanMessage(message: string, code?: string): string {
  const m = message.toLowerCase();
  if (code === "user_already_exists" || m.includes("already registered"))
    return "이미 가입된 이메일입니다.";
  if (code === "weak_password" || m.includes("password should be"))
    return "비밀번호는 6자 이상이어야 합니다.";
  if (code === "email_address_invalid" || m.includes("invalid"))
    return "올바른 이메일 형식이 아닙니다.";
  if (code === "over_email_send_rate_limit" || m.includes("rate limit"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  return "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function handleSubmit(values: Record<string, string>) {
    if (values.password !== values["password-confirm"]) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setToast(toKoreanMessage(error.message, error.code));
      return;
    }
    // 이미 가입된 이메일은 이메일 확인 설정 시 error 없이 identities가 비어 반환됨
    if (data.user && data.user.identities?.length === 0) {
      setToast("이미 가입된 이메일입니다.");
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
            autoComplete: "new-password",
          },
          {
            id: "password-confirm",
            label: "비밀번호 확인",
            type: "password",
            placeholder: "비밀번호를 다시 입력하세요",
            autoComplete: "new-password",
          },
        ]}
        submitLabel="회원가입"
        footerText="이미 계정이 있으신가요?"
        footerLinkLabel="로그인"
        footerHref="/login"
        onSubmit={handleSubmit}
      />
    </>
  );
}
