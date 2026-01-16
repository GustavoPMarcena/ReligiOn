import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 18, 
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 30,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#1d559f"
  },
  name: {
    fontSize: 15,
    fontFamily: 'JosefinBold',
  },
  cardTitle: {
    fontSize: 18,
    color: "#1d559f",
    marginBottom: 10,
    fontFamily: 'JosefinBold',
  },
  cardContent: {
    color: "#1d559f",
    fontFamily: 'JosefinSans',
    fontSize: 15
  },
  content: {
    padding: 10
  },
});

export default styles;