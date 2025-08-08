"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useRegisterUser = (setFormData) => {
  const router = useRouter();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post("/api/auth/register", data);

        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      router.push(`/auth/email-sent?email=${encodeURIComponent(data.email)}`);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    },
  });

  return { registerUser, isPending };
};
