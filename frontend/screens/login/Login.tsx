import { FlatList, Image, Text, TouchableOpacity, View, Button } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "../../components/input/styles";
import Input from "../../components/input/Input";

export default function Login() {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("../../assets/logo.svg")}
        style={globalStyles.logo}
      />

      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Login</Text>
        <Text style={globalStyles.subtitle}>
          Insira suas credenciais para acessar sua conta
        </Text>

        <View style={globalStyles.form}>
          <Input
            label="Email"
            placeholder="anaferreira@gmail.com"
            type="email-address"
            onChange={() => {}}
          />

          <Input
            type="default"
            label="Senha"
            isPassword
            onChange={() => {}}
          />
        </View>

        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.textButton}>Entrar</Text>
        </TouchableOpacity>

        <View style={globalStyles.footer}>
          <Text style={globalStyles.linkText}>Não possui uma conta? </Text>
          <Text style={globalStyles.link}>Criar conta</Text>
        </View>
      </View>
    </View>
  );
}