import { Image, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
import RadioInput from "../../components/radioInput/RadioInput";

export default function Signin() {
    const [userType, setUserType] = useState<"lider" | "membro">("lider");
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={globalStyles.container}>
            <Image
                source={require("../../assets/logo.svg")}
                style={[globalStyles.logo, styles.logo]}
            />

            <View style={globalStyles.content}>
                <View style={styles.container}>
                    <Text style={globalStyles.title}>Criar conta</Text>
                    <Text style={globalStyles.subtitle}>Insira seus dados para criar sua conta </Text>
                    <Text style={globalStyles.subtitle}>Campos com * indicam dados obrigatórios</Text>
                </View>

                <KeyboardAvoidingView style={globalStyles.form}>
                    <Input
                        label="Nome"
                        placeholder="Ana Ferreira"
                        type="default"
                        onChange={() => { }}
                    />

                    <Input
                        label="Email"
                        placeholder="anaferreira@gmail.com"
                        type="email-address"
                        onChange={() => { }}
                    />

                    <Input
                        label="Função"
                        placeholder="Digite aqui sua função..."
                        type="default"
                        onChange={() => { }}
                    />
                    <Input
                        label="Telefone"
                        placeholder="80028922"
                        type="numeric"
                        onChange={() => { }}
                    />
                    <RadioInput
                        value={userType}
                        onChange={setUserType}
                    />

                    <Input
                        type="default"
                        label="Senha"
                        isPassword
                        onChange={() => { }}
                    />
                </KeyboardAvoidingView>

                <TouchableOpacity style={globalStyles.button}>
                    <Text style={globalStyles.textButton}>Entrar</Text>
                </TouchableOpacity>

                <View style={globalStyles.footer}>
                    <Text style={globalStyles.linkText}>Já possui uma conta? </Text>
                    <Text onPress={() => { navigation.navigate('Login') }} style={globalStyles.link}>Login</Text>
                </View>
            </View>
        </ScrollView>
    )
}