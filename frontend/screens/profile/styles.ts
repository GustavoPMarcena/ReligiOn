import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    profileView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    profileImageContainer: {

    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 70,
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
    },
    cameraOverlay: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        padding: 6,
    },

})