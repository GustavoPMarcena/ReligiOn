import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
    label: string,
    placeholder?: string,
    value?: string,
    onChangeText: (text: string) => void;
}

export default function TextArea({label, value, placeholder, onChangeText}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.textArea} value={value} onChangeText={onChangeText} placeholder={placeholder} multiline={true}></TextInput>
        </View>
    );
}