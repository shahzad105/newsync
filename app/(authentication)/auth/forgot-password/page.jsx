import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password - NewsSync",
  description: "Reset your password via email link",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <ForgotPasswordForm />
    </div>
  );
}
