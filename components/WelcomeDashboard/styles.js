import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    display: "flex",
    marginLeft: "5%",
    marginTop: 20,
    padding: 30,
    width: "90%",
    backgroundColor: "#e9ddff",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
  },
  cardBodyMessage: {},
  cardFooter: {
    marginTop: 15,
    display: "flex",
    alignItems: "flex-end",
  },
});

export default styles;
