import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "JosefinBold",
    fontSize: 16,
    marginRight: 6,
  },

  divider: {
    width: 1,
    backgroundColor: "#ccc",
  },
});
export default styles;