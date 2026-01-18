import { api } from "../api";
import { createUserResponseType, createUserType } from "../types/User";


export const createUserApi = async (user: createUserType): Promise<createUserResponseType> => {
    const { data } = await api.post<createUserResponseType>("/users", user)
    return data;
}

export const getUserApi = async (email: string): Promise<createUserResponseType> => {
    const { data } = await api.get(`/users/${email}`);
    return data;
}

export const updateUserApi = async (id: string, updatedUser: createUserType): Promise<createUserResponseType> => {
    const { data } = await api.put(`/users/${id}`, updatedUser);
    return data;
}

export const deleteUserApi = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
}

