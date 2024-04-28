import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/styles";
import { selectInstitute } from "../../slices/InstituteSlice";
import DropdownComponent from "../DropdownComponent";
import InstituteList from "./InstituteList";

function InstituteDetailsOutput({ totalCases, fallbackText }) {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);

  const instituteTypes = [
    { label: "Institute", value: "1" },
    { label: "Academic Center", value: "2" },
    { label: "Carrier Guidance Opportunity", value: "3" },
  ];

  const institutes = useSelector(selectInstitute);

  useEffect(() => {
    // Function to filter preSchool based on searchQuery and selectedDivision
    const filterInstitutes = () => {
      setFilteredInstitutes(
        institutes.filter(
          (item) =>
            item.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedDivision === "" || item.type?.value === selectedDivision)
        )
      );
    };

    filterInstitutes(); // Initial filter

    // Add event listener for changes in searchQuery and selectedDivision
    const unsubscribe = () => {
      filterInstitutes();
    };

    return unsubscribe;
  }, [institutes, selectedDivision, searchQuery]);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (filteredInstitutes.length > 0) {
    content = <InstituteList institutes={filteredInstitutes} />;
  }
  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {});
  }

  function dropdownDivisionChangedHandler(inputIdentifier, enteredValue) {
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
            label={"Institute Type"}
            data={instituteTypes}
            textInputConfig={{
              onChange: dropdownDivisionChangedHandler.bind(this, "division"),
              value: selectedDivision,
            }}
          />
        </View>
      </View>
      {content}
    </View>
  );
}

export default InstituteDetailsOutput;

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
    color: "white",
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
