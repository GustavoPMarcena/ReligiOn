import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { InspirationalResponse } from "../../types/Inspirational";
import { useAuth } from "../../hooks/useAuth";
import { getUserApi } from "../../services/apiConectionUser";
import { FlatList, KeyboardAvoidingView, Text } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import Button from "../../components/button/Button";
import styles from "./styles";
import { getImageSource } from "../../utils/getImageProfile";
import Inspiration from "../../components/inspirations/inspiration/Inspiration";
import { getUserInspirationApi } from "../../services/apiConectionInspirational";
import TopBar from "../../components/TopBar/TopBar";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

type User = { 
    id: string; 
    name: string; 
    email: string; 
    role: string; 
    userType: 'LEADER' | 'MEMBER'; 
    phone: string; }; 
    
export default function MeusInspiracionais() { 
    const [inspiracionais, setInspiracionais] = useState< InspirationalResponse[] >([]); 
    const navigation = useNavigation<any>(); 
    const { user } = useAuth(); const [currentUser, setCurrentUser] = useState<User | null>(); 
    useEffect(() => { if (!user) return; 
        const testUserApi = async () => { 
            try { 
                const fetchedUser = await getUserApi(user.email); 
                setCurrentUser(fetchedUser); 
            } catch (error) { 
                console.error("Erro ao buscar usuário:", error); 
            } 
        }; 
        testUserApi(); 
    }, [user]); 
    const formatDate = (date: string) => { 
        const d = new Date(date); 
        const day = String(d.getDate()).padStart(2, "0"); 
        const month = String(d.getMonth() + 1).padStart(2, "0"); 
        const year = d.getFullYear(); 
        return `${day}-${month}-${year}`; 
    }; 
    
    useEffect(() => { 
        if(!currentUser){ return } 
        const getInspiracionais = async () => { 
            try { 
                const data = await getUserInspirationApi(currentUser?.id); 
                setInspiracionais(data); 
            } catch (error) { 
                console.error("Erro ao buscar meus inspiracionais:", error); 
            } }; 
            getInspiracionais(); 
        }, [currentUser]); 

        return (
            <KeyboardAvoidingView
            style={[globalStyles.container, { flex: 1 }]}
            behavior="padding"
            enabled
            >
                <TopBar title="Meus Inspiracionais"/>
                <FloatingButton onPress={() => {navigation.navigate('CriarInspiracional')}}/>
                {inspiracionais.length === 0 ? (
                    <Text style={styles.notFound}>
                        Nenhum inspiracional encontrado.
                    </Text>
                ) : (
                    <FlatList
                        data={inspiracionais}
                        style={{ flex: 1, marginVertical: 10 }}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const imageProfile = getImageSource(item.user.image);
                            return (
                                <Inspiration
                                    title={item.title}
                                    content={item.content}
                                    userName={item.user.name}
                                    publishDate={formatDate(item.createdAt)}
                                    userProfile={imageProfile}
                                />
                            )
                        }}
                    />
                )}
        </KeyboardAvoidingView>
    );
}