import { productHuntVotes } from "@/server/api/routers/productHuntVotes";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  productHuntVotes: productHuntVotes,
});

export type AppRouter = typeof appRouter;
