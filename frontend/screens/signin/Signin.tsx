import { Image, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
import RadioInput from "../../components/radioInput/RadioInput";
import Button from "../../components/button/Button";
import { createUserApi } from "../../services/apiConectionUser";
import { signinSchema } from "../../validation/siginSchema";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";

export default function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; role?: string; phone?: string; }>({});
    const [type, setType] = useState<"lider" | "membro">("lider");
    const [userType, setUserType] = useState<"LEADER" | "MEMBER">("LEADER");
    const [sucessAccount, setSucessAccount] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    const navigation = useNavigation<any>();


    async function handleSubmit() {
        const result = signinSchema.safeParse({
            name,
            role,
            phone,
            email,
            password
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                role: fieldErrors.role?.[0],
                name: fieldErrors.name?.[0],
                phone: fieldErrors.phone?.[0]
            });

            return;
        }

        setErrors({});
        try {
            setUserType((type == "membro") ? "MEMBER" : "LEADER");
            const createdUser = await createUserApi({ name, email, role, phone, password, userType });
            setSucessAccount(true);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Erro ao criar conta. Tente novamente.";

            setErrorMessage(message);
            setShowError(true);
        }



    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <ConfirmNotification title="Conta criada" visible={sucessAccount} confirmText="Ok" showCancel={false} onConfirm={() => navigation.navigate("Login")} />
            <ConfirmNotification title={errorMessage ?? "Erro"} visible={showError} showCancel={false} onConfirm={() => {setShowError(false)}}/>
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
                            onChangeText={text => {
                                setName(text);
                                setErrors(prev => ({ ...prev, name: undefined }));
                            }}
                            error={errors.name}
                        />

                        <Input
                            label="Email"
                            placeholder="anaferreira@gmail.com"
                            type="email-address"
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                                setErrors(prev => ({ ...prev, email: undefined }));
                            }}
                            error={errors.email}
                        />

                        <Input
                            label="Função"
                            placeholder="Digite aqui sua função..."
                            type="default"
                            value={role}
                            onChangeText={text => {
                                setRole(text);
                                setErrors(prev => ({ ...prev, role: undefined }));
                            }}
                            error={errors.role}
                        />
                        <Input
                            label="Telefone"
                            placeholder="80028922"
                            type="numeric"
                            value={phone}
                            onChangeText={text => {
                                setPhone(text);
                                setErrors(prev => ({ ...prev, phone: undefined }));
                            }}
                            error={errors.phone}
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
                            onChangeText={text => {
                                setPassword(text);
                                setErrors(prev => ({ ...prev, password: undefined }));
                            }}
                            error={errors.password}
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