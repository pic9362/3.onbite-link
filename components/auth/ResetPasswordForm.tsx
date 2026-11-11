"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthForm from "./AuthForm";
import Toast from "./Toast";

function toKoreanMessage(message: string, code?: string): string {
  const m = message.toLowerCase();
  if (code === "same_password" || m.includes("different from the old"))
    return "기존 비밀번호와 다른 비밀번호를 입력해주세요.";
  if (code === "weak_password" || m.includes("password should be"))
    return "비밀번호는 6자 이상이어야 합니다.";
  if (m.includes("session") || code === "session_not_found")
    return "링크가 만료되었습니다. 비밀번호 찾기를 다시 진행해주세요.";
  return "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function handleSubmit(values: Record<string, string>) {
    if (values.password !== values["password-confirm"]) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { error } = await createClient().auth.updateUser({
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
            id: "password",
            label: "새 비밀번호",
            type: "password",
            placeholder: "새 비밀번호를 입력하세요",
            autoComplete: "new-password",
          },
          {
            id: "password-confirm",
            label: "새 비밀번호 확인",
            type: "password",
            placeholder: "새 비밀번호를 다시 입력하세요",
            autoComplete: "new-password",
          },
        ]}
        submitLabel="비밀번호 변경"
        onSubmit={handleSubmit}
      />
    </>
  );
}
