import React, { useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  Pressable,
  Text} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TopBar from "../../components/TopBar/TopBar";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import TextArea from "../../components/textArea/TextArea";
import Button from "../../components/button/Button";
import { createEventApi } from "../../services/apiConectionEvent";
import { useNavigation } from "@react-navigation/native";

export default function CreateEvent() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [publico, setPublico] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  function formatDate(d: Date | null) {
    if (!d) return "Selecione a data";
    return d.toLocaleDateString("pt-BR");
  }

  const handleCreate = async () => {
    if (!date) {
      Alert.alert("Atenção", "Selecione a data do evento");
      return;
    }

    try {
      await createEventApi({
        title,
        publico,
        description,
        date: date.toISOString(),
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <TopBar title="Criar evento" />

      <View style={styles.content}>
        <Input
          label="Título"
          type="default"
          value={title}
          placeholder="Nome do evento"
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
        <Pressable
          style={styles.input}
          onPress={() => setShowPicker(true)}
        >
          <Text
            style={[
              styles.inputText,
              !date && { color: "#999" },
            ]}
          >
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
          label="Latitude"
          type="numeric"
          value={latitude}
          onChangeText={setLatitude}
        />

        <Input
          label="Longitude"
          type="numeric"
          value={longitude}
          onChangeText={setLongitude}
        />

        <View style={styles.buttonContainer}>
            <Button title="Criar evento" onClick={handleCreate} />
        </View>

      </View>
    </ScrollView>
  );
}
