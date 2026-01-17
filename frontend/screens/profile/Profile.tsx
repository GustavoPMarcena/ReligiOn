import { KeyboardAvoidingView, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import MenuButton from "../../components/MenuButton/MenuButton";
import { styles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { deleteUserApi } from "../../services/apiConectionUser";
import Badge from "../../components/Badge/Badge";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";

export default function Profile() {
    const { logout, user } = useAuth();
    const navigation = useNavigation<any>();

    async function handleDeleteUser() {
        if(user?.id) {
            await deleteUserApi(user.id);
            logout();
        }
    }

    return (
        <KeyboardAvoidingView style={styles.scroll}>
            <ScrollView >
                <TopBar title="Perfil" />
                <View style={styles.profileView}>
                    <TouchableOpacity style={styles.profileImageContainer}>
                        <Image
                            source={require("../../assets/profile-photo.png")}
                            style={styles.image} />
                    </TouchableOpacity>

                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                    <Badge texto={user?.userType == "LEADER" ? "Líder" : "Membro"} cor="#1D559FCC" />
                </View>
                <MenuButton title="Editar perfil" />
                <MenuButton iconName="book-outline" title="Meus Sermões" />
                <MenuButton iconName="chatbox-ellipses-outline" title="Meus inspiracionais" onPress={() => { navigation.navigate("MeusInspiracionais") }} />
                <MenuButton iconName="calendar-outline" title="Meus eventos" />
                <MenuButton iconName="log-out-outline" title="Sair" showArrow={false} onPress={() => { logout() }} />
                <MenuButton iconName="close-circle-outline" title="Excluir conta" onPress={() => {handleDeleteUser}} showArrow={false} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}