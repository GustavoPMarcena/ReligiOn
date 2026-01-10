import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: "#F8F8F8",
        paddingBottom: 40,
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
        fontFamily: "JosefinSemiBold",
        color: '#2A2A2A',
        
        fontSize: 25,
    },
    subtitle: {
        fontFamily: 'JosefinSans',
        color: '#7C7C7C',
        fontSize: 15
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