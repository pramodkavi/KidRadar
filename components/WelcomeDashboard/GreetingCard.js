import React from "react";
import { Button, Card, Text } from "react-native-paper";
import styles from "./styles";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

function GreetingCard() {
  const navigation = useNavigation();
  const user = useSelector(state => state.users.users);
  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>Welcome to EduConnect</Text>
      <Text style={styles.cardBodyMessage}>
      EduConnect is your centralized platform for managing educational
        initiatives seamlessly. Explore the menu options to streamline your
        tasks, collaborate effectively.
      </Text>
      {user[0].role === 7000 &&
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
            School
          </Button>

          <Button
            mode="text"
            onPress={() => {
              navigation.navigate("Pathway Hub");
            }}
          >
            Pathway Hub
          </Button>
        </View>
      }
    </Card>
  );
}

export default GreetingCard;
