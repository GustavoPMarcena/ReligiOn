import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: "6%",
    alignItems: "center",
  },

  icon: {
    marginBottom: "4%",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: "8%",
  },

  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#D1D1D1",
    paddingVertical: "4%",
    borderRadius: 7,
    alignItems: "center",
  },

  cancelText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
  },

  confirmButton: {
    flex: 1,
    backgroundColor: "#1D559F",
    paddingVertical: "4%",
    borderRadius: 7,
    alignItems: "center",
  },

  confirmText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;