import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import DropdownComponent from "../DropdownComponent";
import Button from "../UI/Button";
import Input from "./Input";

function PreSchoolCasesForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
  deleteDetailsHandler,
}) {
  const [selected, setSelected] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const division = [
    { label: "Katana", value: "1" },
    { label: "Ja-Ela", value: "2" },
    { label: "Negombo", value: "3" },
  ];

  const school = [{ label: "St Joseph's College", value: "1" }];

  const caseType = [
    { label: "School Dropout", value: "1" },
    { label: "Street Child", value: "2" },
    { label: "long absentees", value: "3" },
  ];
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    age: {
      value: defaultValues ? defaultValues.age.toString() : "",
      isValid: true,
    },
    address: {
      value: defaultValues ? defaultValues.address.toString() : "",
      isValid: true,
    },
    contactNo: {
      value: defaultValues ? defaultValues.contactNo.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    division: {
      value: defaultValues ? defaultValues.division : "",
      isValid: true,
    },
    preSchool: {
      value: defaultValues ? defaultValues.preSchool : "",
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
      division: inputs.division.value,
      preSchool: inputs.preSchool.value,
    };

    // const amountIsValid = !isNaN(caseData.name) && caseData.name > 0;
    const nameIsValid = caseData.name.trim().length > 0;
    const ageIsValid =
      !isNaN(caseData.age) && caseData.age > 0 && caseData.age < 19;
    const addressIsValid = caseData.name.trim().length > 0;
    const contactNoIsValid =
      !isNaN(caseData.contactNo) && String(caseData.contactNo).length == 9;
    const dateIsValid = caseData.date.toString() !== "Invalid Date";
    const divisionIsValid = caseData.division != "";
    const preSchoolIsValid = caseData.preSchool != "";

    if (
      !nameIsValid ||
      !ageIsValid ||
      !addressIsValid ||
      !dateIsValid ||
      !contactNoIsValid ||
      !divisionIsValid ||
      !preSchoolIsValid
    ) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          age: { value: curInputs.age.value, isValid: ageIsValid },
          address: { value: curInputs.address.value, isValid: addressIsValid },
          contactNo: {
            value: curInputs.contactNo.value,
            isValid: contactNoIsValid,
          },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          division: {
            value: curInputs.division.value,
            isValid: divisionIsValid,
          },
          preSchool: {
            value: curInputs.preSchool.value,
            isValid: preSchoolIsValid,
          },
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
    // !inputs.contactNo.isValid ||
    !inputs.date.isValid ||
    !inputs.division.isValid ||
    !inputs.preSchool.isValid;

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{`${
          submitButtonLabel === "Update"
            ? "Edit Preschool Case"
            : "Create Preschool Case"
        }`}</Text>
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
          <DropdownComponent
            invalid={!inputs.preSchool.isValid}
            label={"Pre-School"}
            data={school}
            textInputConfig={{
              onChange: dropdownChangedHandler.bind(this, "preSchool"),
              value: inputs.preSchool.value,
            }}
          />
        </View>

        <Input
          label="Name"
          invalid={!inputs.name.isValid}
          textInputConfig={{
            // keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, "name"),
            value: inputs.name.value,
          }}
        />
        <Input
          label="Age"
          invalid={!inputs.age.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "age"),
            value: inputs.age.value,
          }}
        />
        <Input
          label="Address"
          invalid={!inputs.address.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "address"),
            value: inputs.address.value,
          }}
        />
        <Input
          label="Guardian Contact No"
          invalid={!inputs.contactNo.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "contactNo"),
            value: inputs.contactNo.value,
          }}
        />
        <Input
          // style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
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
        {submitButtonLabel === "Update" && (
          <View>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Are you sure to delete preschool case?
                    </Text>
                    <View style={styles.modalButtons}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.cancelButton}>Cancel</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={deleteDetailsHandler}
                      >
                        <Text style={styles.deleteButton}>Delete</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.deleteContainer}>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.trashIcon}
              >
                <TrashIcon size={30} color={"red"} />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default PreSchoolCasesForm;

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
    minWidth: 80,
    marginHorizontal: 8,
  },
  justofyButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  trashIcon: { marginTop: 20 },
  cancelButton: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  deleteButton: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: "#f00",
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#ddd",
    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
  },
  modalButtons: { display: "flex", flexDirection: "row", gap: 5 },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#ccc", // Adjust border color here as needed
    alignItems: "center",
  },
});
