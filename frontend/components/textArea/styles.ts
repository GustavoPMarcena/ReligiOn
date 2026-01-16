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
    textArea: {
        fontFamily: "JosefinSans",
        minHeight: 100,
        maxHeight: 450,
        paddingLeft: 20,
        paddingTop: 15,
        borderRadius: 6,
        fontSize: 16,
        borderWidth: 1,
        color: '#544C4C',
        borderColor: '#544C4C24',
        textAlignVertical: "top",
        backgroundColor: '#ffffff'
    },
});