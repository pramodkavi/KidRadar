import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { GlobalStyles } from '../../constants/styles';

function Input({ label, invalid, style, textInputConfig }) {

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer]}>
      {/*<Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>*/}
      <TextInput label={label} style={inputStyles} mode="outlined"  {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    // fontSize: 12,
    // color: GlobalStyles.colors.primary200,
    // marginBottom: 4,
  },
  input: {
    backgroundColor: "transparent",
    color: GlobalStyles.colors.primary200,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});
