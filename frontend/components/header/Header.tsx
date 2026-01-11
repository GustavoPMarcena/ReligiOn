import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Header() {
    return (
        <View style={styles.header}>
            <Image
                source={require("../../assets/header-logo.png")}
                style={styles.headerBackground}
            />

            <View style={styles.headerOverlay}>
                <TouchableOpacity style={styles.profileContainer}>
                    <Image
                        source={require("../../assets/profile-photo.png")}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>ReligiOn</Text>
            </View>
        </View>
    );
}