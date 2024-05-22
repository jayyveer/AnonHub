import { z } from "zod";

export const AcceptMessageSchema = z.object({
  aceptMessage: z.boolean()
});
