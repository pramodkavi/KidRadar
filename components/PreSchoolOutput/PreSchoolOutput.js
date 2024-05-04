import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { division } from "../../constants/Constants";
import { GlobalStyles } from "../../constants/styles";
import { selectPreSchool } from "../../slices/PreSchoolSlice";
import DropdownComponent from "../DropdownComponent";
import PreSchoolList from "./PreSchoolList";

function PreSchoolOutput({ totalCases, fallbackText }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [filteredPreSchools, setFilteredPreSchools] = useState([]);

  const preSchool = useSelector(selectPreSchool); // Accessing expenses state from Redux store

  useEffect(() => {
    // Function to filter preSchool based on searchQuery and selectedDivision
    const filterPreSchools = () => {
      setFilteredPreSchools(
        preSchool.filter(
          (item) =>
            (selectedDivision === "" ||
              item.division?.value === selectedDivision) &&
            (searchQuery === "" ||
              item.preSchool?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    };

    filterPreSchools(); // Initial filter

    // Add event listener for changes in searchQuery and selectedDivision
    const unsubscribe = () => {
      filterPreSchools();
    };

    return unsubscribe;
  }, [preSchool, selectedDivision, searchQuery]);

  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    setSelectedDivision(enteredValue.value);
  }

  let content = "";
  if (filteredPreSchools.length > 0) {
    content = <PreSchoolList preSchoolDetails={filteredPreSchools} />;
  } else {
    content = <Text style={styles.infoText}>{fallbackText}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.textwrap}>
          <Text style={styles.maintext}>Preschooler Insights</Text>
        </View> */}

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
              onChange: dropdownChangedHandler.bind(this, "division"),
              value: selectedDivision,
            }}
          />
        </View>
      </View>
      {content}
    </View>
  );
}

export default PreSchoolOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  searchbar: {
    marginVertical: 8,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 8,
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  textwrap: {
    marginBottom: 6,
  },
});
