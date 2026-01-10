import { View, Text } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../../global/css/globalStyles";

type Props = {
  title: string;
  date: string;
  content: string;
};

export default function WeekInspirations({ title, date, content }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.sideBar} />

      <View style={styles.textContainer}>
        <Text style={[globalStyles.contentBlue, styles.date]}>
          {date}
        </Text>

        <Text style={[globalStyles.titleStrong, styles.title]}>
          {title}
        </Text>

        <Text style={globalStyles.contentBlue}>
          {content}
        </Text>
      </View>
    </View>
  );
}