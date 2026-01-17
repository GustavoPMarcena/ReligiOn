import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "75%",
    padding: "4%",
    backgroundColor: "#FFF",
    borderRadius: 18,
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: "5%",
    paddingVertical: "1%",
    borderRadius: 3,
    marginBottom: "3%",
    backgroundColor: "#007AFF",
  },
  tagText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: "3%",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: "2%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
  },
});

export default styles;