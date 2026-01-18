import {
    KeyboardAvoidingView,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { updateUserSchema } from "../../validation/updateUserSchema";
import TopBar from "../../components/TopBar/TopBar";
import MenuButton from "../../components/MenuButton/MenuButton";
import Badge from "../../components/Badge/Badge";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { deleteUserApi, updateUserApi } from "../../services/apiConectionUser";
import { getImageSource } from "../../utils/getImageProfile";

export default function Profile() {
    const { logout, user, reloadUser } = useAuth();
    const navigation = useNavigation<any>();
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; role?: string; phone?: string; }>({});
    const userImage = getImageSource(user?.image ?? "");

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [func, setFunc] = useState(user?.role);
    const [phone, setPhone] = useState(user?.phone);

    const [pickedImage, setPickedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setFunc(user?.role);
        setPhone(user?.phone);
    }, [user]);

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            setPickedImage(result.assets[0]);
        }
    }

    async function handleSaveUser() {
        if (!user?.id || !user?.userType) return;
        if (!name || !email || !phone || !func) return;

        const result = updateUserSchema.safeParse({
            name,
            role: func,
            phone,
            email
        });
        console.log(result)
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                email: fieldErrors.email?.[0],
                role: fieldErrors.role?.[0],
                name: fieldErrors.name?.[0],
                phone: fieldErrors.phone?.[0]
            });

            return;
        }
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("role", func);
        formData.append("userType", user.userType);

        if (pickedImage) {
            formData.append("image", {
                uri: pickedImage.uri,
                name: "profile.jpg",
                type: "image/jpeg",
            } as any);
        }

        await updateUserApi(user.id, formData);
        await reloadUser();

        setPickedImage(null);
        setIsEditing(false);
    }

    async function handleDeleteUser() {
        if (!user?.id) return;
        await deleteUserApi(user.id);
        logout();
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.scroll}>
            <ScrollView>
                {isEditing ? (
                    <View>
                        <TopBar title="Editar perfil" />

                        <View style={styles.profileView}>
                            <TouchableOpacity
                                style={styles.profileImageContainer}
                                onPress={pickImage}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={
                                        pickedImage
                                            ? { uri: pickedImage.uri }
                                            : userImage
                                    }
                                    style={styles.image}
                                />

                                <View style={styles.cameraOverlay}>
                                    <Ionicons name="camera" size={22} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.editContainer}>
                            <Input type="default" label="Nome" value={name} onChangeText={text => {
                                setName(text);
                                setErrors(prev => ({ ...prev, name: undefined }));
                            }} 
                            error={errors.name}/>
                            <Input label="Email" type="email-address" value={email} onChangeText={text => {
                                setEmail(text);
                                setErrors(prev => ({ ...prev, email: undefined }));
                            }}
                            error={errors.email} />
                            <Input type="default" label="Função" value={func} onChangeText={text => {
                                setFunc(text);
                                setErrors(prev => ({ ...prev, role: undefined }));
                            }}
                            error={errors.role} />
                            <Input label="Telefone" type="numeric" value={phone} onChangeText={text => {
                                setPhone(text);
                                setErrors(prev => ({ ...prev, phone: undefined }));
                            }}
                            error={errors.phone} />

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
                                <Image source={userImage} style={styles.image} />
                            </TouchableOpacity>

                            <Text style={styles.name}>{user?.name}</Text>
                            <Text style={styles.email}>{user?.email}</Text>

                            <Badge
                                texto={user?.userType === "LEADER" ? "Líder" : "Membro"}
                                cor="#1D559FCC"
                            />
                        </View>

                        <MenuButton title="Editar perfil" onPress={() => setIsEditing(true)} />
                        <MenuButton title="Meus Sermões" iconName="book-outline" />
                        <MenuButton
                            title="Meus inspiracionais"
                            iconName="chatbox-ellipses-outline"
                            onPress={() => navigation.navigate("MeusInspiracionais")}
                        />
                        <MenuButton title="Meus eventos" iconName="calendar-outline" />
                        <MenuButton
                            title="Sair"
                            iconName="log-out-outline"
                            showArrow={false}
                            onPress={logout}
                        />
                        <MenuButton
                            title="Excluir conta"
                            iconName="close-circle-outline"
                            showArrow={false}
                            onPress={handleDeleteUser}
                        />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
