"use server";

import { signIn } from "@/auth"; // You must use the correct import path

export async function authenticate(formData) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    return { message: "Login successful" };
  } catch (error) {
    return {
      error: {
        message: error?.message || "Authentication failed",
      },
    };
  }
}
