import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingRight: 18,
    marginVertical: 10,
    elevation: 4,
  },

  sideBar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: "#2E6BD9",
    marginRight: 16,
  },

  textContainer: {
    flex: 1,
  },

  date: {
    fontSize: 14,
    marginBottom: 6,
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
  },
});