import { Image, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
import RadioInput from "../../components/radioInput/RadioInput";
import Button from "../../components/button/Button";

export default function Signin() {
    const [userType, setUserType] = useState<"lider" | "membro">("lider");
    const navigation = useNavigation<any>();

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

                    <Button title="Criar conta" onClick={() => { }} />

                    <View style={globalStyles.footer}>
                        <Text style={globalStyles.linkText}>Já possui uma conta? </Text>
                        <Text onPress={() => { navigation.navigate('Login') }} style={globalStyles.link}>Login</Text>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}