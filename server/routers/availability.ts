import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { availability, professionals } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const availabilityRouter = router({
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
      .from(availability)
      .where(eq(availability.professionalId, prof[0].id));
  }),

  upsert: protectedProcedure
    .input(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string(),
        endTime: z.string(),
        isAvailable: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const prof = await db
        .select()
        .from(professionals)
        .where(eq(professionals.userId, ctx.user!.id))
        .limit(1);

      if (!prof[0]) throw new Error("Professional profile not found");

      const existing = await db
        .select()
        .from(availability)
        .where(
          eq(availability.professionalId, prof[0].id) &&
          eq(availability.dayOfWeek, input.dayOfWeek)
        )
        .limit(1);

      if (existing[0]) {
        await db
          .update(availability)
          .set(input)
          .where(eq(availability.id, existing[0].id));
      } else {
        await db.insert(availability).values({
          professionalId: prof[0].id,
          dayOfWeek: input.dayOfWeek,
          startTime: input.startTime,
          endTime: input.endTime,
          isAvailable: input.isAvailable,
        });
      }

      return { success: true };
    }),
});
