import React from "react";
import { Button, Card, Text } from "react-native-paper";
import styles from "./styles";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function GreetingCard() {
  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle}>Welcome to KidRadar</Text>
      <Text style={styles.cardBodyMessage}>
        A dialog is a type of modal window that appears in front of app content
        to provide critical information, or prompt for a decision to be made.{" "}
      </Text>
      <View style={styles.cardFooter}>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Log In
        </Button>
      </View>
    </Card>
  );
}

export default GreetingCard;
