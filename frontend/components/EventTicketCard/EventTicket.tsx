import React from "react";
import { View } from "react-native";
import EventCard from "../EventCard/EventCard";
import styles from "./styles";

interface EventTicketProps {
  color?: string;
  tagText: string;
  title: string;
  dateText?: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActionButtons?: boolean; 
}

const EventTicket: React.FC<EventTicketProps> = ({
  color = "#007BFF",
  tagText,
  title,
  dateText,
  onPress,
  onEdit,
  onDelete,
  showActionButtons = false, 
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
          onEdit={onEdit}
          onDelete={onDelete}
          showActionButtons={showActionButtons}
        />
      </View>
    </View>
  );
};

export default EventTicket;