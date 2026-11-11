import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
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
            autoComplete: "current-password",
          },
        ]}
        submitLabel="로그인"
        footerText="계정이 없으신가요?"
        footerLinkLabel="회원가입"
        footerHref="/signup"
      />
    </AuthCard>
  );
}
