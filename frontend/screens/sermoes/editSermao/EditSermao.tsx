import { KeyboardAvoidingView, Text, ScrollView, View } from "react-native";
import Button from "../../../components/button/Button";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createSermaoApi, getSermaoByIdApi, updateSermaoApi } from "../../../services/ApiConectionSermao";
import TopBar from "../../../components/TopBar/TopBar";
import { globalStyles } from "../../../global/css/globalStyles";
import TextArea from "../../../components/textArea/TextArea";
import Input from "../../../components/input/Input";
import AttachButton from "../../../components/AttachButton/AttachButton";
import * as ImagePicker from 'expo-image-picker';
import { Platform } from "react-native";
import ConfirmNotification from "../../../components/ConfirmNotification/ConfirmNotification";
import { Modal, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { sermaoSchema } from "../../../validation/sermaoSchema";

export default function EditSermao() {
    const route = useRoute<any>();
    const { sermaoId } = route.params;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const [errorVisible, setErrorVisible] = useState(false);
    const navigation = useNavigation<any>();
    const [errors, setErrors] = useState<{ title?: string; content?: string; date?: string }>({});

    useEffect(() => {
        if (!sermaoId) return;

        async function loadEvent() {
            try {
                const sermao = await getSermaoByIdApi(sermaoId);
                setTitle(sermao.title);
                setContent(sermao.content);
                setDate(sermao.date);
            } catch (err) {
                console.error("Erro ao carregar evento:", err);
            }
        }

        loadEvent();
    }, [sermaoId]);

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
            const validation = sermaoSchema.safeParse({
                title,
                content,
                date,
            });

            if (!validation.success) {
                const errosvalid = validation.error.flatten().fieldErrors;
                setErrors({
                    title: errosvalid.title?.[0],
                    content: errosvalid.content?.[0],
                    date: errosvalid.date?.[0],
                });
                return;
            }

            const formData = new FormData();

            formData.append("title", title);
            formData.append("content", content);
            formData.append("date", date);


            if (image) {
                formData.append("mediaFile", {
                    uri: image.uri,
                    name: "sermao.jpg",
                    type: "image/jpeg",
                } as any);
            }

            await updateSermaoApi(sermaoId, formData);

            navigation.goBack();
        } catch (error: any) {
            console.log("Erro:", error.response?.data || error);
            setErrorVisible(true);
        }
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <TopBar title="Editar Sermão" />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={[globalStyles.content, { paddingTop: 20 }]}>
                    <View style={globalStyles.form}>
                        <Input
                            label="Título"
                            placeholder="Digite aqui o título"
                            type="default"
                            value={title}

                            onChangeText={text => {
                                setTitle(text);
                                setErrors(prev => ({ ...prev, title: undefined }));
                            }}
                            error={errors.title}
                        />

                        <TextArea
                            label="Conteúdo"
                            placeholder="Digite aqui o conteúdo"
                            value={content}
                            onChangeText={setContent}
                        />

                        <Input
                            label="Data do Sermão"
                            placeholder="Selecionar data"
                            type="default"
                            value={date}
                            editable={false}
                            onPress={() => setCalendarVisible(true)}
                            error={errors.date}
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
