import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { services, professionals } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const servicesRouter = router({
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
      .from(services)
      .where(eq(services.professionalId, prof[0].id));
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        price: z.number().positive(),
        durationMinutes: z.number().positive(),
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

      const result = await db.insert(services).values({
        professionalId: prof[0].id,
        name: input.name,
        description: input.description,
        price: input.price.toString(),
        durationMinutes: input.durationMinutes,
      });

      return { success: true, id: (result as any).insertId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        durationMinutes: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(services)
        .set(input)
        .where(eq(services.id, input.id));

      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(services).where(eq(services.id, input.id));

      return { success: true };
    }),
});
