import { z } from "zod";

export const aceptMessageSchema = z.object({
  aceptMessage: z.boolean()
});
