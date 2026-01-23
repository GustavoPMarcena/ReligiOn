import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderRadius: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  name: {
    fontFamily: "JosefinBold",
    fontSize: 15,
  },

  date: {
    fontFamily: "JosefinSans",
    fontSize: 13,
    color: "#888",
  },

  title: {
    fontFamily: "JosefinBold",
    fontSize: 20,
    marginBottom: 8,
  },

  content: {
    fontFamily: "JosefinSans",
    fontSize: 15,
    color: "#777",
    marginBottom: 12,
  },

  bannerImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
});

export default styles;
