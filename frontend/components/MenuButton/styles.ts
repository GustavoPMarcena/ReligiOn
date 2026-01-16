import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    marginVertical: "2%",

    paddingVertical: "3%",
    paddingHorizontal: "4%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#FFF",
    borderRadius: 6,

  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});

export default styles;