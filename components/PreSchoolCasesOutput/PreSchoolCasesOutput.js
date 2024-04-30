import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import PreSchoolCasesList from "./PreSchoolCasesList";
import Summary from "./PreSchoolCaseSummary";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import DropdownComponent from "../DropdownComponent";
import PreSchoolCaseSummary from "./PreSchoolCaseSummary";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";
import { division } from "../../constants/Constants";

function PreSchoolCasesOutput({ totalCases, fallbackText }) {
  const navigation = useNavigation();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedPreschool, setSelectedPreschool] = useState("");
  const [filteredPreSchoolCases, setFilteredPreSchoolCases] = useState([]);

  const school = [{ label: "None", value: "1" },{ label: "St Joseph's College", value: "2" }];

  const [searchQuery, setSearchQuery] = useState("");
  const preSchoolCases = useSelector(
    (state) => state.preSchoolCases.preSchoolCases
  ); // Accessing cases state from Redux store

  const preSchoolCasesCount = useSelector(
    (state) => state.preSchoolCasesCount.preSchoolCasesCount
  );

  useEffect(() => {
    // Function to filter preSchool based on searchQuery and selectedDivision
    const filterCases = () => {
      setFilteredPreSchoolCases(
        preSchoolCases.filter(
          (item) =>
            (selectedDivision === "" ||
              item.division?.value === selectedDivision) &&
            (selectedPreschool === "" ||
              item.preSchool?.value === selectedPreschool)
        )
      );
    };

    filterCases(); // Initial filter

    // Add event listener for changes in searchQuery and selectedDivision
    const unsubscribe = () => {
      filterCases();
    };

    return unsubscribe;
  }, [preSchoolCases, selectedDivision, selectedPreschool, searchQuery]);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (filteredPreSchoolCases.length > 0) {
    content = <PreSchoolCasesList preSchoolCases={filteredPreSchoolCases} />;
  }

  function dropdownDivisionChangedHandler(inputIdentifier, enteredValue) {
    setSelectedDivision(enteredValue.value);
  }

  function dropdownSchoolChangedHandler(inputIdentifier, enteredValue) {
    setSelectedPreschool(enteredValue.value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.maintext}>Preschooler Insights</Text>
        <Button
          style={{ marginBottom: 10 }}
          size={32}
          color={GlobalStyles.colors.primary800}
          onPress={() => {
            navigation.navigate("ManagePreSchoolCasesCount");
          }}
        >
          {" "}
          Count
        </Button>
      </View>
      <PreSchoolCaseSummary countDetails={preSchoolCasesCount} />
      <View style={styles.searchbar}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <View style={styles.inputsRow}>
          <DropdownComponent
            label={"Division"}
            data={division}
            textInputConfig={{
              onChange: dropdownDivisionChangedHandler.bind(this, "division"),
              value: selectedDivision,
            }}
          />
          <DropdownComponent
            label={"School"}
            data={school}
            textInputConfig={{
              onChange: dropdownSchoolChangedHandler.bind(this, "preSchool"),
              value: selectedPreschool,
            }}
          />
          {/*<SelectCountryScreen/>*/}
        </View>
      </View>
      {content}
    </View>
  );
}

export default PreSchoolCasesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  searchbar: {
    marginTop: 15,
    marginVertical: 8,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 8,
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 8,
  },
  textwrap: {
    marginBottom: 6,
  },
});
