import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod";

interface PostResponse {
  data: {
    post: {
      id: string;
      name: string;
      votesCount: number;
      slug: string;
    } | null;
  };
}

export const productHuntVotes = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const query = `
        query {
          post(slug: "${input.slug}") {
            id,
            name,
            votesCount,
            slug
          }
        }
      `;

      try {
        const response = await fetch(
          "https://api.producthunt.com/v2/api/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.PRODUCT_HUNT_DEV_TOKEN}`,
            },
            body: JSON.stringify({ query }),
          },
        );

        const data = (await response.json()) as PostResponse;

        if (data.data.post === null) {
          return "Post not found";
        }

        return data.data.post;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    }),
});
