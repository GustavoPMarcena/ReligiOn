import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import styles from "./styles";
import ActionBar from "../../actionBar/ActionBar";

type Props = {
    id?: string,
    title: string,
    content: string,
    userName: string,
    publishDate: string,
    userProfile?: ImageSourcePropType,
    showActionBar?: boolean,
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export default function Inspiration({id, title, content, userName, publishDate, userProfile, showActionBar= false, onDelete, onEdit} : Props){
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
            {showActionBar && (
                <ActionBar id={id} onDelete={onDelete} onEdit={onEdit}/>
            )}
        </View>
    );
}