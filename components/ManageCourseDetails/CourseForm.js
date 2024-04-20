import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DropdownComponent from "../DropdownComponent";

function CourseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
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
    maxNVQ: {
      value: defaultValues ? defaultValues.maxNVQ.toString() : '',
      isValid: true,
    },
    type: {
      value: defaultValues ? defaultValues.type.toString() : '',
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
    const courseData = {
      name: inputs.name.value,
      type: inputs.type.value,
      maxNVQ: +inputs.maxNVQ.value,
      description: inputs.description.value,
    };

    const nameIsValid = courseData.name.trim().length > 0;
    const typeIsValid = courseData.type.trim().length > 0;
    const descriptionIsValid = courseData.description.trim().length > 0;
    const maxNVQIsValid = !isNaN(courseData.maxNVQ);

    if (! nameIsValid || ! typeIsValid || ! descriptionIsValid || ! maxNVQIsValid) {
      setInputs((curInputs) => {
        return {
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
          type: { value: curInputs.type.value, isValid: typeIsValid },
          maxNVQ: { value: curInputs.maxNVQ.value, isValid: maxNVQIsValid },
          name: { value: curInputs.name.value, isValid: nameIsValid },
        };
      });
      return;
    }
    console.log("//////////////////courseData",courseData)
    onSubmit(courseData);
  }

  const formIsInvalid =
    !inputs.description.isValid ||
    !inputs.maxNVQ.isValid ||
    !inputs.name.isValid ||
    !inputs.type.isValid;
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Add School Details</Text>
        <Input
            label="Name"
            invalid={!inputs.name.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputs.name.value,
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
            label="Type"
            invalid={!inputs.type.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'type'),
              value: inputs.type.value,
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

export default CourseForm;

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
