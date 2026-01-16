import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface EventCardProps {
  tagText: string;
  tagColor?: string;
  title: string;
  dateText: string;
  onPress?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  tagText,
  tagColor = "#007BFF",
  title,
  dateText,
  onPress,
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

      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={18} color="#555" />
        <Text style={styles.dateText}>{dateText}</Text>
      </View>

      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

export default EventCard;