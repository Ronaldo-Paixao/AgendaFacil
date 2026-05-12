import { router, publicProcedure } from "./_core/trpc";
import { professionalsRouter } from "./routers/professionals";
import { servicesRouter } from "./routers/services";
import { availabilityRouter } from "./routers/availability";
import { bookingsRouter } from "./routers/bookings";
import { publicRouter } from "./routers/public";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(() => ({ success: true })),
  }),
  
  professionals: professionalsRouter,
  services: servicesRouter,
  availability: availabilityRouter,
  bookings: bookingsRouter,
  public: publicRouter,
  
  health: publicProcedure.query(() => ({
    status: "ok",
    timestamp: new Date(),
  })),
});

export type AppRouter = typeof appRouter;
