import { api } from "../api";
import { SermaoResponse } from "../types/Sermao";

export const createSermaoApi = async (formData: FormData) => {
  const { data } = await api.post("/sermao", formData);
  return data;
};

export const getSermoesApi = async (): Promise<SermaoResponse[]> => {
  const { data } = await api.get("/sermao");
  return data;
};

export const getSermaoByIdApi = async (id: string): Promise<SermaoResponse> => {
  const { data } = await api.get(`/sermao/${id}`);
  return data;
};

export const updateSermaoApi = async (id: string, formData: FormData) => {
  const { data } = await api.put(`/sermao/${id}`, formData);
  return data;
};

export const deleteSermaoApi = async (id: string): Promise<void> => {
  await api.delete(`/sermao/${id}`);
};