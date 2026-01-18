import { Image, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/button/Button";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../validation/loginSchema";
import ConfirmNotification from "../../components/ConfirmNotification/ConfirmNotification";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);
    const navigation = useNavigation<any>();
    const { login } = useAuth();

    async function handleSubmit() {
        const result = loginSchema.safeParse({
            email,
            password
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });

            return;
        }

        setErrors({});
        try {
            await login(email, password);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Erro no login. Tente novamente.";

            setErrorMessage(message);
            setShowError(true);
        }
        
    }


    return (
        <ScrollView style={globalStyles.container}>
            <ConfirmNotification title={errorMessage ?? "Erro"} visible={showError} showCancel={false} onConfirm={() => {setShowError(false)}}/>
            <KeyboardAvoidingView behavior="padding">
                <Image
                    source={require("../../assets/logo.png")}
                    style={[globalStyles.logo, styles.logo]}
                    resizeMode="contain"
                />

                <View style={globalStyles.content}>
                    <View style={styles.container}>
                        <Text style={globalStyles.title}>Login</Text>
                        <Text style={globalStyles.subtitle}>
                            Insira suas credenciais para acessar sua conta
                        </Text>
                    </View>

                    <View style={globalStyles.form}>
                        <Input
                            label="Email *"
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
                            label="Senha *"
                            type="default"
                            isPassword
                            value={password}
                            onChangeText={text => {
                                setPassword(text);
                                setErrors(prev => ({ ...prev, password: undefined }));
                            }}
                            error={errors.password}
                        />
                    </View>

                    <Button title="Entrar" onClick={handleSubmit} />

                    <View style={globalStyles.footer}>
                        <Text style={globalStyles.linkText}>Não possui uma conta? </Text>
                        <Text
                            onPress={() => navigation.navigate('Signin')}
                            style={globalStyles.link}
                        >
                            Criar conta
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
