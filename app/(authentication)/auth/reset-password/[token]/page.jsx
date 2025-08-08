import ResetForm from "@/components/ResetForm";

export const metadata = {
  title: "Reset Password - NewsSync",
  description: "Set a new password for your account.",
};

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <ResetForm token={token} />
    </div>
  );
}
