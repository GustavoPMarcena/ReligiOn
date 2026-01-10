import { api } from "../api";

type createUserType = {
    name: string;
    email: string;
    password?: string;
    role: string;
    userType: 'LEADER' | 'MEMBER';
    phone: string;
}


export const createUserApi = async (user: createUserType): Promise<createUserType> => {
    const { data } = await api.post<createUserType>("/users", user)
    return data;
}

export const getUserApi = async (email: string): Promise<createUserType> => {
    const { data } = await api.get(`/users/${email}`);
    return data;
}

export const updateUserApi = async (id: string, updatedUser: createUserType): Promise<createUserType> => {
    const { data } = await api.put(`/users/${id}`, updatedUser);
    return data;
}

export const deleteUserApi = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
}

