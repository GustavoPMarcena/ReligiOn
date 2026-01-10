import { Text,View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import DayInspirational from "../../components/inspirations/dayInspirational/DayInspirational";
import InterestButton from "../../components/interestButton/interestButton";
import WeekInspirations from "../../components/inspirations/weekInspirations/WeekInspirations";

export default function Home() {
  const { user } = useAuth();

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior="padding" enabled>

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

        <View style={styles.content}>

          <Text style={[globalStyles.titleStrong, styles.greeting]}>
            Olá, {user?.name}
          </Text>

          <View style={styles.sectionSpacing}>
            <DayInspirational
              title="Inspiracional do dia!"
              subtitle="Confie no Tempo de Deus"
              content="Às vezes, o silêncio de Deus não é ausência, mas preparação. Ele trabalha nos bastidores, moldando o caminho, fortalecendo o coração e alinhando os propósitos."
            />
          </View>

          <View style={styles.interestContainer}>
            <InterestButton title="Sermões" onClick={() => {}} />
            <InterestButton title="Eventos" onClick={() => {}} />
            <InterestButton title="Inspiracionais" onClick={() => {}} />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={globalStyles.titleStrong}>
              Inspiracionais da semana
            </Text>

            <TouchableOpacity>
              <Text style={globalStyles.subtitleBlue}>Ver mais</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekCard}>
            <WeekInspirations
              date="12-04-2025"
              title="Confie no Tempo de Deus"
              content="Às vezes, o silêncio de Deus não é ausência, mas preparação. Ele trabalha nos bastidores, moldando o caminho, fortalecendo o coração e alinhando os propósitos."
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}