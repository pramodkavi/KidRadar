import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import PreSchoolCasesList from './PreSchoolCasesList';
import Summary from './PreSchoolCaseSummary';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import DropdownComponent from "../DropdownComponent";
import PreSchoolCaseSummary from "./PreSchoolCaseSummary";
import Button from '../UI/Button';
import { division } from '../../constants/Constants';
function PreSchoolCasesOutput({ totalCases, fallbackText }) {

  const [searchQuery, setSearchQuery] = useState('');
  const preSchoolCases = useSelector((state) => state.preSchoolCases.preSchoolCases); // Accessing cases state from Redux store
  const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);
  const filteredCases = preSchoolCases.filter(
      (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (filteredCases.length > 0) {
    content = <PreSchoolCasesList preSchoolCases={filteredCases} />;
  }
  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    // setInputs((curInputs) => {
    // });
  }
  return (
      <View style={styles.container}>
        <View style={styles.textwrap}>
          <Text style={styles.maintext}>Preschooler Insights</Text>
          <Button 
              size={32}
              color={GlobalStyles.colors.primary800}
              onPress={() => {
                  navigation.navigate('ManagePreSchoolCasesCount');
              }}
          >  Count
          </Button>
        </View>
        <PreSchoolCaseSummary countDetails={preSchoolCasesCount}/>
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
                // textInputConfig={{
                //   onChange: dropdownChangedHandler.bind(this, 'division'),
                //   // value: inputs.division.value,
                // }}
            />
            <DropdownComponent
                label={"Pre-School"}
                // data={school}
                textInputConfig={{
                  // onChange: dropdownChangedHandler.bind(this, 'school'),
                  // value: inputs.school.value,
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
  searchbar:{
    marginVertical: 8,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  textwrap: {
    marginBottom: 6,
  }
});
