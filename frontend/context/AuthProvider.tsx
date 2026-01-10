import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api";
type createUserType = {
    name: string;
    email: string;
    password?: string;
    role: string;
    userType: 'LEADER' | 'MEMBER';
    phone: string;
}



interface Context {
    tokenState: string | null;
    user: createUserType | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as Context);

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [user, setUser] = useState<createUserType | null>(null);

    async function login(email: string, password: string) {
        const data = { email, password }

        try {
            const response = await api.post("/login", data);
            const { token, user } = response.data as { token: string; user: createUserType };

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem("auth.token", token);
            await AsyncStorage.setItem("auth.user", JSON.stringify(user));

            setTokenState(token);
            setUser(user);

        } catch (error: any) {
            console.log("erro no login: ", error.response?.data?.message);
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

    useEffect(() => {
        loadLocalStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}