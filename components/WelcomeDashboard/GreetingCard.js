import React from "react";
import { Button, Card, Text } from "react-native-paper";
import styles from "./styles";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function GreetingCard() {
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>Welcome to EduConnect</Text>
      <Text style={styles.cardBodyMessage}>
        EduConnect is your centralized platform for managing educational
        initiatives seamlessly. Explore the menu options to streamline your
        tasks, collaborate effectively.
      </Text>
      <View style={styles.cardFooter}>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("Overview");
          }}
        >
          Children Section
        </Button>

        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("School PreSchoool Overview");
          }}
        >
          Schools
        </Button>

        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("Pathway Hub");
          }}
        >
          Trainning Centers
        </Button>

        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("Emergency Contact");
          }}
        >
          Emergency Contact
        </Button>
      </View>
    </Card>
  );
}

export default GreetingCard;
