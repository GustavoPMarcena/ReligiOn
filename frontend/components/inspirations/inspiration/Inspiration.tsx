import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import styles from "./styles";

type Props = {
    title: string,
    content: string,
    userName: string,
    publishDate: string,
    userProfile?: ImageSourcePropType,
}

export default function Inspiration({title, content, userName, publishDate, userProfile} : Props){
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View  style={styles.cardTop}>
                    {userProfile &&(
                    <TouchableOpacity>
                        <Image source={userProfile} style={styles.profileImage} />
                    </TouchableOpacity> 
                    )}
                    <Text style={styles.name}>{userName}</Text>
                </View>
                <Text style={styles.cardContent}>{publishDate}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardContent}>{content}</Text>
            </View>
        </View>
    );
}