import { z } from "zod";
const phoneRegex = new RegExp(
  /^[1-9]{2}9?[6-9]\d{7}$/
);

export const signinSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .min(4, "O nome tem que ter no mínimo 4 caracteres"),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Email inválido"),
  role: z
    .string()
    .nonempty("A função é obrigatória")
    .min(4, "A função tem que ter no mínimo 4 caracteres"),
  phone: z
    .string()
    .nonempty("O telefone é obrigatório")
    .regex(phoneRegex, "Telefone inválido"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginData = z.infer<typeof signinSchema>;