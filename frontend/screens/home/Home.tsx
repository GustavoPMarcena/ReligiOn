import { Text,View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import DayInspirational from "../../components/inspirations/dayInspirational/DayInspirational";
import InterestButton from "../../components/interestButton/interestButton";
import WeekInspirations from "../../components/inspirations/weekInspirations/WeekInspirations";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getUserApi, updateUserApi } from "../../services/apiConectionUser";
import { useNavigation } from "@react-navigation/native";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  userType: 'LEADER' | 'MEMBER';
  phone: string;
};

export default function Home() {
  const { user } = useAuth();
  const [actualUser, setActualUser] = useState<User | null>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!user) return;

    const testUserApi = async () => {
      try {
        const fetchedUser = await getUserApi(user.email);
        setActualUser(fetchedUser);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    testUserApi();
  }, [user]);
  
  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior="padding" enabled>

        <Header />

        <View style={styles.content}>

          <Text style={[globalStyles.titleStrong, styles.greeting]}>
            Olá, {actualUser?.name}
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
            <InterestButton title="Inspiracionais" onClick={() => { navigation.navigate('Inspiracional')}} />
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