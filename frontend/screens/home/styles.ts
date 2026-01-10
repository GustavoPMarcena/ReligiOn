import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    height: 200,
    width: "100%",
    position: "relative",
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  headerOverlay: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  profileContainer: {
    position: "absolute",
    top: 40,
    right: 20,
  },

  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  title: {
    fontFamily: "JosefinBold",
    fontSize: 42,
    color: "#FFFFFF",
    marginTop: 20,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  greeting: {
    marginBottom: 16,
  },

  sectionSpacing: {
    marginBottom: 24,
  },

  interestContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  weekCard: {
    marginBottom: 16,
  },
});
