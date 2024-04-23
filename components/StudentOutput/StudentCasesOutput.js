import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import CasesList from './CasesList';
import Summary from './ChildCaseSummary';
import { Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import DropdownComponent from "../DropdownComponent";
import {ChildrenCasesChart} from "../Charts/ChildrenCasesChart";
import TrainingParticipationStatistics from "../Charts/TrainingParticipationStatistics";
import {PreschoolGraduatesCounts} from "../Charts/PreschoolGraduatesCounts";
import {FoundationScholarsCounts} from "../Charts/FoundationScholarsCounts";

function StudentCasesOutput({ totalCases, fallbackText }) {

  // const [searchQuery, setSearchQuery] = useState('');
  const cases = useSelector((state) => state.cases.cases);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  return (
      <ScrollView style={styles.container}>
        <View style={styles.textwrap}>
          <Text style={styles.maintext}>Child Cases Insights</Text>
        </View>
        <Summary cases={cases} periodName={totalCases} />
        <ChildrenCasesChart/>
        <PreschoolGraduatesCounts/>
        <FoundationScholarsCounts/>
        <TrainingParticipationStatistics/>
        {content}
      </ScrollView>
  );
}

export default StudentCasesOutput;

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
    justifyContent: 'space-between',
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
