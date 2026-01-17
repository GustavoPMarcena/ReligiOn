import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl} from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import TopBar from "../../components/TopBar/TopBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import EventTicket from "../../components/EventTicketCard/EventTicket";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import { getEventsApi } from "../../services/apiConectionEvent";
import { EventResponse } from "../../types/Event";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

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

export default function Events() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [events, setEvents] = useState<EventResponse[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = async () => {
    try {
      const response = await getEventsApi();
      setEvents(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const filteredEvents = events
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <TopBar title="Eventos" />

        <View style={styles.content}>
          <SearchBar
            placeholder="Pesquisar eventos"
            value={search}
            onChangeText={setSearch}
          />

          {filteredEvents.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum evento encontrado.
            </Text>
          ) : (
            filteredEvents.map(event => (
              <EventTicket
                key={event.id}
                tagText={event.publico}
                title={event.title}
                dateText={new Date(event.date).toLocaleDateString("pt-BR")}
                color={getColorFromTag(event.publico)}
                onPress={() =>
                  navigation.navigate("EventDetails", {
                    id: event.id,
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>

      {user?.userType === "LEADER" && (
        <FloatingButton
            onPress={() => navigation.navigate("CreateEvent")}
        />
    )}
    </>
  );
}
