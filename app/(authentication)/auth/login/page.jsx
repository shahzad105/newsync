// app/login/page.jsx
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import loginGraphic from "@/public/modern-login-illustration.svg";

export const metadata = {
  title: "Login - NewSync",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-neutral-900 dark:to-neutral-800 flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-indigo-700">
        <Image
          src={loginGraphic}
          alt="Login Illustration"
          width={400}
          height={400}
          className="max-w-sm"
          priority
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
