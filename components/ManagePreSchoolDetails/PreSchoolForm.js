import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DropdownComponent from "../DropdownComponent";

function PreSchoolForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
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
    preSchool: {
      value: defaultValues ? defaultValues.preSchool: '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
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
    division: {
      value: defaultValues ? defaultValues.division : '',
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
    const preSchoolData = {
      preSchool: inputs.preSchool.value,
      description: inputs.description.value,
      address: inputs.address.value,
      contactNo: +inputs.contactNo.value,
      date: new Date(inputs.date.value),
      division: inputs.division.value,
    };
    const currentDate = new Date();
    const preSchoolIsValid = preSchoolData.preSchool.trim().length > 0;
    const descriptionIsValid = preSchoolData.description.trim().length > 0;
    const addressIsValid = preSchoolData.address.trim().length > 0;
    const contactNoIsValid = !isNaN(preSchoolData.contactNo) && (String(preSchoolData.contactNo).length ==9);
    const dateIsValid = preSchoolData.date.toString() !== 'Invalid Date'&& preSchoolData.date <= currentDate;
    const divisionIsValid = preSchoolData.division!="";


    if (!preSchoolIsValid || !descriptionIsValid || !addressIsValid || !dateIsValid  || !contactNoIsValid ||!divisionIsValid) {
      console.log("//////////////////////preSchoolIsValid",preSchoolIsValid)
      console.log("//////////////////////descriptionIsValid",descriptionIsValid)
      console.log("//////////////////////addressIsValid",addressIsValid)
      console.log("//////////////////////contactNoIsValid",contactNoIsValid)
      console.log("//////////////////////dateIsValid",dateIsValid)
      console.log("//////////////////////divisionIsValid",divisionIsValid)
      setInputs((curInputs) => {
        return {
          preSchool: { value: curInputs.preSchool.value, isValid: preSchoolIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
          address: { value: curInputs.address.value, isValid: addressIsValid },
          contactNo: { value: curInputs.contactNo.value, isValid: contactNoIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          division: { value: curInputs.division.value , isValid: divisionIsValid},
        };
      });
      return;
    }
    onSubmit(preSchoolData);
  }

  const formIsInvalid =
    !inputs.preSchool.isValid ||
    !inputs.description.isValid ||
    !inputs.address.isValid ||
    !inputs.contactNo.isValid ||
    !inputs.date.isValid||
    !inputs.division.isValid;

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Create New PreSchool</Text>
        <View style={styles.container}>
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
            {/*<SelectCountryScreen/>*/}
          </View>
        </View>
          <Input
            label="PreSchool"
            invalid={!inputs.preSchool.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'preSchool'),
              value: inputs.preSchool.value,
            }}
          />
          <Input
              label="Description"
              invalid={!inputs.description.isValid}
              textInputConfig={{
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
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
            label="Contact No"
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

export default PreSchoolForm;

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
    justifyContent:'flex-start',
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
