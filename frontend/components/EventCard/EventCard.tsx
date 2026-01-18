import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface EventCardProps {
  tagText: string;
  tagColor?: string;
  title: string;
  dateText?: string;
  onPress?: () => void;
  showActionButtons?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  tagText,
  tagColor = "#007BFF",
  title,
  dateText,
  onPress,
  showActionButtons = false,
  onEdit,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >

      <View style={[styles.tag, { backgroundColor: tagColor }]}>
        <Text style={styles.tagText}>{tagText}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.divider} />

      {showActionButtons ? (
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
            <Ionicons name="create-outline" size={18} color="#000000" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={18} color="#000000" />
            <Text style={[styles.actionText, { color: "#000000" }]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ) : (
        dateText && (
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={18} color="#555" />
            <Text style={styles.dateText}>{dateText}</Text>
          </View>
        )
      )}

      {!showActionButtons && <View style={styles.divider} />}
    </TouchableOpacity>
  );
};

export default EventCard;