import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: "5%",
  },

  header: {
    width: "100%",
    height: 40,
  },

  content: {
    padding: "5%",
  },

  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: "4%",
    paddingVertical: "1%",
    borderRadius: 4,
    marginBottom: "4%",
  },

  tagText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "600",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: "4%",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: "3%",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginVertical: "6%",
  },

  button: {
    alignSelf: "center",
    paddingVertical: "3%",
    paddingHorizontal: "18%",
    borderRadius: 8,
    borderWidth: 1.5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;