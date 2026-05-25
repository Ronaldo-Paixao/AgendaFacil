import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { bookings } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const bookingsRouter = router({
  list: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    return await db.select().from(bookings);
  }),

  confirm: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(bookings)
        .set({
          status: input.status,
        })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),

  cancel: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(bookings)
        .set({
          status: "pending",
        })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),

  reschedule: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
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
        })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),
});