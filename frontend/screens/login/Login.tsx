import { Image, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useNavigation } from "@react-navigation/native";
 
export default function Login() {
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={globalStyles.container}>
            <Image
                source={require("../../assets/logo.svg")}
                style={[globalStyles.logo, styles.logo]}
            />

            <View style={[globalStyles.content,]}>
                <View style={styles.container}>
                    <Text style={globalStyles.title}>Login</Text>
                    <Text style={globalStyles.subtitle}>
                        Insira suas credenciais para acessar sua conta
                    </Text>
                </View>


                <KeyboardAvoidingView style={globalStyles.form}>
                    <Input
                        label="Email"
                        placeholder="anaferreira@gmail.com"
                        type="email-address"
                        onChange={() => { }}
                    />

                    <Input
                        type="default"
                        label="Senha"
                        isPassword
                        onChange={() => { }}
                    />
                </KeyboardAvoidingView>

                <TouchableOpacity  style={globalStyles.button}>
                    <Text style={globalStyles.textButton}>Entrar</Text>
                </TouchableOpacity>

                <View style={globalStyles.footer}>
                    <Text style={globalStyles.linkText}>Não possui uma conta? </Text>
                    <Text onPress={() => { navigation.navigate('Signin') }} style={globalStyles.link}>Criar conta</Text>
                </View>
            </View>
        </ScrollView>
    );
}