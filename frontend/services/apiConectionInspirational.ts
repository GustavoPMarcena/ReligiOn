import { api } from "../api";
import { InspirationalRequest, InspirationalResponse } from "../types/Inspirational";

export const createInspirationApi = async ( inspiration: InspirationalRequest): Promise<InspirationalResponse> => {
  const { data } = await api.post<InspirationalResponse>("/inspiracionais", inspiration);
  return data;
};

export const getInspirationsApi = async (): Promise<InspirationalResponse[]> => {
  const { data } = await api.get<InspirationalResponse[]>("/inspiracionais");
  return data;
};

export const getInspirationByIdApi = async (id: string): Promise<InspirationalResponse> => {
  const { data } = await api.get<InspirationalResponse>(`/inspiracionais/${id}`);
  return data;
};

export const updateInspirationApi = async (id: string, inspiration: InspirationalRequest): Promise<InspirationalResponse> => {
  const { data } = await api.put<InspirationalResponse>(`/inspiracionais/${id}`, inspiration);
  return data;
};

export const deleteInspirationApi = async (id: string): Promise<void> => {
  await api.delete(`/inspiracionais/${id}`);
};

export const getUserInspirationApi = async (userId: string): Promise<InspirationalResponse[]> => { 
  const { data } = await api.get<InspirationalResponse[]>(`/inspiracionais/${userId}`); 
  return data; 
};