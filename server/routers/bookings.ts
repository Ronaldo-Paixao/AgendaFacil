import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { bookings, professionals } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const bookingsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const prof = await db
      .select()
      .from(professionals)
      .where(eq(professionals.userId, ctx.user!.id))
      .limit(1);

    if (!prof[0]) return [];

    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.professionalId, prof[0].id));
  }),

  confirm: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(bookings)
        .set({ status: "confirmed" })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),

  cancel: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(bookings)
        .set({ status: "cancelled" })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),

  reschedule: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        startTime: z.date(),
        endTime: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(bookings)
        .set({
          startTime: input.startTime,
          endTime: input.endTime,
          status: "pending",
        })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),
});
