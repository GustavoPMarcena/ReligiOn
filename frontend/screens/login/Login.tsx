import { Image, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/button/Button"; 
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<any>();
    const {login} = useAuth();


    async function handleSubmit() {
        await login(email, password);
    }

    return (
        <ScrollView style={globalStyles.container}>
            <KeyboardAvoidingView behavior="padding" enabled>
            <Image
                source={require("../../assets/logo.png")}
                style={[globalStyles.logo, styles.logo]}
                resizeMode="contain"
            />

            <View style={[globalStyles.content,]}>
                <View style={styles.container}>
                    <Text style={globalStyles.title}>Login</Text>
                    <Text style={globalStyles.subtitle}>
                        Insira suas credenciais para acessar sua conta
                    </Text>
                </View>


                <View style={globalStyles.form}>
                    <Input
                        label="Email"
                        placeholder="anaferreira@gmail.com"
                        type="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        type="default"
                        label="Senha"
                        isPassword
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <Button title="Entrar" onClick={handleSubmit}/>

                <View style={globalStyles.footer}>
                    <Text style={globalStyles.linkText}>Não possui uma conta? </Text>
                    <Text onPress={() => { navigation.navigate('Signin') }} style={globalStyles.link}>Criar conta</Text>
                </View>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}