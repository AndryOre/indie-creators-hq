import { sideProjectRouter } from "@/server/api/routers/sideProject";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  sideProject: sideProjectRouter,
});

export type AppRouter = typeof appRouter;
