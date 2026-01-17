import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F2F2F2",
  },
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: "5%",
    backgroundColor: "#F2F2F2",

    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  left: {
    width: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  right: {
    width: "10%",
  },
});

export default styles;