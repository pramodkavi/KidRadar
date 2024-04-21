import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import InstituteList from './InstituteList';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import DropdownComponent from "../DropdownComponent";
import { selectCourse } from '../../slices/CourseSlice';

function CourseDetailsOutput({ totalCases, fallbackText }) {

  const [searchQuery, setSearchQuery] = useState('');
  const courses = useSelector(selectCourse);
  const filteredCourses = courses.filter(
      (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );
console.log("////////////////////////Checking courses",filteredCourses)
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (filteredCourses.length > 0) {
    console.log("////////////////////////filteredCourses",filteredCourses)
    content = <InstituteList institutes={filteredCourses} />;
  }
  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
    });
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
                // data={division}
                // textInputConfig={{
                //   onChange: dropdownChangedHandler.bind(this, 'division'),
                //   // value: inputs.division.value,
                // }}
            />
            {/*<SelectCountryScreen/>*/}
          </View>
        </View>
        {content}
      </View>
  );
}

export default CourseDetailsOutput;

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