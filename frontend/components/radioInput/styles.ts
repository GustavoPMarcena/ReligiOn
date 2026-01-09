import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {

    },

    label: {
        fontFamily: "JosefinSans",
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 10
    },


    options: {
        flexDirection: "row",
        gap: 32,
    },

    option: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
    },

    radio: {
     
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    radioSelected: {
        borderColor: "#000",
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#000",
    },

    optionLabel: {
        fontFamily: "JosefinSans",
        marginLeft: 8,
        fontSize: 16,
    },
});
