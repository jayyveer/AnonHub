import { z } from "zod";

const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be of 10 characters" })
    .max(300, { message: "Content must be no longert than 300 characters" }),
});
