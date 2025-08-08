"use client";

import { createArticle } from "@/lib/actions/createArticle";
import { useMutation } from "@tanstack/react-query";

export function useAddArticle() {
  return useMutation({
    mutationFn: async ({ title, category, description, image }) => {
      const result = await createArticle({
        title,
        category,
        description,
        image,
      });

      if (!result.success) {
        throw new Error(result.message);
      }
      return result.article;
    },
  });
}
