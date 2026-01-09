
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { styles } from "./styles";

interface Props {
    type: 'default' | 'email-address' | undefined;
    label: string,
    placeholder?: string,
    isPassword?: boolean,
    onChange: () => void
}

export default function Input({ type, label, placeholder, isPassword, onChange }: Props) {
    const [visible, setVisible] = useState(false);

    function changeVisible() {
        setVisible(!visible);
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                {isPassword ? (
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.input} onChange={onChange} placeholder={placeholder} secureTextEntry={!visible} ></TextInput>
                        <TouchableOpacity style={styles.passwordButton} onPress={changeVisible}>
                            <Ionicons name={visible ? 'eye' : 'eye-off'} size={22} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput style={styles.input} keyboardType={type} onChange={onChange} placeholder={placeholder} ></TextInput>
                )}
            </View>
        </>
    )
}