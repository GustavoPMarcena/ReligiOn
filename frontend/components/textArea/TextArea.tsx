import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
    label: string,
    placeholder?: string,
    onChangeText: (text: string) => void;
}

export default function TextArea({label, placeholder, onChangeText}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.textArea} onChangeText={onChangeText} placeholder={placeholder} multiline={true}></TextInput>
        </View>
    );
}