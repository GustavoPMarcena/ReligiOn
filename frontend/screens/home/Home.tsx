import { Text, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import DayInspirational from "../../components/inspirations/dayInspirational/DayInspirational";
import InterestButton from "../../components/interestButton/interestButton";
import WeekInspirations from "../../components/inspirations/weekInspirations/WeekInspirations";

export default function Home() {
    const { user } = useAuth();

    return (
        <ScrollView style={globalStyles.container}>
            <KeyboardAvoidingView style={styles.localContainer} behavior="padding" enabled>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/header-logo.png")}
                        style={styles.headerBackground}
                    />

                    <View style={styles.headerOverlay}>
                        <TouchableOpacity style={styles.profileContainer}>
                            <Image
                                source={require("../../assets/profile-photo.png")}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>ReligiOn</Text>
                    </View>
                </View>
                <Text style={globalStyles.titleStrong}>Olá, {user?.name}</Text>

                <DayInspirational
                    title="Inspiracional do dia!"
                    subtitle="Confie no Tempo de Deus"
                    content="Às vezes, o silêncio de Deus não é ausência, mas preparação. Ele trabalha nos bastidores, moldando o caminho, fortalecendo o coração e alinhando os propósitos."
                />

                <View style={{display: 'flex', flexDirection:'row', justifyContent: 'center', gap: 10}}>
                    <InterestButton
                        title="Sermões"
                        onClick={() => {}}
                    />
                    <InterestButton
                        title="Eventos"
                        onClick={() => {}}
                    />
                    <InterestButton
                        title="Inspiracionais"
                        onClick={() => {}}
                    />
                </View>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={globalStyles.titleStrong}>Inspiracionais da semana</Text>
                    <TouchableOpacity>
                        <Text style={globalStyles.subtitleBlue}>Ver mais</Text>
                    </TouchableOpacity>
                </View>

                <WeekInspirations 
                date="12-04-2025"
                title="Confie no Tempo de Deus"  
                content="Às vezes, o silêncio de Deus não é ausência, mas preparação. Ele trabalha nos bastidores, moldando o caminho, fortalecendo o coração e alinhando os propósitos."/>


            </KeyboardAvoidingView>
        </ScrollView>
    )
}