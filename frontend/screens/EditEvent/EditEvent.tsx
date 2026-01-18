import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, KeyboardAvoidingView, ScrollView, View, Text, TextInput, Pressable, Platform, StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TopBar from "../../components/TopBar/TopBar";
import { styles } from "./styles";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";
import Button from "../../components/button/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { updateEventApi, getEventByIdApi } from "../../services/apiConectionEvent";

export default function EditEvent() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { eventId } = route.params;

  const [title, setTitle] = useState("");
  const [publico, setPublico] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const event = await getEventByIdApi(eventId);

        setTitle(event.title);
        setPublico(event.publico);
        setDescription(event.description);
        setLatitude(String(event.latitude));
        setLongitude(String(event.longitude));
        if (event.date) setDate(new Date(event.date));

        if (event.latitude && event.longitude) {
          const addr = await getAddressFromCoordinates(
            Number(event.latitude),
            Number(event.longitude)
          );
          setAddress(addr);
        }
      } catch (err) {
        console.error("Erro ao carregar evento:", err);
      }
    }
    loadEvent();
  }, [eventId]);

  function formatDate(d: Date | null) {
    if (!d) return "Selecione a data";
    return d.toLocaleDateString("pt-BR");
  }

  async function getAddressFromCoordinates(lat: number, lon: number) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      const response = await axios.get(url, {
        headers: { "User-Agent": "MeuAppEventos/1.0 (seuemail@exemplo.com)" },
      });
      return response.data.display_name || "";
    } catch {
      return "";
    }
  }

  async function getCoordinatesFromAddress(addr: string) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        addr
      )}`;
      const response = await axios.get(url, {
        headers: { "User-Agent": "MeuAppEventos/1.0 (seuemail@exemplo.com)" },
      });
      if (response.data.length > 0) {
        return {
          lat: Number(response.data[0].lat),
          lon: Number(response.data[0].lon),
        };
      } else {
        throw new Error("Endereço não encontrado");
      }
    } catch {
      throw new Error("Falha ao buscar coordenadas");
    }
  }

  const handleAddressChange = (text: string) => {
    setAddress(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (text.trim() === "") return;

    debounceTimer.current = setTimeout(async () => {
      try {
        const coords = await getCoordinatesFromAddress(text);
        setLatitude(String(coords.lat));
        setLongitude(String(coords.lon));
      } catch {
        // ignora
      }
    }, 1000);
  };

  const handleLatLonChange = async (latStr: string, lonStr: string) => {
    setLatitude(latStr);
    setLongitude(lonStr);

    const latNum = Number(latStr);
    const lonNum = Number(lonStr);

    if (!latNum || !lonNum) return;

    try {
      const addr = await getAddressFromCoordinates(latNum, lonNum);
      setAddress(addr);
    } catch {
      // ignora
    }
  };

  const handleUpdate = async () => {
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

    const latNum = Number(latitude);
    const lonNum = Number(longitude);

    if (!latNum || !lonNum) {
      setErrorMessage("Informe latitude e longitude válidas");
      setErrorModalVisible(true);
      return;
    }

    try {
      await updateEventApi(eventId, {
        title,
        publico,
        description,
        date: date.toISOString(),
        latitude: latNum,
        longitude: lonNum,
      });
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao atualizar evento:", err);
      setErrorMessage("Não foi possível atualizar o evento");
      setErrorModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "height" : undefined}
        keyboardVerticalOffset={20}
      >
        <TopBar title="Editar evento" />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ ...styles.content, paddingBottom: 150 }}
        >
          <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do evento"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Público</Text>
            <TextInput
              style={styles.input}
              placeholder="Público alvo"
              value={publico}
              onChangeText={setPublico}
            />
          </View>

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

          <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, { height: 120, textAlignVertical: "top" }]}
              multiline
              placeholder="Descreva o evento"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={[styles.input, { height: 120, textAlignVertical: "top" }]}
              multiline
              placeholder="Digite o endereço"
              value={address}
              onChangeText={handleAddressChange}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={latitude}
              onChangeText={(text) => handleLatLonChange(text, longitude)}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={longitude}
              onChangeText={(text) => handleLatLonChange(latitude, text)}
            />
          </View>
          
          <View>
            <Button title="Salvar alterações" onClick={handleUpdate} />
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
    </SafeAreaView>
  );
}

