import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { globalStyles } from "../../global/css/globalStyles";
import { styles } from "./styles";

import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/header/Header";
import DayInspirational from "../../components/inspirations/dayInspirational/DayInspirational";
import WeekInspirations from "../../components/inspirations/weekInspirations/WeekInspirations";
import InterestButton from "../../components/interestButton/interestButton";

import { getUserApi } from "../../services/apiConectionUser";
import { getInspirationsApi } from "../../services/apiConectionInspirational";
import { formatDate } from "../../utils/formatDate";
import { createUserType } from "../../types/User";
import { InspirationalResponse } from "../../types/Inspirational";

export default function Home() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  const [actualUser, setActualUser] = useState<createUserType | null>(null);
  const [inspirations, setInspirations] = useState<InspirationalResponse[]>([]);

  // 🔹 Buscar usuário
  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserApi(user.email);
        setActualUser(fetchedUser);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [user]);

  // 🔹 Buscar inspiracionais
  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const response = await getInspirationsApi();
        setInspirations(response);
      } catch (error) {
        console.error("Erro ao buscar inspiracionais:", error);
      }
    };

    fetchInspirations();
  }, []);


  return (
    <ScrollView
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView behavior="padding" enabled>

        <Header />

        <View style={styles.content}>
          <Text style={[globalStyles.titleStrong, styles.greeting]}>
            Olá, {actualUser?.name}
          </Text>

      
          {inspirations[0] ? (
            <View style={styles.sectionSpacing}>
              <DayInspirational
                title="Inspiracional do dia!"
                subtitle={inspirations[0]?.title}
                content={inspirations[0]?.content}
              />
            </View>
          ) : (
            <View style={styles.sectionSpacing}>
            <DayInspirational
              title="Inspiracional do dia!"
              subtitle="Confie no Tempo de Deus"
              content="Às vezes, o silêncio de Deus não é ausência, mas preparação. Ele trabalha nos bastidores, moldando o caminho, fortalecendo o coração e alinhando os propósitos."
            />
          </View>
          )}

       
          <View style={styles.interestContainer}>
            <InterestButton
              title="Sermões"
              onClick={() => navigation.navigate("Sermoes")}
            />
            <InterestButton
              title="Eventos"
              onClick={() => navigation.navigate("Eventos")}
            />
            <InterestButton
              title="Inspiracionais"
              onClick={() => navigation.navigate("Inspiracional")}
            />
          </View>


          <View style={styles.sectionHeader}>
            <Text style={globalStyles.titleStrong}>
              Inspiracionais da semana
            </Text>

            <TouchableOpacity>
              <Text style={globalStyles.subtitleBlue}>Ver mais</Text>
            </TouchableOpacity>
          </View>

          {inspirations[1] ? (
            <View style={styles.weekCard}>
              <WeekInspirations
                date={formatDate(inspirations[1]?.createdAt)}
                title={inspirations[1]?.title}
                content={inspirations[1]?.content}
              />
            </View>
          ) : (
            <View style={styles.weekCard}>
            <WeekInspirations
              date="12-04-2025"
              title="Confie no Tempo de Deus"
              content="Às vezes, o silêncio de Deus não é ausência, mas preparação. Ele trabalha nos bastidores, moldando o caminho, fortalecendo o coração e alinhando os propósitos."
            />
            </View>
          )}
        </View>

      </KeyboardAvoidingView>
    </ScrollView>
  );
}
