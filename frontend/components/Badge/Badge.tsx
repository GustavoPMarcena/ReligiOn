import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

interface BadgeProps {
  texto: string;
  cor?: string;
}

const Badge: React.FC<BadgeProps> = ({
  texto,
  cor = "#1D559F",
}) => {
  return (
    <View style={[styles.container, { backgroundColor: cor }]}>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
};

export default Badge;