import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import ActionBar from "../actionBar/ActionBar";

type Props = {
  title: string;
  content: string;
  userName: string;
  publishDate: string;
  userProfile?: any;
  imageSrc?: any;
  showActionBar?: boolean,
  id?: string,
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export default function Sermao({id, title,content,userName,publishDate,userProfile,showActionBar= false, onDelete, onEdit,imageSrc}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {userProfile && (
            <Image source={userProfile} style={styles.profileImage} />
          )}

          <View>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.date}>{publishDate}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Feather name="more-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      <Image source={imageSrc} style={styles.bannerImage} />
      {showActionBar && (
                      <ActionBar id={id} onDelete={onDelete} onEdit={onEdit}/>
                  )}
    </View>
  );
}
