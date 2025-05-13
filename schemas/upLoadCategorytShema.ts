import { z } from "zod";

export const createCategorySchema = z.object({
  nameCategory: z.string().min(3, "Name is required at least 3 characters"),
  categoryImage: z.unknown()
})

export type TypeCreateCategory = z.infer<typeof createCategorySchema>


