import { z } from "zod";

const singInSchema = z.object({
  identifies: z.string(),
  password: z.string(),
});
