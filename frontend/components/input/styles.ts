import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    label: {
        fontFamily: "JosefinSemiBold",
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        fontFamily: "JosefinSans",
        width: 'auto',
        height: 54,
        flex: 1,
        paddingLeft: 25,
        opacity: 1,
        borderRadius: 6,
        fontSize: 16,
        borderWidth: 1,
        color: '#544C4C',
        borderColor: '#544C4C24',
        backgroundColor: '#ffffff'
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
    },
    errorText: {
        color: '#E63946',
        fontSize: 12,
        marginTop: 4,
    },
    inputError: {
        borderColor: '#E63946',
        borderWidth: 1,
    }
});