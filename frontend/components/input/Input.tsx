
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { styles } from "./styles";

interface Props {
    type: 'default' | 'email-address' | 'numeric' | undefined;
    label: string;
    placeholder?: string;
    isPassword?: boolean;
    editable?: boolean
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
    error?: string;
}

export default function Input({type, label, placeholder, isPassword, value, editable, onChangeText, onPress, error}: Props) {
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
                        onPress={onPress}
                        editable={editable ?? true}
                    />
                    <TouchableOpacity style={styles.passwordButton} onPress={() => setVisible(!visible)}>
                        <Ionicons name={visible ? 'eye' : 'eye-off'} size={22} />
                    </TouchableOpacity>
                </View>
            ) : (
                editable ? (
                    <TextInput
                            style={[
                                styles.input,
                                error && styles.inputError
                            ]}
                            keyboardType={type}
                            placeholder={placeholder}
                            value={value}
                            editable={editable ?? true}
                             onChangeText={onChangeText}
                            pointerEvents={onPress ? "none" : "auto"}
                        />
                ): (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onPress}
                        disabled={!onPress}
                    >
                        <TextInput
                            style={[
                                styles.input,
                                error && styles.inputError
                            ]}
                            keyboardType={type}
                            placeholder={placeholder}
                            value={value}
                            editable={editable ?? true}
                             onChangeText={onChangeText}
                            pointerEvents={onPress ? "none" : "auto"}
                        />
                    </TouchableOpacity>
                )
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}