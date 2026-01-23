import { KeyboardAvoidingView, View, Text, FlatList, } from "react-native";
import { globalStyles } from "../../../global/css/globalStyles";
import TopBar from "../../../components/TopBar/TopBar";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Sermao from "../../../components/sermao/Sermao";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { SermaoResponse } from "../../../types/Sermao";
import { createUserResponseType } from "../../../types/User";
import { getSermoesByUserApi } from "../../../services/ApiConectionSermao";
import { getUserApi } from "../../../services/apiConectionUser";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import { getImageSource } from "../../../utils/getImageProfile";
import styles from "./styles";

export default function MySermoes() {
    const [sermoes, setSermoes] = useState<SermaoResponse[]>([]);
    const navigation = useNavigation<any>();
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState<createUserResponseType | null>();

    const normalizePath = (path: string) =>
        path.replace(/\\/g, "/");

    const handleDelete = (deletedId: string) => {
        setSermoes(prev =>
            prev.filter(item => item.id !== deletedId)
        );
    };

    const handleEdit = (id: string) => {
        navigation.navigate("EditSermao", { id });
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


    const getSermoes = async () => {
        if (!currentUser) { return }
        try {
            const data = await getSermoesByUserApi(currentUser?.id);
            setSermoes(data);
        } catch (error) {
            console.error("Erro ao buscar inspiracionais:", error);
        }
    };

    useEffect(() => {
        if (!currentUser) { return }
        getSermoes();
    }, [currentUser]);

    useFocusEffect(
        useCallback(() => {
            getSermoes();
        }, [currentUser])
    );

    return (
        <KeyboardAvoidingView
            style={[globalStyles.container, { flex: 1 }]}
            behavior="padding"
            enabled
        >
            <TopBar title="Meus Sermões" />
            <FloatingButton onPress={() => { navigation.navigate('CriarSermao') }} />
            {sermoes.length === 0 ? (
                <Text style={styles.notFound}>
                    Nenhum inspiracional encontrado.
                </Text>
            ) : (
                <FlatList
                    data={sermoes}
                    style={{ flex: 1, marginVertical: 10 }}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const imageProfile = getImageSource(item.user?.image ?? "");
                        const imagePost = getImageSource(
                            item.mediaFile ? normalizePath(item.mediaFile) : ""
                        );
                        return (
                            <Sermao
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                userName={item.user?.name ?? "User"}
                                publishDate={formatDate(item.date)}
                                userProfile={imageProfile}
                                imageSrc={imagePost}
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