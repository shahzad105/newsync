import { MdMarkEmailRead } from "react-icons/md";

export const metadata = {
  title: "Email Sent | NewsSync",
  description: "Check your email for verification",
};

export default function EmailSentPage({ searchParams }) {
  const message =
    searchParams?.message ||
    "We’ve sent a verification link to your email. Please check your inbox to continue.";

  return (
    <section className="min-h-screen bg-gradient-to-tr from-white to-blue-50 flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <MdMarkEmailRead size={42} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Email Sent</h1>

      {/* Message */}
      <p className="text-lg text-gray-700 max-w-xl leading-relaxed mb-8">
        {message}
      </p>

      {/* Gmail Button */}
      <a
        href="https://mail.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium text-base transition-all shadow-md"
      >
        Open Gmail Inbox
      </a>
    </section>
  );
}
