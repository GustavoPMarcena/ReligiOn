import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.header}>
            <Image
                source={require("../../assets/header-logo.png")}
                style={styles.headerBackground}
            />

            <View style={styles.headerOverlay}>
                <TouchableOpacity style={styles.profileContainer} onPress={() => {navigation.navigate("Profile")}}>
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