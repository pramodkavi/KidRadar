import { View, Text, StyleSheet } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import {useSelector} from "react-redux";

function ChildCaseSummary({ cases, periodName }) {
  const countCasesByDivision = ( division) => {
    const cases = useSelector((state) => state.cases.cases);
    return cases.reduce((count, currentCase) => {
      if (currentCase.division && currentCase.division.label === division) {
        count++;
      }
      return count;
    }, 0);
  };

  const casesSum = cases.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        <Text style={styles.city}>Katana</Text>
        <Text style={styles.sum}>{countCasesByDivision("Katana")}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.city}>Ja-Ela</Text>
        <Text style={styles.sum}>{countCasesByDivision("Ja-Ela")}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.city}>Negambo</Text>
        <Text style={styles.sum}>{countCasesByDivision("Negambo")}</Text>
      </View>
    </View>
  );
}

export default ChildCaseSummary;

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
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
