import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const IdSchema = z.string().uuid();

export type Id = z.infer<typeof IdSchema>;

