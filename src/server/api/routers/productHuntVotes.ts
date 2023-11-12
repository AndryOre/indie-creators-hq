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

interface CacheEntry {
  data:
    | string
    | {
        id: string;
        name: string;
        votesCount: number;
        slug: string;
      }
    | null;
  timestamp: Date;
}

const cache: Record<string, CacheEntry> = {};

export const productHuntVotes = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const now = new Date();
      const slugCache = cache[input.slug];

      if (
        slugCache?.timestamp &&
        now.getTime() - slugCache.timestamp.getTime() < 24 * 60 * 60 * 1000
      ) {
        return slugCache.data;
      }

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

        cache[input.slug] = {
          data: data.data.post ? data.data.post : "Post not found",
          timestamp: now,
        };

        return cache[input.slug]?.data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    }),
});
