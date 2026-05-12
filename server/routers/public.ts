import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { professionals, services, bookings, availability } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const publicRouter = router({
  getProfessional: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const result = await db
        .select()
        .from(professionals)
        .where(eq(professionals.slug, input.slug))
        .limit(1);

      return result[0] || null;
    }),

  getServices: publicProcedure
    .input(z.object({ professionalId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(services)
        .where(eq(services.professionalId, input.professionalId));
    }),

  getAvailability: publicProcedure
    .input(z.object({ professionalId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(availability)
        .where(eq(availability.professionalId, input.professionalId));
    }),

  createBooking: publicProcedure
    .input(
      z.object({
        professionalId: z.number(),
        serviceId: z.number(),
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientPhone: z.string(),
        startTime: z.date(),
        endTime: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(bookings).values({
        professionalId: input.professionalId,
        serviceId: input.serviceId,
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        clientPhone: input.clientPhone,
        startTime: input.startTime,
        endTime: input.endTime,
        status: "pending",
      });

      return { success: true, id: (result as any).insertId };
    }),
});
