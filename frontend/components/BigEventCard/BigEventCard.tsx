import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface BigEventCardProps {
  color?: string;
  title: string;
  tagText: string;
  dateText: string;
  description: string;
  onPressLocation?: () => void;
}

const BigEventCard: React.FC<BigEventCardProps> = ({
  color = "#1D559F",
  title,
  tagText,
  dateText,
  description,
  onPressLocation,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: color }]} />

      <View style={styles.content}>

        <View style={[styles.tag, { backgroundColor: color }]}>
          <Text style={styles.tagText}>{tagText}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider} />

        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={18} color="#555" />
          <Text style={styles.dateText}>{dateText}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity
          style={[styles.button, { borderColor: color }]}
          onPress={onPressLocation}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color }]}>
            Ver local
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BigEventCard;