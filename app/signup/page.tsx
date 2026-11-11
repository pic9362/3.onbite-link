import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <AuthCard>
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
      />
    </AuthCard>
  );
}
