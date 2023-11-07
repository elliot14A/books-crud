import { z } from "zod";

export const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    summary: z.string().min(10).max(255),
    author: z.string().min(3).max(255),
  }),
});

export const getBookByIdSchema = z.object({
  params: z.object({
    bookId: z.string({ required_error: "bookId is required" }),
  }),
});

export const updateBookSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    summary: z.string().min(10).max(255).optional(),
    author: z.string().min(3).max(255).optional(),
  }),
  params: z.object({
    bookId: z.string({ required_error: "bookId is required" }),
  }),
});

export const deleteBookSchema = z.object({
  params: z.object({
    bookId: z.string({ required_error: "bookId is required" }),
  }),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
export type UpdateBookSchema = z.infer<typeof updateBookSchema>;
export type GetBookById = z.infer<typeof getBookByIdSchema>;
export type DeleteBookById = z.infer<typeof deleteBookSchema>;
