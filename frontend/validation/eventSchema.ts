import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  publico: z.string().min(1, "Público é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "A data é obrigatória"),
  latitude: z.string().min(1, "A latitude é obrigatória"),
  longitude: z.string().min(1, "A longitude é obrigatória"),
});