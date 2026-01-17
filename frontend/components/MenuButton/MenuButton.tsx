import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface MenuButtonProps {
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  showArrow?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  iconName = "person-outline",
  onPress,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={iconName} size={22} color="#000" />
        <Text style={styles.title}>{title}</Text>
      </View>

      {showArrow && (
        <Ionicons name="chevron-forward" size={22} color="#999" />
      )}
    </TouchableOpacity>
  );
};

export default MenuButton;