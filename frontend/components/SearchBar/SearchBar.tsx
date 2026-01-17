import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Pesquisar",
  value,
  onChangeText,
  onSearch,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity onPress={onSearch}>
          <Ionicons name="search" size={20} color="#1D559F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;