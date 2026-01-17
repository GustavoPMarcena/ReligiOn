import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import Input from "../../components/input/Input";
import { globalStyles } from "../../global/css/globalStyles";
import TextArea from "../../components/textArea/TextArea";
import Button from "../../components/button/Button";
import { useState } from "react";
import { createInspirationApi } from "../../services/apiConectionInspirational";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../../components/TopBar/TopBar";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";

export default function CreateInspiration() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [errorVisible, setErrorVisible] = useState(false);

    const navigation = useNavigation<any>();

    async function handleSubmit() {
        try{
            setTitle("");
            setContent("");
            const createdInspiration = await createInspirationApi({ title, content });
            navigation.navigate('Inspiracional');
            console.log(createdInspiration);
        } catch{
            console.log("Erro ao criar inspiracional");
            setErrorVisible(true);
        }
    }
    return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <TopBar title="Criar Inspiracional"/>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={[globalStyles.content, {paddingTop: 20}]}>
                        <View style={globalStyles.form}>
                            <Input
                                label="Título"
                                placeholder="Digite aqui o título"
                                type="default"
                                onChangeText={setTitle}
                            />
                            <TextArea label="Conteúdo" placeholder="Digite aqui o conteúdo" onChangeText={setContent}/>                        
                        </View>
                        <Button title="Salvar" onClick={handleSubmit}/> 
                        <ConfirmNotification confirmText="Tentar novamente" showCancel={false} title="Erro ao salvar os dados!" visible={errorVisible} onConfirm={() => { navigation.navigate('Inspiracional') }}/> 
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        
    );
}