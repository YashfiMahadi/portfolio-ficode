import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
