import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    label: {
        fontFamily: "JosefinSans",
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        fontFamily: "JosefinSans",
        width: 'auto',
        height: 44,
        flex: 1,
        padding: 20,
        opacity: 1,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#544C4C24',
    },
    passwordInput: {
        position: 'absolute',
        right: 0,

    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    passwordButton: {
        position: 'absolute',
        right: 12,
        top: '25%'
    },
    passwordIconVisible: {
        fontSize: 20
    }
});