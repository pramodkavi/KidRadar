import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import EmergencyContact from "../components/EmergencyContact/EmergencyContact";

function EmergencyContacts() {
  return (
    <View>
      <View>
        <Text style={styles.cardTitle}>Emergency Contacts</Text>
        <Text style={styles.cardBodyMessage}>
          Emergency contacts are the superheroes you can call when you need help
          in a pinch.
        </Text>
      </View>
      <View>
        <EmergencyContact
          contactNo={"0727289288"}
          name={"Mr. Thisura Perera"}
        />
        <EmergencyContact
          contactNo={"0778393888"}
          name={"Dr. Avishka Sathyanjana"}
        />
      </View>
    </View>
  );
}

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // Set your desired width
    height: 300, // Set your desired height
    resizeMode: "cover", // You can adjust the resizeMode as per your requirement
  },
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
    fontWeight: "650",
    color: "#555",
    marginBottom: 25,
    textAlign: "left",
    padding: 20,
    paddingBottom: 0,
  },
  cardBodyMessage: {
    textAlign: "justify",
    padding: 15,
    paddingTop: 0,
  },
  cardFooter: {
    marginTop: 15,
    display: "flex",
    alignItems: "flex-end",
  },
});
