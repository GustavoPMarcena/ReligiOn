import { View, Text, Pressable, StyleSheet } from "react-native";
import { styles } from "./styles";

type UserType = "lider" | "membro";

interface Props {
    value: UserType;
    onChange: (value: UserType) => void;
}

export default function RadioInput({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Tipo de Usuário
            </Text>

            <View style={styles.options}>
                <RadioOption
                    label="Líder"
                    selected={value === "lider"}
                    onPress={() => onChange("lider")}
                />

                <RadioOption
                    label="Membro"
                    selected={value === "membro"}
                    onPress={() => onChange("membro")}
                />
            </View>
        </View>
    );
}

function RadioOption({
    label,
    selected,
    onPress,
}: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) {
    return (
        <Pressable style={styles.option} onPress={onPress}>
            <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.optionLabel}>{label}</Text>
        </Pressable>
    );
}