import { View, Text, StyleSheet } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import {useSelector} from "react-redux";

function SchoolSummary({ count }) {
  // const description = count[0].description;
  const graduatesCounts = 18;
  const scholarsCounts = 148;
  // const countCasesByDivision = ( division) => {
  //   const cases = useSelector((state) => state.cases.cases);
  //   return cases.reduce((count, currentCase) => {
  //     if (currentCase.division && currentCase.division.label === division) {
  //       count++;
  //     }
  //     return count;
  //   }, 0);
  // };

  function SummaryByDivision(division) {
    return(
        <View style={styles.container}>
          <Text style={styles.city}>{division}</Text>
          <View style={styles.subContainer}>
            <Text style={styles.sum}>{scholarsCounts}</Text>
            <Text style={styles.horizontleLine}>|</Text>
            <Text style={styles.sumWarn}>{graduatesCounts}</Text>
          </View>
        </View>
    )
  }

  // const casesSum = cases.reduce((sum, expense) => {
  //   return sum + expense.amount;
  // }, 0);

  return (
    <View style={styles.section}>
      {SummaryByDivision("Katana")}
      {SummaryByDivision("Ja-Ela")}
      {SummaryByDivision("Negambo")}

    </View>
  );
}

export default SchoolSummary;

const styles = StyleSheet.create({
  section:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width:"30%",
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  city: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.gray700,
  },
  sumWarn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.error500,
  },
  horizontleLine: {
    marginHorizontal: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.gray700,
  }
});
