// app/verify/[token]/page.jsx

import VerifyEmail from "@/components/VerifyEmail";

export const metadata = {
  title: "Verify Email – NewsSync",
  description: "Verify your email address to activate your account",
};

export default async function VerifyEmailPage({ params, searchParams }) {
  const { token } = await params;
  const { email } = await searchParams;
  return <VerifyEmail token={token} email={email} />;
}
