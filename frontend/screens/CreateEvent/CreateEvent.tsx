import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View, Pressable, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TopBar from "../../components/TopBar/TopBar";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import TextArea from "../../components/textArea/TextArea";
import Button from "../../components/button/Button";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";
import { createEventApi } from "../../services/apiConectionEvent";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function CreateEvent() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [publico, setPublico] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  // estado para mostrar erros
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function formatDate(d: Date | null) {
    if (!d) return "Selecione a data";
    return d.toLocaleDateString("pt-BR");
  }

  async function getCoordinatesFromAddress(addr: string) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        addr
      )}`;
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "MeuAppEventos/1.0 (seuemail@exemplo.com)",
        },
      });

      if (response.data.length > 0) {
        const location = response.data[0];
        return {
          latitude: Number(location.lat),
          longitude: Number(location.lon),
        };
      } else {
        throw new Error("Endereço não encontrado");
      }
    } catch (err) {
      throw new Error("Falha ao buscar coordenadas");
    }
  }

  const handleCreate = async () => {
    if (!date) {
      setErrorMessage("Selecione a data do evento");
      setErrorModalVisible(true);
      return;
    }
    if (!title || !publico || !description) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      setErrorModalVisible(true);
      return;
    }

    try {
      let lat = latitude ? Number(latitude) : undefined;
      let lon = longitude ? Number(longitude) : undefined;

      if ((!lat || !lon) && address) {
        const coords = await getCoordinatesFromAddress(address);
        lat = coords.latitude;
        lon = coords.longitude;
        setLatitude(String(lat));
        setLongitude(String(lon));
      }

      if (!lat || !lon) {
        setErrorMessage("Informe endereço ou latitude e longitude válidos");
        setErrorModalVisible(true);
        return;
      }

      await createEventApi({
        title,
        publico,
        description,
        date: date.toISOString(),
        latitude: lat,
        longitude: lon,
      });

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      setErrorMessage("Não foi possível criar o evento");
      setErrorModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={globalStyles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <TopBar title="Criar evento" />

        <View style={styles.content}>
          <Input
            label="Título"
            type="default"
            placeholder="Nome do evento"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            label="Público"
            type="default"
            placeholder="Público alvo"
            value={publico}
            onChangeText={setPublico}
          />

          <Text style={styles.label}>Data do evento</Text>
          <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
            <Text style={[styles.inputText, !date && { color: "#999" }]}>
              {formatDate(date)}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={date ?? new Date()}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <TextArea
            label="Descrição"
            placeholder="Descreva o evento"
            onChangeText={setDescription}
          />

          <Input
            label="Endereço"
            type="default"
            placeholder="Digite o endereço"
            value={address}
            onChangeText={setAddress}
          />

          <Input
            label="Latitude (opcional)"
            type="numeric"
            value={latitude}
            onChangeText={setLatitude}
          />

          <Input
            label="Longitude (opcional)"
            type="numeric"
            value={longitude}
            onChangeText={setLongitude}
          />

          <View style={{ marginTop: 20 }}>
            <Button title="Criar evento" onClick={handleCreate} />
          </View>
        </View>
      </ScrollView>

      <ConfirmNotification
        visible={errorModalVisible}
        title={errorMessage}
        iconName="alert-circle-outline"
        iconColor="#C53030"
        showCancel={false}
        onConfirm={() => setErrorModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
