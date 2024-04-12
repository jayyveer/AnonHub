import { z } from "zod";

export const singInSchema = z.object({
  identifies: z.string(),
  password: z.string(),
});
