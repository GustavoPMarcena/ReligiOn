import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import HeaderPage from "../../components/headerPage/HeaderPage";
import Input from "../../components/input/Input";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import TextArea from "../../components/textArea/TextArea";
import Button from "../../components/button/Button";
import { useState } from "react";
import { createInspirationApi } from "../../services/apiConectionInspirational";
import { useNavigation } from "@react-navigation/native";

export default function CreateInspiration() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigation = useNavigation<any>();

    async function handleSubmit() {
        setTitle("");
        setContent("");
        const createdInspiration = await createInspirationApi({title, content});
        navigation.navigate('Inspiracional');
        console.log(createdInspiration);
    }
    return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <HeaderPage title="Criar Inspiração"/>
                    <View style={[globalStyles.content, {paddingTop: 20}]}>
                        <View style={globalStyles.form}>
                            <Input
                                label="Título"
                                placeholder="Digite aqui o título"
                                type="default"
                                value="teste"
                                onChangeText={setTitle}
                            />
                            <TextArea label="Conteúdo" placeholder="Digite aqui o conteúdo" onChangeText={setContent}/>                        
                        </View>
                        <Button title="Salvar" onClick={handleSubmit}/> 
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        
    );
}