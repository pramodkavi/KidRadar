import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DropdownComponent from "../DropdownComponent";

function InstituteForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
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
    detailedName: {
      value: defaultValues ? defaultValues.detailedName: '',
      isValid: true,
    },
    address: {
      value: defaultValues ? defaultValues.address.toString() : '',
      isValid: true,
    },
    email: {
      value: defaultValues ? defaultValues.email: '',
      isValid: true,
    },
    contactNo: {
      value: defaultValues ? defaultValues.contactNo.toString() : '',
      isValid: true,
    },
    maxNVQ: {
      value: defaultValues ? defaultValues.maxNVQ.toString() : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
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
    const instituteData = {
      name: inputs.name.value,
      detailedName: inputs.detailedName.value,
      address: inputs.address.value,
      email: inputs.email.value,
      contactNo: +inputs.contactNo.value,
      maxNVQ: +inputs.maxNVQ.value,
      description: inputs.description.value,
    };

    const nameIsValid = instituteData.name.trim().length > 0;
    const detailedNameIsValid = instituteData.detailedName.trim().length > 0;
    const descriptionIsValid = instituteData.description.trim().length > 0;
    const addressIsValid = instituteData.address.trim().length > 0;
    const emailIsValid = instituteData.email.includes('@');
    const maxNVQIsValid = !isNaN(instituteData.maxNVQ);
    const contactNoIsValid = !isNaN(instituteData.contactNo) && (String(instituteData.contactNo).length ==9);


    if (! nameIsValid || ! detailedNameIsValid || ! descriptionIsValid || ! addressIsValid || ! emailIsValid || ! maxNVQIsValid || ! contactNoIsValid) {
      setInputs((curInputs) => {
        return {
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
          address: { value: curInputs.address.value, isValid: addressIsValid },
          email: { value: curInputs.email.value, isValid: emailIsValid },
          contactNo: { value: curInputs.contactNo.value, isValid: contactNoIsValid },
          maxNVQ: { value: curInputs.maxNVQ.value, isValid: maxNVQIsValid },
          name: { value: curInputs.name.value, isValid: nameIsValid },
          detailedName: { value: curInputs.detailedName.value, isValid: detailedNameIsValid },
        };
      });
      return;
    }

    onSubmit(instituteData);
  }

  const formIsInvalid =
    !inputs.description.isValid ||
    !inputs.address.isValid ||
    !inputs.email.isValid ||
    !inputs.contactNo.isValid ||
    !inputs.maxNVQ.isValid ||
    !inputs.name.isValid ||
    !inputs.detailedName.isValid;
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Add Institute Details</Text>
        <Input
            label="Name"
            invalid={!inputs.name.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputs.name.value,
            }}
        />
        <Input
            label="Detailed Name"
            invalid={!inputs.detailedName.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'detailedName'),
              value: inputs.detailedName.value,
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
          label="Email"
          invalid={!inputs.email.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'email'),
            value: inputs.email.value,
          }}
      />
        <Input
          label="Contact No"
            invalid={!inputs.contactNo.isValid}
            textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangedHandler.bind(this, 'contactNo'),
                value: inputs.contactNo.value,
            }}
        />
      <Input
          label="Max NVQ"
          invalid={!inputs.maxNVQ.isValid}
          textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'maxNVQ'),
              value: inputs.maxNVQ.value,
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

export default InstituteForm;

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
