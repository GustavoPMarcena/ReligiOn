import { TouchableOpacity, Text } from "react-native"
import { styles } from "./styles"

interface Props {
    title: string,
    onClick: () => void
}

export default function Button({title, onClick}: Props) {
    return(
        <TouchableOpacity  style={styles.button} onPress={onClick}>
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    )
}