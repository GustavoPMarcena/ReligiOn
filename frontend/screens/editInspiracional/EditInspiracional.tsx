import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getInspirationByIdApi, updateInspirationApi } from "../../services/apiConectionInspirational";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import { globalStyles } from "../../global/css/globalStyles";
import Input from "../../components/input/Input";
import TextArea from "../../components/textArea/TextArea";
import Button from "../../components/button/Button";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";

export default function EditInspiracional() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { id } = route.params;

    const [erroVisible, setErrorVisible] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const getInspiration = async () => {
            try{
                const data = await getInspirationByIdApi(id);
                setTitle(data.title ?? "");
                setContent(data.content ?? "");
            } catch (error){
                console.log(error)
            }         
        };
        if(id){
            getInspiration();        
        }
    }, [id]);

    const handleSubmit = async () => {
        try {
            await updateInspirationApi(id, { title, content });
            navigation.goBack();
        } catch (err) {
            console.log("Erro ao editar inspiracional", err);
            setErrorVisible(true);
        }
    };
    
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <TopBar title="Editar Inspiracional" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={[globalStyles.content, { paddingTop: 20 }]}>
                    <View style={globalStyles.form}>
                        <Input
                            label="Título"
                            placeholder="Digite aqui o título"
                            type="default"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextArea value={content} label="Conteúdo" placeholder="Digite aqui o conteúdo" onChangeText={setContent} />
                    </View>
                    <Button title="Salvar" onClick={handleSubmit} />
                    <ConfirmNotification confirmText="Tentar novamente" showCancel={false} title="Erro ao salvar os dados" visible={erroVisible} onConfirm={() => {navigation.navigate('MeusInspiracionais')}}/> 
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}