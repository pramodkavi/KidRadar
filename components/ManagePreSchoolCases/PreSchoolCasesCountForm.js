import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import DropdownComponent from "../DropdownComponent";

function PreSchoolCasesCountForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [selected, setSelected] = React.useState("");
  const division = [
    { label: "Katana", value: "1" },
    { label: "Ja-Ela", value: "2" },
    { label: "Negombo", value: "3" },
  ];

  const caseType = [
    { label: "School Dropout", value: "1" },
    { label: "Street Child", value: "2" },
    { label: "Long Absentees", value: "3" },
  ];
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    graduatesCounts: {
      value: defaultValues ? defaultValues.graduatesCounts.toString() : "",
      isValid: true,
    },
    scholarsCounts: {
      value: defaultValues ? defaultValues.scholarsCounts.toString() : "",
      isValid: true,
    },
    division: {
      value: defaultValues ? defaultValues.division : "",
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
      description: inputs.description.value,
      graduatesCounts: +inputs.graduatesCounts.value,
      scholarsCounts: +inputs.scholarsCounts.value,
      division: inputs.division.value,
    };

    // const amountIsValid = !isNaN(caseData.name) && caseData.name > 0;
    const descriptionIsValid = caseData.description.trim().length > 0;
    const graduatesCountsIsValid =
      !isNaN(caseData.graduatesCounts) &&
      caseData.graduatesCounts > 0 &&
      caseData.graduatesCounts < 5000;
    const scholarsCountsIsValid =
      !isNaN(caseData.scholarsCounts) &&
      caseData.scholarsCounts > 0 &&
      caseData.scholarsCounts < 5000;
    const divisionIsValid = caseData.division != "";

    if (
      !descriptionIsValid ||
      !graduatesCountsIsValid ||
      !scholarsCountsIsValid
    ) {
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          graduatesCounts: {
            value: curInputs.graduatesCounts.value,
            isValid: graduatesCountsIsValid,
          },
          scholarsCounts: {
            value: curInputs.scholarsCounts.value,
            isValid: scholarsCountsIsValid,
          },
          division: {
            value: curInputs.division.value,
            isValid: divisionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(caseData);
  }

  const formIsInvalid =
    !inputs.description.isValid ||
    !inputs.graduatesCounts.isValid ||
    !inputs.scholarsCounts.isValid ||
    !inputs.division.isValid;

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Create New Preschooler Case</Text>
        {/*<View style={styles.container}>*/}
        <View style={styles.inputsRow}>
          <DropdownComponent
            invalid={!inputs.division.isValid}
            label={"Division"}
            data={division}
            textInputConfig={{
              onChange: dropdownChangedHandler.bind(this, "division"),
              value: inputs.division.value,
            }}
          />
        </View>
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
        <Input
          label="Preschool Graduates counts"
          invalid={!inputs.graduatesCounts.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "graduatesCounts"),
            value: inputs.graduatesCounts.value,
          }}
        />
        <Input
          label="Foundation scholars counts"
          invalid={!inputs.scholarsCounts.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "scholarsCounts"),
            value: inputs.scholarsCounts.value,
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

export default PreSchoolCasesCountForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary200,
    marginVertical: 1,
    textAlign: "left",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
