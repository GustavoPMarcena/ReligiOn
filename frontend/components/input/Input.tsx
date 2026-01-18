
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { styles } from "./styles";

interface Props {
    type: 'default' | 'email-address' | 'numeric' | undefined;
    label: string;
    placeholder?: string;
    isPassword?: boolean;
    value?: string;
    onChangeText: (text: string) => void;
    error?: string;
}

export default function Input({type, label, placeholder, isPassword, value, onChangeText, error}: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            {isPassword ? (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, error && styles.inputError]}
                        secureTextEntry={!visible}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                    />
                    <TouchableOpacity style={styles.passwordButton} onPress={() => setVisible(!visible)}>
                        <Ionicons name={visible ? 'eye' : 'eye-off'} size={22} />
                    </TouchableOpacity>
                </View>
            ) : (
                <TextInput
                    style={[
                        styles.input,
                        error && styles.inputError
                    ]}
                    keyboardType={type}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}