import React, { useState } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DropdownComponent from "../DropdownComponent";

function ChildCasesForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [selected, setSelected] = React.useState("");
  const division = [
    { label: 'Katana', value: '1' },
    { label: 'Ja-Ela',value: '2'},
    { label: 'Negombo',value: '3'},
  ];

  const school = [
    { label: 'St Joseph\'s College',value: '1'},
  ];

  const caseType = [
    { label: 'School Dropout',value: '1'},
    { label: 'Street Child',value: '2'},
    { label: 'long absentees',value: '3'},

  ];
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name: '',
      isValid: true,
    },
    age: {
      value: defaultValues ? defaultValues.age.toString() : '',
      isValid: true,
    },
    address: {
      value: defaultValues ? defaultValues.address.toString() : '',
      isValid: true,
    },
    contactNo: {
      value: defaultValues ? defaultValues.contactNo.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    reason: {
      value: defaultValues ? defaultValues.reason : '',
      isValid: true,
    },
    division: {
      value: defaultValues ? defaultValues.division : '',
      isValid: true,
    },
    school: {
      value: defaultValues ? defaultValues.school : '',
      isValid: true,
    },
    caseType: {
      value: defaultValues ? defaultValues.caseType : '',
      isValid: true,
    },

  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const caseData = {
      name: inputs.name.value,
      age: +inputs.age.value,
      address: inputs.address.value,
      contactNo: +inputs.contactNo.value,
      date: new Date(inputs.date.value),
      reason: inputs.reason.value,
      caseType: inputs.caseType.value,
      division: inputs.division.value,
      school: inputs.school.value,
    };

    const currentDate = new Date();
    const nameIsValid = caseData.name.trim().length > 0;
    const ageIsValid = !isNaN(caseData.age) && (caseData.age > 0 && caseData.age < 19);
    const addressIsValid = caseData.name.trim().length > 0;
    const contactNoIsValid = !isNaN(caseData.contactNo) && (caseData.contactNo ===10);
    const dateIsValid = caseData.date.toString() !== 'Invalid Date'&& caseData.date <= currentDate;
    const reasonIsValid = caseData.reason.trim().length > 0;
    const divisionIsValid = caseData.division!="";
    const schoolIsValid = caseData.school!="";
    const caseTypeIsValid = caseData.caseType!="";

    if (!nameIsValid || !ageIsValid || !addressIsValid || !dateIsValid || !reasonIsValid || contactNoIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          age: { value: curInputs.age.value, isValid: ageIsValid },
          address: { value: curInputs.address.value, isValid: addressIsValid },
          contactNo: { value: curInputs.contactNo.value, isValid: contactNoIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          reason: {
            value: curInputs.reason.value,
            isValid: reasonIsValid,
          },
          division: { value: curInputs.division.value , isValid: divisionIsValid},
          school: { value: curInputs.school.value , isValid: schoolIsValid},
          caseType: { value: curInputs.caseType.value , isValid: caseTypeIsValid},
        };
      });
      return;
    }

    onSubmit(caseData);
  }

  const formIsInvalid =
    !inputs.name.isValid ||
    !inputs.age.isValid ||
    !inputs.address.isValid ||
    !inputs.contactNo.isValid ||
    !inputs.date.isValid ||
    !inputs.reason.isValid||
    !inputs.division.isValid||
    !inputs.school.isValid||
    !inputs.caseType.isValid;

  return (
      <ScrollView>
        <View>
      <Text style={styles.title}>Create New Case</Text>
      {/*<View style={styles.container}>*/}
        <View style={styles.inputsRow}>
          <DropdownComponent
              invalid={!inputs.division.isValid}
              label={"Division"}
              data={division}
              textInputConfig={{
                onChange: dropdownChangedHandler.bind(this, 'division'),
                value: inputs.division.value,
              }}
          />
          <DropdownComponent
              invalid={!inputs.school.isValid}
              label={"School"}
              data={school}
              textInputConfig={{
                onChange: dropdownChangedHandler.bind(this, 'school'),
                value: inputs.school.value,
              }}
          />
          <DropdownComponent
              invalid={!inputs.caseType.isValid}
              label={"Case Type"}
              data={caseType}
              textInputConfig={{
                onChange: dropdownChangedHandler.bind(this, 'caseType'),
                value: inputs.caseType.value,
              }}
          />
          {/*<SelectCountryScreen/>*/}
        </View>
      {/*</View>*/}
        <Input
          label="Name"
          invalid={!inputs.name.isValid}
          textInputConfig={{
            // keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'name'),
            value: inputs.name.value,
          }}
        />
        <Input
            label="Age"
            invalid={!inputs.age.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'age'),
              value: inputs.age.value,
            }}
        />
        <Input
            label="Address"
            invalid={!inputs.address.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'address'),
              value: inputs.address.value,
            }}
        />
      <Input
          label="Guardian Contact No"
          invalid={!inputs.contactNo.isValid}
          textInputConfig={{
            // keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'contactNo'),
            value: inputs.contactNo.value,
          }}
      />
        <Input
          // style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      {/*</View>*/}
      <Input
        label="Reason"
        invalid={!inputs.reason.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, 'reason'),
          value: inputs.reason.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
      </ScrollView>
  );
}

export default ChildCasesForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary200,
    marginVertical: 1,
    textAlign: 'left',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop:8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
