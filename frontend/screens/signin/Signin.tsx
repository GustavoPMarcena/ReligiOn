import { Image, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
import RadioInput from "../../components/radioInput/RadioInput";
import Button from "../../components/button/Button";
import { createUserApi } from "../../services/apiConectionUser";


export default function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState<"lider" | "membro">("lider");
    const [userType, setUserType] = useState<"LEADER" | "MEMBER">("LEADER");
    const navigation = useNavigation<any>();

    async function handleSubmit() {
        setUserType((type == "membro") ? "MEMBER" : "LEADER");
        const createdUser = await createUserApi({name, email, role, phone, password, userType})
        setEmail(""); setName("");
        setRole(""); setPhone(""); setPassword("");
        console.log(createdUser);
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView 
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 100,
                }}
                keyboardShouldPersistTaps="handled" style={globalStyles.container}>

                <Image
                    source={require("../../assets/logo.png")}
                    style={[globalStyles.logo, styles.logo]}
                    resizeMode="contain"
                />

                <View style={globalStyles.content}>
                    <View style={styles.container}>
                        <Text style={globalStyles.title}>Criar conta</Text>
                        <Text style={globalStyles.subtitle}>Insira seus dados para criar sua conta </Text>
                    </View>

                    <KeyboardAvoidingView style={globalStyles.form}>
                        <Input
                            label="Nome"
                            placeholder="Ana Ferreira"
                            type="default"
                            value={name}
                            onChangeText={setName}
                        />

                        <Input
                            label="Email"
                            placeholder="anaferreira@gmail.com"
                            type="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            label="Função"
                            placeholder="Digite aqui sua função..."
                            type="default"
                            value={role}
                            onChangeText={setRole}
                        />
                        <Input
                            label="Telefone"
                            placeholder="80028922"
                            type="numeric"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <RadioInput
                            value={type}
                            onChange={setType}
                        />

                        <Input
                            type="default"
                            label="Senha"
                            isPassword
                            value={password}
                            onChangeText={setPassword}
                        />
                    </KeyboardAvoidingView>

                    <Button title="Criar conta" onClick={handleSubmit} />

                    <View style={globalStyles.footer}>
                        <Text style={globalStyles.linkText}>Já possui uma conta? </Text>
                        <Text onPress={() => { navigation.navigate('Login') }} style={globalStyles.link}>Login</Text>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}