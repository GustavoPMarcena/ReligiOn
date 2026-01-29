import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigation } from "@react-navigation/native";
import { getEventsApi, deleteEventApi } from "../../services/apiConectionEvent";
import { useAuth } from "../../hooks/useAuth";
import { EventResponse } from "../../types/Event";
import EventTicket from "../../components/EventTicketCard/EventTicket";
import SearchBar from "../../components/SearchBar/SearchBar";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";
import { styles } from "./styles";

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
      .filter((word) => word.length > 3)[0] || "evento"
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

export default function MyEvents() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [events, setEvents] = useState<EventResponse[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventResponse[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadEvents() {
        try {
          setLoading(true);

          const allEvents: EventResponse[] = await getEventsApi();
          if (allEvents.length >= 1) {
            const myEvents = allEvents.filter(
              (event) => event.user?.name && event.user.name === user?.name
            );

            setEvents(myEvents);
            setFilteredEvents(myEvents);
          }

        } catch (err) {
          console.error("Erro ao carregar eventos:", err);
        } finally {
          setLoading(false);
        }
      }

      loadEvents();
    }, [user])
  );

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredEvents(events);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(lower) ||
          event.publico.toLowerCase().includes(lower)
      );
      setFilteredEvents(filtered);
    }
  }, [searchText, events]);

  const goToDetails = (id: string) => {
    navigation.navigate("EventDetails", { id }); // navega para tela de detalhes
  };

  const goToEdit = (id: string) => {
    navigation.navigate("EditEvent", { eventId: id });
  };

  const askDelete = (id: string) => {
    setEventToDelete(id);
    setConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEventApi(eventToDelete);
      setEvents((prev) => prev.filter((event) => event.id !== eventToDelete));
      setFilteredEvents((prev) => prev.filter((event) => event.id !== eventToDelete));
    } catch (err) {
      console.error("Erro ao excluir evento:", err);
    } finally {
      setConfirmVisible(false);
      setEventToDelete(null);
    }
  };

  const goToCreate = () => {
    navigation.navigate("CreateEvent");
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar title="Meus Eventos" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar title="Meus Eventos" />

      <ScrollView contentContainerStyle={styles.content}>
        <SearchBar
          placeholder="Pesquisar meus eventos"
          value={searchText}
          onChangeText={setSearchText}
        />

        {filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum evento encontrado.</Text>
          </View>
        ) : (
          filteredEvents.map((event) => (
            <EventTicket
              key={event.id}
              color={getColorFromTag(event.publico)}
              tagText={event.publico}
              title={event.title}
              showActionButtons
              onPress={() => goToDetails(event.id)}   // clique no card inteiro → detalhes
              onEdit={() => goToEdit(event.id)}       // botão editar → edição
              onDelete={() => askDelete(event.id)}    // botão excluir → modal
            />
          ))
        )}
      </ScrollView>

      <FloatingButton onPress={goToCreate} />

      <ConfirmNotification
        visible={confirmVisible}
        title="Deseja realmente excluir este evento?"
        iconName="trash-outline"
        iconColor="#C53030"
        cancelText="Cancelar"
        confirmText="Excluir"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={confirmDelete}
      />
    </SafeAreaView>
  );
}
