import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/styles";
import DropdownComponent from "../DropdownComponent";
import { selectSchool } from "../../slices/SchoolSlice";
import SchoolList from "./SchoolList";
import { division } from "../../constants/Constants";

function SchoolOutput({ totalCases, fallbackText }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");

  const schools = useSelector(selectSchool); // Accessing expenses state from Redux store

  useEffect(() => {
    // Function to filter schools based on searchQuery and selectedDivision
    const filterSchools = () => {
      setFilteredSchools(
        schools.filter(
          (item) =>
            (selectedDivision === "" ||
              item.division?.value === selectedDivision) &&
            (searchQuery === "" ||
              item.school?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    };
  
    filterSchools(); // Initial filter
  
    // Add event listener for changes in searchQuery and selectedDivision
    const unsubscribe = () => {
      filterSchools();
    };
  
    return unsubscribe;
  }, [schools, selectedDivision, searchQuery]);
  

  let content = "";
  if (filteredSchools.length > 0) {
    content = <SchoolList preSchoolDetails={filteredSchools} />;
  } else {
    content = <Text style={styles.infoText}>{fallbackText}</Text>;
  }

  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    setSelectedDivision(enteredValue.value);
  }

  return (
    <View style={styles.container}>
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

export default SchoolOutput;

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
