import React from "react";
import { View } from "react-native";
import EventCard from "../EventCard/EventCard";
import styles from "./styles";

interface EventTicketProps {
  color?: string;
  tagText: string;
  title: string;
  dateText: string;
  onPress?: () => void;
}

const EventTicket: React.FC<EventTicketProps> = ({
  color = "#007BFF",
  tagText,
  title,
  dateText,
  onPress,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={[styles.ticket, { backgroundColor: color }]} />
        <EventCard
          tagText={tagText}
          tagColor={color} 
          title={title}
          dateText={dateText}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default EventTicket;