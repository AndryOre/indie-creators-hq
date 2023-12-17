import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserInfo: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
          select: {
            name: true,
            image: true,
            headline: true,
            about: true,
            links: {
              select: {
                name: true,
                url: true,
              },
            },
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get user information",
        });
      }
    }),

  updateUserInfo: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        headline: z.string().optional(),
        about: z.string().optional(),
        links: z
          .array(
            z.object({
              name: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, headline, about, links } = input;

      try {
        const updatedUser = await db.user.update({
          where: { id: userId },
          data: {
            headline,
            about,
            links: {
              deleteMany: { userId },
              create: links,
            },
          },
          select: {
            headline: true,
            about: true,
            links: {
              select: {
                name: true,
                url: true,
              },
            },
          },
        });

        return updatedUser;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user information",
        });
      }
    }),
});
