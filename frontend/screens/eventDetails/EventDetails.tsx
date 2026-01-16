import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Linking} from "react-native";
import { useRoute } from "@react-navigation/native";
import { globalStyles } from "../../global/css/globalStyles";
import TopBar from "../../components/TopBar/TopBar";
import BigEventCard from "../../components/BigEventCard/BigEventCard";
import { getEventByIdApi } from "../../services/apiConectionEvent";
import { EventResponse } from "../../types/Event";

const TAG_COLORS = [
  "#30c571",
  "#1d559f",
  "#d17e00",
  "#7e208f",
  "#C53030",
  "#009688",
];

const normalizeTag = (text: string) => {
  return (
    text
      .toLowerCase()
      .replace(/[^a-zà-ú0-9 ]/gi, "")
      .split(" ")
      .filter(word => word.length > 3)[0] || "evento"
  );
};

const getColorFromTag = (text: string) => {
  const base = normalizeTag(text);

  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += base.charCodeAt(i);
  }

  return TAG_COLORS[sum % TAG_COLORS.length];
};

type RouteParams = {
  id: string;
};

export default function EventDetails() {
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const [event, setEvent] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadEvent = async () => {
    try {
      const data = await getEventByIdApi(id);
      setEvent(data);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  const openMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View
        style={[
          globalStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!event) {
    return (
      <View
        style={[
          globalStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Evento não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <TopBar title="Detalhes do evento" />

      <BigEventCard
        title={event.title}
        tagText={event.publico}
        dateText={new Date(event.date).toLocaleDateString("pt-BR")}
        description={event.description}
        color={getColorFromTag(event.publico)}
        onPressLocation={() =>
            openMaps(
                Number(event.latitude),
                Number(event.longitude)
            )
        }
      />
    </ScrollView>
  );
}
