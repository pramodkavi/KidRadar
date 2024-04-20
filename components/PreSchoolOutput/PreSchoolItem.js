import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function PreSchoolItem({ id, preSchool, description, division }) {
  const navigation = useNavigation();
  // const label = caseType.label;
  function casePressHandler() {
    navigation.navigate('PreSchoolView', {
      dataId: id
    });
  }

  return (
    <Pressable
      onPress={casePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.caseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {preSchool}
          </Text>
          <Text style={styles.textBase}>{description}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{division.label}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default PreSchoolItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  caseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "#5B585E",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    // fontWeight: GlobalStyles.colors.primary500,
    // color:GlobalStyles.colors.primary500,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    minWidth: 80,
  },
  amount: {
    color: "#5B585E",
    fontWeight: 'bold',
  },
});
