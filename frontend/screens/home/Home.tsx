import { Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";

export default function Home() {
    return (
        <ScrollView style={globalStyles.container}>
            <KeyboardAvoidingView behavior="padding" enabled>
                 <Text>Tela de home</Text>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}