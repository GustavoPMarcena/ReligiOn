import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    profileView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 20
    },
    profileImageContainer: {
        
    },
    image: {
        maxWidth: 140,
        maxHeight: 140,
        borderRadius: 100
    },
    name: {
        fontFamily: 'JosefinBold',
        fontSize: 20
    },
    email: {
        fontFamily: 'JosefinBold',
        color: '#544C4C'
    },
    scroll: {
        paddingBottom: 20
    },
    editContainer: {
        display: 'flex',
        gap: 10,
        padding: 20
    },
    buttonContainer: {
        paddingTop: 20,
        paddingHorizontal: 50
    }

})