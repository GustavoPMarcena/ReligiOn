import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    padding: 25,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
  label: {
    fontFamily: "JosefinSemiBold",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    fontFamily: "JosefinSans",
    height: 54,
    paddingTop: 12,
    paddingLeft: 25,
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 1,
    color: "#544C4C",
    borderColor: "#544C4C24",
    backgroundColor: "#ffffff",
  },
  inputText: {
    fontSize: 16,
    color: "#544C4C",
    fontFamily: "JosefinSans",
  },
});
