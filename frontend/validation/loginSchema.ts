import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;