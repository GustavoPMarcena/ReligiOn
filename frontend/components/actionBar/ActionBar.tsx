import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { deleteInspirationApi } from "../../services/apiConectionInspirational";
import { updateSermaoApi } from "../../services/ApiConectionSermao";
import { useNavigation } from "@react-navigation/native";

type Props = {
    id?: string,
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
};

export default function ActionBar({id, onDelete, onEdit}: Props) {
    const navigation = useNavigation();
    if(!id) return;
    const handleDelete = async () =>{       
        try{
            await deleteInspirationApi(id);
            onDelete?.(id);
        } catch(error){
            console.log("Erro ao excluir: ", error);
        }
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button} onPress={() => onEdit?.(id)}>
                <Text style={styles.text}>Editar</Text>
                <Ionicons name="create-outline" size={20} color="#000" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.text}>Excluir</Text>
                <Ionicons name="trash-outline" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );
}