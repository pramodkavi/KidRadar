import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import DropdownComponent from "../DropdownComponent";
import Button from "../UI/Button";
import Input from "./Input";

function SchoolForm({ submitButtonLabel, onCancel, onSubmit, defaultValues, deleteDetailsHandler }) {
  const [selected, setSelected] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const division = [
    { label: "Katana", value: "1" },
    { label: "Ja-Ela", value: "2" },
    { label: "Negombo", value: "3" },
  ];

  const school = [{ label: "None", value: "1" },{ label: "St Joseph's College", value: "2" }];

  const caseType = [
    { label: "School Dropout", value: "1" },
    { label: "Street Child", value: "2" },
    { label: "long absentees", value: "3" },
  ];
  const [inputs, setInputs] = useState({
    school: {
      value: defaultValues ? defaultValues.school : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
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
    const schoolData = {
      school: inputs.school.value,
      description: inputs.description.value,
      address: inputs.address.value,
      contactNo: +inputs.contactNo.value,
      date: new Date(inputs.date.value),
      division: inputs.division.value,
    };
    const currentDate = new Date();
    const schoolIsValid = schoolData.school.trim().length > 0;
    const descriptionIsValid = schoolData.description.trim().length > 0;
    const addressIsValid = schoolData.address.trim().length > 0;

    const contactNoIsValid =
      !isNaN(schoolData.contactNo) && String(schoolData.contactNo).length == 9;
    const dateIsValid =
      schoolData.date.toString() !== "Invalid Date" &&
      schoolData.date <= currentDate;
    const divisionIsValid = schoolData.division != "";

    if (
      !schoolIsValid ||
      !descriptionIsValid ||
      !addressIsValid ||
      !dateIsValid ||
      !contactNoIsValid ||
      !divisionIsValid
    ) {
      setInputs((curInputs) => {
        return {
          school: { value: curInputs.school.value, isValid: schoolIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
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
        };
      });
      return;
    }

    onSubmit(schoolData);
  }

  const formIsInvalid =
    !inputs.school.isValid ||
    !inputs.description.isValid ||
    !inputs.address.isValid ||
    !inputs.contactNo.isValid ||
    !inputs.date.isValid ||
    !inputs.division.isValid;

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{`${
          submitButtonLabel === "Update"
            ? "Update school details"
            : "Add School Details"
        }`}</Text>
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
          {/*<SelectCountryScreen/>*/}
        </View>
        {/*</View>*/}
        <Input
          label="School"
          invalid={!inputs.school.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "school"),
            value: inputs.school.value,
          }}
        />
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description.value,
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
          label="Contact No"
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
          
          {defaultValues && (
          <Button style={styles.button}  onPress={() => setUpdateModalVisible(true)}>
            {submitButtonLabel}
          </Button>
          )}
          {!defaultValues && (
          <Button style={styles.button}  onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
          )}

        </View>
      </View>
      {defaultValues && (
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
                    Are you sure to delete school?
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

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={updateModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setUpdateModalVisible(!updateModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you sure to update school?
                  </Text>
                  <View style={styles.modalButtons}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setUpdateModalVisible(!updateModalVisible)}
                    >
                      <Text style={styles.cancelButton}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={submitHandler}
                    >
                      <Text style={styles.deleteButton}>Yes</Text>
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
    </ScrollView>
  );
}

export default SchoolForm;

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
    justifyContent: "flex-start",
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
    borderRadius: 10,
    paddingLeft: 15,
    paddingBottom: 30,
    paddingTop: 30,
    paddingRight: 15,
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
