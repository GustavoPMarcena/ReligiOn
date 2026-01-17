import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { InspirationalResponse } from "../../types/Inspirational";
import { useAuth } from "../../hooks/useAuth";
import { getUserApi } from "../../services/apiConectionUser";
import { FlatList, KeyboardAvoidingView, Text } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
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
    phone: string;
};

export default function MeusInspiracionais() {
    const [inspiracionais, setInspiracionais] = useState<InspirationalResponse[]>([]);
    const navigation = useNavigation<any>();
    const { user } = useAuth(); const [currentUser, setCurrentUser] = useState<User | null>();

    const handleDelete = (deletedId: string) => {
        setInspiracionais(prev =>
            prev.filter(item => item.id !== deletedId)
        );
    };

    const handleEdit = (id: string) => {
        navigation.navigate("EditInspiracional", { id });
    }

    useEffect(() => {
        if (!user) return;
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


    const getInspiracionais = async () => {
        if (!currentUser) { return }
        try {
            const data = await getUserInspirationApi(currentUser?.id);
            setInspiracionais(data);
        } catch (error) {
            console.error("Erro ao buscar inspiracionais:", error);
        }
    };

    useEffect(() => {
        if (!currentUser) { return }
        getInspiracionais();
    }, [currentUser]);

    useFocusEffect(
        useCallback(() => {
            getInspiracionais();
        }, [currentUser])
    );

    return (
        <KeyboardAvoidingView
            style={[globalStyles.container, { flex: 1 }]}
            behavior="padding"
            enabled
        >
            <TopBar title="Meus Inspiracionais" />
            <FloatingButton onPress={() => { navigation.navigate('CriarInspiracional') }} />
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
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                userName={item.user.name}
                                publishDate={formatDate(item.createdAt)}
                                userProfile={imageProfile}
                                showActionBar={true}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        )
                    }}
                />
            )}
        </KeyboardAvoidingView>
    );
}