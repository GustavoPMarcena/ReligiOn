import { api } from "../api";
import axios from "axios";
import { createUserResponseType, createUserType } from "../types/User";

export const createUserApi = async (
    user: createUserType
): Promise<createUserResponseType> => {
    try {
        const { data } = await api.post<createUserResponseType>("/users", user);
        return data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Erro ao criar conta"
            );
        }

        throw new Error("Erro inesperado");
    }
};

export const getUserApi = async (email: string): Promise<createUserResponseType> => {
    const { data } = await api.get(`/users/${email}`);
    return data;
}

export const updateUserApi = async (id: string, data: FormData): Promise<createUserResponseType> => {
  const response = await api.put(`/users/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteUserApi = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
}

