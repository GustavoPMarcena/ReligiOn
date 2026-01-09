import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingBottom: 150
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: "contain",
    },
    content: {
        width: "100%",
        paddingHorizontal: 24,
    },
    title: {
        fontFamily: "JosefinSans",
        fontWeight: 500,
        fontStyle: "normal",
        fontSize: 24,
    },
    subtitle: {
        fontFamily: "JosefinSans",
        color: '#7C7C7C',
        fontWeight: 400,
        fontSize: 15
    },
    button: {
        borderRadius: 6,
        backgroundColor: '#1D559F',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        fontFamily: "JosefinSans",
        color: 'white',
        fontWeight: 500,
    },
    form: {
        fontFamily: "JosefinSans",
        gap: 10,
        marginBottom: 24,
    },
    footer: {
        marginTop: 10,
        fontFamily: "JosefinSans",
        flexDirection: "row",
        justifyContent: "center",
    },
    link: {
        fontFamily: "JosefinSans",
        color: "#1E4F9A",
        fontWeight: "600",
    },
    linkText: {
        fontFamily: "JosefinSans",
    }
})