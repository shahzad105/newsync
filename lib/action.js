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
    if (error instanceof AuthError) {
      return {
        error: {
          message:
            error.cause?.err?.message ||
            error.cause?.err?.code ||
            error.code ||
            "Authentication failed",
        },
      };
    }

    return {
      error: { message: "Something went wrong. Please try again." },
    };
  }
}
