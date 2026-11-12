import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "한입 링크에 가입하고 링크를 모아보세요.",
  openGraph: { title: "회원가입 | 한입 링크" },
};

export default function SignupPage() {
  return (
    <AuthCard>
      <SignupForm />
    </AuthCard>
  );
}
