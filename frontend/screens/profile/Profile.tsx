import { KeyboardAvoidingView, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import MenuButton from "../../components/MenuButton/MenuButton";
import { styles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { deleteUserApi } from "../../services/apiConectionUser";
import { useState } from "react";
import Badge from "../../components/Badge/Badge";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";
import { updateUserApi } from "../../services/apiConectionUser";
import { createUserType } from "../../types/User";
import { getImageSource } from "../../utils/getImageProfile";

export default function Profile() {
    const { logout, user, reloadUser } = useAuth();
    const userImage = getImageSource(user?.image ?? "");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [func, setFunc] = useState(user?.role);
    const [phone, setPhone] = useState(user?.phone);
    const navigation = useNavigation<any>();

    async function handleDeleteUser() {
        if (user?.id) {
            console.log("aa")
            await deleteUserApi(user.id);
            logout();
        }
        console.log("aa")
    }

    async function handleSaveUser() {
        if (!name || !email || !phone || !func || !user?.userType) return;
        if (user?.id) {
            const updatedUser : createUserType = {
                name,
                email,
                phone,
                role: func,
                userType: user?.userType
            } 
            const a = await updateUserApi(user.id, updatedUser);
            console.log(a);
            reloadUser();
            setIsEditing(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.scroll}>
            <ScrollView >
                {isEditing ? (
                    <View>
                        <TopBar title="Editar perfil" />
                        <View style={styles.profileView}>
                            <TouchableOpacity style={styles.profileImageContainer}>
                                <Image
                                    source={userImage}
                                    style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.editContainer}>
                            <Input label="Nome" type="default" value={name} onChangeText={setName} />
                            <Input label="Email" type="email-address" value={email} onChangeText={setEmail} />
                            <Input label="Função" type="default" value={func} onChangeText={setFunc} />
                            <Input label="Telefone" type="numeric" value={phone} onChangeText={setPhone} />
                            <View style={styles.buttonContainer}>
                                <Button title="Salvar" onClick={handleSaveUser} />
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <TopBar title="Perfil" />
                        <View style={styles.profileView}>
                            <TouchableOpacity style={styles.profileImageContainer}>
                                <Image
                                    source={userImage}
                                    style={styles.image} />
                            </TouchableOpacity>

                            <Text style={styles.name}>{user?.name}</Text>
                            <Text style={styles.email}>{user?.email}</Text>
                            <Badge texto={user?.userType == "LEADER" ? "Líder" : "Membro"} cor="#1D559FCC" />
                        </View>
                        <MenuButton title="Editar perfil" onPress={() => { setIsEditing(true) }} />
                        <MenuButton iconName="book-outline" title="Meus Sermões" />
                        <MenuButton iconName="chatbox-ellipses-outline" title="Meus inspiracionais" onPress={() => { navigation.navigate("MeusInspiracionais") }} />
                        <MenuButton iconName="calendar-outline" title="Meus eventos" />
                        <MenuButton iconName="log-out-outline" title="Sair" showArrow={false} onPress={() => { logout() }} />
                        <MenuButton iconName="close-circle-outline" title="Excluir conta" onPress={() => { handleDeleteUser() }} showArrow={false} />
                    </View>
                )}

            </ScrollView>
        </KeyboardAvoidingView >
    );
}