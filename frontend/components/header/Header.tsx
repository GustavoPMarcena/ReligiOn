import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { getImageSource } from "../../utils/getImageProfile";

export default function Header() {
    const {user} = useAuth();
    const userImage = getImageSource(user?.image ?? "");
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
                        source={userImage}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>ReligiOn</Text>
            </View>
        </View>
    );
}