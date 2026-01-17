import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface AttachButtonProps {
  title: string;
  onPress?: () => void;
}

const AttachButton: React.FC<AttachButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>

      <Ionicons name="attach-outline" size={22} color="#000" />
    </TouchableOpacity>
  );
};

export default AttachButton;