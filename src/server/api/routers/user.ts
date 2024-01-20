import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
          select: {
            name: true,
            realName: true,
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
        if (error instanceof TRPCError && error.code === "NOT_FOUND") {
          throw error;
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get user information",
          });
        }
      }
    }),

  updateUserInfo: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        image: z.string().optional(),
        realName: z.string().optional(),
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
      const { userId, image, realName, headline, about, links } = input;

      try {
        const updatedUser = await db.user.update({
          where: { id: userId },
          data: {
            image,
            realName,
            headline,
            about,
            links: {
              deleteMany: { userId },
              create: links,
            },
          },
          select: {
            image: true,
            realName: true,
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

  getUserByName: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findFirst({
          where: { name: input.username },
          select: {
            id: true,
            name: true,
            realName: true,
            image: true,
            headline: true,
            about: true,
            links: {
              select: {
                name: true,
                url: true,
              },
            },
            SideProjects: true,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const sideProjectCount: number = user.SideProjects.length;

        return {
          ...user,
          sideProjectCount,
        };
      } catch (error) {
        if (error instanceof TRPCError && error.code === "NOT_FOUND") {
          throw error;
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get user by name",
          });
        }
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.db.user.findMany({
        select: {
          id: true,
          name: true,
          realName: true,
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

      return users;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get all members",
      });
    }
  }),
});
