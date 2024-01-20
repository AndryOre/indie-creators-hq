import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

import { Prisma, Status } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const sideProjectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        logo: z.string(),
        name: z.string(),
        tagline: z.string(),
        url: z.string(),
        status: z.nativeEnum(Status),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, logo, name, tagline, url, status } = input;

      try {
        const newSideProject = await db.sideProject.create({
          data: {
            userId,
            logo,
            name,
            tagline,
            url,
            status,
          },
        });

        return newSideProject;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A side project with the given URL already exists.",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create side project",
        });
      }
    }),

  getByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        const sideProjects = await db.sideProject.findMany({
          where: { userId: input.userId },
        });

        return sideProjects;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get side projects",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        logo: z.string().optional(),
        name: z.string().optional(),
        tagline: z.string().optional(),
        url: z.string().optional(),
        status: z.nativeEnum(Status).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, logo, name, tagline, url, status } = input;
      try {
        const updatedSideProject = await db.sideProject.update({
          where: { id },
          data: {
            ...(logo && { logo }),
            ...(name && { name }),
            ...(tagline && { tagline }),
            ...(url && { url }),
            ...(status && { status }),
          },
        });

        return updatedSideProject;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Side project not found",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update side project",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await db.sideProject.delete({
          where: { id: input.id },
        });

        return { message: "Side project successfully deleted" };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Side project not found",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete side project",
        });
      }
    }),

  getAll: publicProcedure.query(async () => {
    try {
      const sideProjects = await db.sideProject.findMany();
      return sideProjects;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve side projects",
      });
    }
  }),
});
