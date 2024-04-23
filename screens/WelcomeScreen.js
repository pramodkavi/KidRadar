import React from "react";
import { Image, StyleSheet, View } from "react-native";
import GreetingCard from "../components/WelcomeScreen/GreetingCard";

function WelcomeScreen() {
  return (
    <View>
      <GreetingCard />
      <View>
        <Image
          source={require('../assets/IMG/welcomeImg.png')} // Change the path to your image file
          style={styles.image}
        />
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%", // Set your desired width
    height: 300, // Set your desired height
    resizeMode: 'cover', // You can adjust the resizeMode as per your requirement
  },
});