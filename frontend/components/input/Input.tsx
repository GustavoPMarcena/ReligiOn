
import { View, TextInput, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { styles } from "./styles";

interface Props {
    type: 'default' | 'email-address' | 'numeric' | undefined;
    label: string,
    placeholder?: string,
    isPassword?: boolean,
    value?: string;
    onChangeText: (text: string) => void;
}

export default function Input({ type, label, placeholder, isPassword, value, onChangeText }: Props) {
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
                        <TextInput style={styles.input} onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={!visible} ></TextInput>
                        <TouchableOpacity style={styles.passwordButton} onPress={changeVisible}>
                            <Ionicons name={visible ? 'eye' : 'eye-off'} size={22} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput style={styles.input} keyboardType={type} onChangeText={onChangeText} placeholder={placeholder} value={value}></TextInput>
                )}
            </View>
        </>
    )
}