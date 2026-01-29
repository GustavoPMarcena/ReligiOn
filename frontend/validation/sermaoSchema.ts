import { z } from "zod";

export const sermaoSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  content: z.string().min(5, "O conteúdo deve ter pelo menos 10 caracteres"),
  date: z.string().min(1, "A data é obrigatória"),
});