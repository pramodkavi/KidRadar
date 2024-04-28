import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import GreetingCard from "../components/WelcomeDashboard/GreetingCard";
import { setInstitute } from "../slices/InstituteSlice";
import { setPreSchoolCasesCount } from "../slices/PreSchoolCasesCountSlice";
import { fetchInstitute, fetchPreSchoolCasesCount } from "../util/http";

function WelcomeDashboard() {
  // Fetching pre school count details
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCases() {
      try {
        const preCasesCountFetch = await fetchPreSchoolCasesCount();
        dispatch(setPreSchoolCasesCount(preCasesCountFetch)); // Dispatching setCase action
      } catch (error) {
        console.error("Could not fetch Pre School Cases:", error);
      }
    }

    getCases();
  }, [dispatch]); // Added dispatch as a dependency

  // Fetching cases details
  useEffect(() => {
    async function getCases() {
      try {
        const casesFetch = await fetchCases();
        dispatch(setCase(casesFetch)); // Dispatching setCase action
      } catch (error) {
        console.error("Could not fetch cases:", error);
        // Handle error as needed
      }
    }

    getCases();
  }, [dispatch]);
  useEffect(() => {
    async function getCases() {
      try {
        const institutesFetch = await fetchInstitute();
        dispatch(setInstitute(institutesFetch)); // Dispatching setCase action
      } catch (error) {
        console.error("Could not fetch Institutes:", error);
      }
    }

    getCases();
  }, [dispatch]); // Added dispatch as a dependency
  return (
    <View>
      <GreetingCard />
      <View>
        <Image
          source={require("../assets/IMG/welcomeImg.png")} // Change the path to your image file
          style={styles.image}
        />
      </View>
    </View>
  );
}

export default WelcomeDashboard;

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
});
