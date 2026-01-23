import { KeyboardAvoidingView, Text, FlatList } from "react-native";
import { globalStyles } from "../../../global/css/globalStyles";
import TopBar from "../../../components/TopBar/TopBar";
import SearchBar from "../../../components/SearchBar/SearchBar";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import { getSermoesApi } from "../../../services/ApiConectionSermao";
import { SermaoResponse } from "../../../types/Sermao";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { getImageSource } from "../../../utils/getImageProfile";
import Sermao from "../../../components/sermao/Sermao";
import { formatDate } from "../../../utils/formatDate";

export default function Sermoes() {
    const [sermoes, setSermoes] = useState<SermaoResponse[]>([]);
    const navigation = useNavigation<any>();

    const normalizePath = (path: string) =>
        path.replace(/\\/g, "/");

    useEffect(() => {
        const getSermoes = async () => {
            try {
                const data = await getSermoesApi();
                console.log(data)
                setSermoes(data);
                console.log(sermoes[0])
            } catch (error) {
                console.error("Erro ao buscar sermoes:", error);
            }
        }

        getSermoes();
    }, []);

    return (
        <KeyboardAvoidingView
            style={[globalStyles.container, { flex: 1 }]}
            behavior="padding"
            enabled
        >
            <TopBar title="Sermões" />
            <SearchBar />
            <FloatingButton onPress={() => { navigation.navigate('CreateSermao') }} />
            {sermoes.length === 0 ? (
                <Text style={styles.notFound}>
                    Nenhum sermão encontrado.
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
                                title={item.title}
                                content={item.content}
                                userName={item.user?.name ?? "User"}
                                publishDate={formatDate(item.date)}
                                userProfile={imageProfile}
                                imageSrc={imagePost}

                            />
                        )
                    }}
                />
            )}
        </KeyboardAvoidingView>
    );
}