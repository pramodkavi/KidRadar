import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DropdownComponent from "../DropdownComponent";
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';


function UserForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");

  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name: '',
      isValid: true,
    },
    designation: {
      value: defaultValues ? defaultValues.designation: '',
      isValid: true,
    },
    phoneNumber: {
      value: defaultValues ? defaultValues.phoneNumber.toString() : '',
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
  function submitHandler() {

    const caseData = {
      name: inputs.name.value,
      designation: inputs.designation.value,
      phoneNumber: +inputs.phoneNumber.value,
    };

    const nameIsValid = caseData.name.trim().length > 0;
    const designationIsValid = caseData.designation.trim().length > 0;
    const contactNoIsValid = !isNaN(caseData.phoneNumber) && (String(caseData.phoneNumber).length ==9);

    if (!nameIsValid || !designationIsValid || !contactNoIsValid) {

      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          designation: { value: curInputs.designation.value, isValid: designationIsValid },
          phoneNumber: { value: curInputs.phoneNumber.value, isValid: contactNoIsValid },
 
          
        };
      });
      return;
    }
    console.log("/////////////////////////// case data",caseData);
    onSubmit(caseData);
  }


  const formIsInvalid =
    !inputs.name.isValid ||
    !inputs.phoneNumber.isValid ||
    !inputs.designation.isValid ;

  return (
      // <ScrollView>
        <View>
      <Text style={styles.title}>Update User Details</Text>
      
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
            label="Phone Number"
            invalid={!inputs.phoneNumber.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'phoneNumber'),
              value: inputs.phoneNumber.value,
            }}
        />
        <Input
            label="Designation"
            invalid={!inputs.designation.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'designation'),
              value: inputs.designation.value,
            }}
        />
      
          {/*<SelectCountryScreen/>*/}
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
      // </ScrollView>
  );
}

export default UserForm;

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
