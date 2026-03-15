"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return { message: "Login successful" };
  } catch (error) {
    // ✅ Auth.js v5 wraps errors — unwrap the real cause
    if (error instanceof AuthError) {
      return {
        error: {
          // `error.cause?.err?.message` has your CustomAuthError code
          message:
            error.cause?.err?.message ||
            error.cause?.err?.code ||
            error.code ||
            "Authentication failed",
        },
      };
    }
    // Non-auth errors
    return {
      error: { message: "Something went wrong. Please try again." },
    };
  }
}
