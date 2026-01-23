import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api";
import { createUserResponseType } from "../types/User";
import { getUserApi } from "../services/apiConectionUser";

interface Context {
    tokenState: string | null;
    user: createUserResponseType | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    reloadUser: () => Promise<void>;
}

export const AuthContext = createContext({} as Context);

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [user, setUser] = useState<createUserResponseType | null>(null);

    async function login(email: string, password: string) {
        const data = { email, password }

        try {
            const response = await api.post("/login", data);
            const { token, user } = response.data as { token: string; user: createUserResponseType };

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem("auth.token", token);
            await AsyncStorage.setItem("auth.user", JSON.stringify(user));

            setTokenState(token);
            setUser(user);

        } catch (error: any) {
            throw error;
        }
    }

    async function logout() {
        setTokenState(null);
        setUser(null);
        await AsyncStorage.removeItem("auth.token");
        await AsyncStorage.removeItem("auth.user");
    }

    async function loadLocalStorage() {
        const tokenStorage = await AsyncStorage.getItem("auth.token");
        const userStorage = await AsyncStorage.getItem("auth.user");

        if (tokenStorage && userStorage) {
            const userParsed = JSON.parse(userStorage);
            
            api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
            setTokenState(tokenStorage);
            setUser(userParsed);
        }
    }

    async function reloadUser() {
        if(user?.email) {
            const updatedUser = await getUserApi(user?.email);
            setUser(updatedUser);
            await AsyncStorage.setItem("auth.user", JSON.stringify(user));
        }
    }

    useEffect(() => {
        reloadUser();
        loadLocalStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, user, login, logout, reloadUser}} >
            {children}
        </AuthContext.Provider>
    )
}