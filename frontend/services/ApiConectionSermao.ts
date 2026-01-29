import { api } from "../api";
import { SermaoResponse } from "../types/Sermao";

export const createSermaoApi = async (formData: FormData) => {
  const { data } = await api.post("/sermao", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  }});
  return data;
};

export const getSermoesApi = async (): Promise<SermaoResponse[]> => {
  const { data } = await api.get("/sermao");
  return data;
};

export const getSermoesByUserApi = async (userId: string): Promise<SermaoResponse[]> => {
  const { data } = await api.get(`/sermao/user/${userId}`);
  return data;
};

export const getSermaoByIdApi = async (id: string): Promise<SermaoResponse> => {
  const { data } = await api.get<SermaoResponse>(`/sermao/${id}`);
  return data;
};

export const updateSermaoApi = async (id: string, formData: FormData) => {
  const { data } = await api.put(`/sermao/${id}`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  }});
  return data;
};

export const deleteSermaoApi = async (id: string): Promise<void> => {
  await api.delete(`/sermao/${id}`);
};