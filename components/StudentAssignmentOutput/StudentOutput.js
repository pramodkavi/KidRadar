import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { GlobalStyles } from '../../constants/styles';
import {selectCase} from "../../slices/CaseSlice";
import { selectInstitute } from '../../slices/InstituteSlice';
import {selectGeneralId} from "../../slices/GeneralIdSlice";
import StudentList from "./StudentList";

function StudentOutput({ totalCases, fallbackText }) {

  const [searchQuery, setSearchQuery] = useState('');
  const generalId = useSelector(selectGeneralId)
  const institute = useSelector(selectInstitute); // Accessing expenses state from Redux store
  const filterinstitute = institute? (institute.filter(
    (item) =>
        item.id ===generalId
  )):[];

  const cases = useSelector(selectCase); // Students
  console.log("//////////////////////////// cases",cases)

  const filtercases = cases.filter(caseObj => caseObj.institute && caseObj.institute.label === filterinstitute[0].name);
  console.log("//////////////////////////// filtercases",filtercases)

  let content = "";
  if (filtercases.length > 0) {
    content = <StudentList studentDetails={filtercases} />;
  }else{
    content = <Text style={styles.infoText}>{fallbackText}</Text>;
  }

  return (
      <View style={styles.container}>

        <View style={styles.searchbar}>
          <Searchbar
              placeholder="Search"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
          />
        </View>
        {content}
      </View>
  );
}

export default StudentOutput;

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
