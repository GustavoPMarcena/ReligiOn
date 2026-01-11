import { api } from "../api";
import { EventResponse, EventRequest } from "../types/Event";

export const createEventApi = async (event: EventRequest): Promise<EventResponse> => {
  const { data } = await api.post<EventResponse>("/eventos", event);
  return data;
};

export const getEventsApi = async (): Promise<EventResponse[]> => {
  const { data } = await api.get<EventResponse[]>("/eventos");
  return data;
};


export const getEventByIdApi = async (id: string): Promise<EventResponse> => {
  const { data } = await api.get<EventResponse>(`/eventos/${id}`);
  return data;
};

export const updateEventApi = async (id: string, event: EventRequest): Promise<EventResponse> => {
  const { data } = await api.put<EventResponse>(`/eventos/${id}`, event);
  return data;
};

export const deleteEventApi = async (id: string): Promise<void> => {
  await api.delete(`/eventos/${id}`);
};