import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { GlobalStyles } from '../../constants/styles';
import DropdownComponent from "../DropdownComponent";
import PreSchoolList from './PreSchoolList';
import {selectPreSchool} from "../../slices/PreSchoolSlice";

function PreSchoolOutput({ totalCases, fallbackText }) {

  const [searchQuery, setSearchQuery] = useState('');
  const preSchool = useSelector(selectPreSchool); // Accessing expenses state from Redux store
  const filteredPreSchool = preSchool? (preSchool.filter(
      (item) =>
          item.preSchool?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()))
  )):[];

  let content = "";
  if (filteredPreSchool.length > 0) {
    content = <PreSchoolList preSchoolDetails={filteredPreSchool} />;
  }else{
    console.log("hutto")
    content = <Text style={styles.infoText}>{fallbackText}</Text>;
  }
  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    // setInputs((curInputs) => {
    // });
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
                // data={division}
                // textInputConfig={{
                //   onChange: dropdownChangedHandler.bind(this, 'division'),
                //   // value: inputs.division.value,
                // }}
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
  searchbar:{
    marginVertical: 8,
  },
  infoText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
