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
import { LockClosedIcon } from "react-native-heroicons/solid";
import { GlobalStyles } from "../../constants/styles";
import DropdownComponent from "../DropdownComponent";
import Button from "../UI/Button";
import Input from "./Input";

function InstituteForm({
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

  const instituteTypes = [
    { label: "Institute", value: "1" },
    { label: "Academic Center", value: "2" },
    { label: "Carrier Guidance Opportunity", value: "3" },
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
    detailedName: {
      value: defaultValues ? defaultValues.detailedName : "",
      isValid: true,
    },
    address: {
      value: defaultValues ? defaultValues.address.toString() : "",
      isValid: true,
    },
    email: {
      value: defaultValues ? defaultValues.email : "",
      isValid: true,
    },
    contactNo: {
      value: defaultValues ? defaultValues.contactNo.toString() : "",
      isValid: true,
    },
    maxNVQ: {
      value: defaultValues ? defaultValues.maxNVQ.toString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
    type: {
      value: defaultValues ? defaultValues.type : "",
      isValid: true,
    },
    subType: {
      value: defaultValues ? defaultValues.subType : "",
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
      type: inputs.type.value,
      subType: inputs.subType.value,
    };

    const nameIsValid = instituteData.name.trim().length > 0;
    const detailedNameIsValid = instituteData.detailedName.trim().length > 0;
    const descriptionIsValid = instituteData.description.trim().length > 0;
    const addressIsValid = instituteData.address.trim().length > 0;
    const emailIsValid = instituteData.email.includes("@");
    const maxNVQIsValid = !isNaN(instituteData.maxNVQ);
    const contactNoIsValid =
      !isNaN(instituteData.contactNo) &&
      String(instituteData.contactNo).length == 9;
    const typeIsValid = instituteData.type != "";

    if (
      !nameIsValid ||
      !detailedNameIsValid ||
      !descriptionIsValid ||
      !addressIsValid ||
      !emailIsValid ||
      !maxNVQIsValid ||
      !contactNoIsValid ||
      !typeIsValid
    ) {
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          address: { value: curInputs.address.value, isValid: addressIsValid },
          email: { value: curInputs.email.value, isValid: emailIsValid },
          contactNo: {
            value: curInputs.contactNo.value,
            isValid: contactNoIsValid,
          },
          maxNVQ: { value: curInputs.maxNVQ.value, isValid: maxNVQIsValid },
          name: { value: curInputs.name.value, isValid: nameIsValid },
          detailedName: {
            value: curInputs.detailedName.value,
            isValid: detailedNameIsValid,
          },
          type: { value: curInputs.type.value, isValid: typeIsValid },
          subType: { value: curInputs.subType.value, isValid: true },
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
    !inputs.detailedName.isValid ||
    !inputs.type.isValid;

  function dropdownChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{`${
          submitButtonLabel === "Update"
            ? "Edit Pathway Hub Details"
            : "Add New Pathway Hub"
        }`}</Text>
        <View style={styles.inputsRow}>
          <DropdownComponent
            invalid={!inputs.type.isValid}
            label={"Pathway Hub Type"}
            data={instituteTypes}
            textInputConfig={{
              onChange: dropdownChangedHandler.bind(this, "type"),
              value: inputs.type.value,
            }}
          />
          {/*<SelectCountryScreen/>*/}
        </View>
        <Input
          label="Pathway Hub Name"
          invalid={!inputs.name.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "name"),
            value: inputs.name.value,
          }}
        />
        <Input
          label="Detailed Name"
          invalid={!inputs.detailedName.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "detailedName"),
            value: inputs.detailedName.value,
          }}
        />
        <Input
          label="Pathway Hub Sub Type"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "subType"),
            value: inputs.subType.value,
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
          label="Email"
          invalid={!inputs.email.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "email"),
            value: inputs.email.value,
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
          label="Max NVQ"
          invalid={!inputs.maxNVQ.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "maxNVQ"),
            value: inputs.maxNVQ.value,
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
                      Are you sure to inactive institute?
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
                        <Text style={styles.deleteButton}>Inactive</Text>
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
                <LockClosedIcon size={30} color={"orange"} />
              </Pressable>
            </View>
          </View>
        )}
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
  trashIcon: { marginTop: 20, marginBottom: 10 },
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
    backgroundColor: "orange",
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
