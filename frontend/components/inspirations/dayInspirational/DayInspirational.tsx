import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../../global/css/globalStyles";

type Props = {
    title: string,
    subtitle: string, 
    content: string
}

export default function DayInspirational({title, subtitle, content} : Props) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={globalStyles.titleStrong}>{title}</Text>
                <Image
                style={styles.logo} 
                   source={require("../../../assets/crown-icon.png")} 
                />
            </View>
            <Text style={globalStyles.subtitleBlue}>{subtitle}</Text>
            <Text style={globalStyles.contentBlue}>{content}</Text>
        </View>
    );
}