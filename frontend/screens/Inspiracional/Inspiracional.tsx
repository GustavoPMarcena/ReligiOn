import { Text, KeyboardAvoidingView, FlatList } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { useEffect, useState } from "react";
import Inspiration from "../../components/inspirations/inspiration/Inspiration";
import { getInspirationsApi } from "../../services/apiConectionInspirational";
import { InspirationalResponse } from "../../types/Inspirational";
import { getImageSource } from "../../utils/getImageProfile";
import styles from "./styles";
import Button from "../../components/button/Button";
import { useNavigation } from "@react-navigation/native";

export default function Inspiracional() {
    const [inspiracionais, setInspiracionais] = useState<
        InspirationalResponse[]
    >([]);
    const navigation = useNavigation<any>();

    const formatDate = (date: string) => { 
        const d = new Date(date); 
        const day = String(d.getDate()).padStart(2, "0"); 
        const month = String(d.getMonth() + 1).padStart(2, "0"); 
        const year = d.getFullYear(); 
        return `${day}-${month}-${year}`; 
    };

    useEffect(() => {
        const getInspiracionais = async () => {
            try {
                const data = await getInspirationsApi();
                setInspiracionais(data);
            } catch (error) {
                console.error("Erro ao buscar inspiracionais:", error);
            }
        };
        getInspiracionais();
    }, []);

    const botao = () =>{
        console.log("teste de botão");
    }

    return (
        <KeyboardAvoidingView
            style={[globalStyles.container, { flex: 1 }]}
            behavior="padding"
            enabled
        >
            <Button title="Criar inspiracional" onClick={() => { navigation.navigate('CriarInspiracional')}}/>
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
