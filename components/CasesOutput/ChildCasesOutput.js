import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import CasesList from "./CasesList";
import Summary from "./ChildCaseSummary";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DropdownComponent from "../DropdownComponent";
import { division } from "../../constants/Constants";
import { selectSchool } from "../../slices/SchoolSlice";

function ChildCasesOutput({ totalCases, fallbackText }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [filteredCases, setFilteredCases] = useState([]);
  const schools = useSelector(selectSchool);
  useEffect(() => {
    async function getSchool() {
      try {
        const uId = authCtx.uId;
        const fetchPreSchoolDetails = await fetchSchools(uId);
        dispatch(setSchools(fetchPreSchoolDetails));
      } catch (error) {
        console.error("Could not fetch school details:", error);
      }
    }

    getSchool();
  }, [dispatch]); // Added dispatch as a dependency

  const schoolData = schools.map((school, index) => ({
    label: school.school,
    value: (index + 1).toString(),
  }));

  const SchoolData = [{ label: "All", value: "" }, ...schoolData];
  const caseType = [
    { label: "All", value: "" },
    { label: "School Dropout", value: "1" },
    { label: "Street Child", value: "2" },
    { label: "Long Absentees", value: "3" },
  ];

  const cases = useSelector((state) => state.cases.cases);

  useEffect(() => {
    // Function to filter preSchool based on searchQuery and selectedDivision
    const filterCases = () => {
      setFilteredCases(
        cases.filter((item) => {
          return (
            (selectedDivision === "" ||
              item.division?.value === selectedDivision) &&
            (selectedSchool === "" || item.school?.value === selectedSchool) &&
            (selectedCaseType === "" ||
              item.caseType?.value === selectedCaseType) &&
            (searchQuery === "" ||
              item.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()))
          );
        })
      );
    };

    filterCases(); // Initial filter

    // Add event listener for changes in searchQuery and selectedDivision
    const unsubscribe = () => {
      filterCases();
    };

    return unsubscribe;
  }, [cases, selectedDivision, selectedSchool, selectedCaseType, searchQuery]);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (filteredCases.length > 0) {
    content = <CasesList cases={filteredCases} />;
  }

  function dropdownDivisionChangedHandler(inputIdentifier, enteredValue) {
    setSelectedDivision(enteredValue.value);
  }

  function dropdownSchoolChangedHandler(inputIdentifier, enteredValue) {
    setSelectedSchool(enteredValue.value);
  }

  function dropdownCaseTypeChangedHandler(inputIdentifier, enteredValue) {
    setSelectedCaseType(enteredValue.value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.maintext}>Child Cases Insights</Text>
      </View>
      <Summary cases={cases} periodName={totalCases} />
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
            data={SchoolData}
            textInputConfig={{
              onChange: dropdownSchoolChangedHandler.bind(this, "division"),
              value: selectedSchool,
            }}
          />
          <DropdownComponent
            label={"Case Type"}
            data={caseType}
            textInputConfig={{
              onChange: dropdownCaseTypeChangedHandler.bind(this, "caseType"),
              value: selectedCaseType,
            }}
          />
          {/*<SelectCountryScreen/>*/}
        </View>
      </View>
      {content}
    </View>
  );
}

export default ChildCasesOutput;

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
    justifyContent: "space-between",
    marginVertical: 8,
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 20,
  },
  textwrap: {
    marginBottom: 6,
  },
});
