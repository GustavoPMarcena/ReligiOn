import { KeyboardAvoidingView, Text, ScrollView, View } from "react-native";
import Button from "../../../components/button/Button";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createSermaoApi } from "../../../services/ApiConectionSermao";
import TopBar from "../../../components/TopBar/TopBar";
import { globalStyles } from "../../../global/css/globalStyles";
import TextArea from "../../../components/textArea/TextArea";
import Input from "../../../components/input/Input";
import AttachButton from "../../../components/AttachButton/AttachButton";
import * as ImagePicker from 'expo-image-picker';
import { Platform } from "react-native";
import ConfirmNotification from "../../../components/ConfirmNotification/ConfirmNotification";
import { Modal, TouchableOpacity } from "react-native";

export default function CreateSermao() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const [errorVisible, setErrorVisible] = useState(false);
    const navigation = useNavigation<any>();

    async function handlePickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    async function handleSubmit() {
        try {
            if (!image) {
                alert("Selecione uma imagem");
                return;
            }

            const formData = new FormData();
            console.log("IMAGE:", image);
            formData.append("title", title);
            formData.append("content", content);
            formData.append("date", date);

            formData.append("mediaFile", {
                uri: image.uri,
                name: "sermao.jpg",
                type: "image/jpeg",
            } as any);


            const sermao = await createSermaoApi(formData);
            console.log(sermao)
            navigation.navigate("Sermoes");
        } catch (error: any) {
            console.log("Erro:", error.response?.data || error);
            setErrorVisible(true);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <TopBar title="Criar Sermão" />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={[globalStyles.content, { paddingTop: 20 }]}>
                    <View style={globalStyles.form}>
                        <Input
                            label="Título"
                            placeholder="Digite aqui o título"
                            type="default"
                            value={title}
                     
                            onChangeText={text => setTitle(text)}
                        />

                        <TextArea
                            label="Conteúdo"
                            placeholder="Digite aqui o conteúdo"
                            onChangeText={setContent}
                        />

                        <Input
                            label="Data do Sermão"
                            placeholder="Selecionar data"
                            type="default"
                            value={date}
                            editable={false}
                            onPress={() => setCalendarVisible(true)}
                        />

                        <AttachButton
                            title={image ? "Arquivo selecionado" : "Escolher arquivo"}
                            onPress={handlePickImage}
                        />
                    </View>

                    <Button title="Salvar" onClick={handleSubmit} />

                    <ConfirmNotification
                        confirmText="Tentar novamente"
                        showCancel={false}
                        title="Erro ao salvar os dados!"
                        visible={errorVisible}
                        onConfirm={() => setErrorVisible(false)}
                    />
                    <Modal
                        visible={calendarVisible}
                        transparent
                        animationType="fade"
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                padding: 16,
                                width: "90%"
                            }}>
                                <Calendar
                                    onDayPress={(day) => {
                                        setDate(day.dateString);
                                        setCalendarVisible(false);
                                    }}
                                    markedDates={{
                                        [date]: { selected: true, selectedColor: "#4F46E5" },
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={() => setCalendarVisible(false)}
                                    style={{ marginTop: 12, alignSelf: "center" }}
                                >
                                    <Text style={{ color: "#4F46E5", fontWeight: "600" }}>
                                        Cancelar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>






            </ScrollView>
        </KeyboardAvoidingView>
    );
}
