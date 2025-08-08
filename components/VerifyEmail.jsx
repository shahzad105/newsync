"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdVerified, MdError } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

export default function VerifyEmail({ token, email }) {
  const [status, setStatus] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const res = await axios.post(`/api/auth/verify/${token}`, {});
        const json = await res.data;
        setStatus({ success: json.success, message: json.message });
      } catch (error) {
        setStatus({
          success: false,
          message:
            error?.response?.data?.message ||
            error.message ||
            "Verification failed. Try again.",
        });
      }
    }
    verify();
  }, [token]);

  const handleResend = async () => {
    if (!email) return;
    setResendLoading(true);
    try {
      const res = await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message);
        setResent(true);
      } else {
        toast.error(json.message);
      }
    } catch {
      toast.error("Failed to resend email.");
    } finally {
      setResendLoading(false);
    }
  };

  if (!status) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-green-200 p-4">
      <div className="text-center space-y-6 max-w-lg">
        {status.success ? (
          <>
            <div className="mx-auto w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md">
              <MdVerified size={50} />
            </div>
            <h1 className="text-3xl font-bold text-green-700">
              Email Verified!
            </h1>
            <p className="text-gray-700">
              Your account is now verified. You may log in.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto w-24 h-24 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md">
              <MdError size={50} />
            </div>
            <h1 className="text-3xl font-bold text-red-600">
              Verification Failed
            </h1>
            <p className="text-gray-700">{status.message}</p>
            {email && !resent && (
              <button
                disabled={resendLoading}
                onClick={handleResend}
                className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow"
              >
                {resendLoading ? "Resending…" : "Resend Verification Email"}
              </button>
            )}
            {resent && (
              <p className="text-yellow-600 mt-2">Verification email resent!</p>
            )}
            <Link
              href="/login"
              className="block mt-4 text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
