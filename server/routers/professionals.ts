import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { professionals } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const professionalsRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    
    const result = await db
      .select()
      .from(professionals)
      .where(eq(professionals.userId, ctx.user!.id))
      .limit(1);
    
    return result[0] || null;
  }),

  createProfile: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(3).max(100),
        businessName: z.string().min(1).max(255),
        description: z.string().optional(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(professionals).values({
        userId: ctx.user!.id,
        slug: input.slug,
        businessName: input.businessName,
        description: input.description,
        phone: input.phone,
        whatsapp: input.whatsapp,
      });

      return { success: true, id: (result as any).insertId };
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        businessName: z.string().optional(),
        description: z.string().optional(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(professionals)
        .set(input)
        .where(eq(professionals.userId, ctx.user!.id));

      return { success: true };
    }),
});
