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
import Button from "../UI/Button";
import Input from "./Input";

function CourseForm({
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

  const school = [{ label: "None", value: "1" },{ label: "St Joseph's College", value: "2" }];

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
    maxNVQ: {
      value: defaultValues ? defaultValues.maxNVQ.toString() : '',
      isValid: true,
    },
    type: {
      value: defaultValues ? defaultValues.type.toString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
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

    if (!nameIsValid || !typeIsValid || !descriptionIsValid || ! maxNVQIsValid) {
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          type: { value: curInputs.type.value, isValid: typeIsValid },
          maxNVQ: { value: curInputs.maxNVQ.value, isValid: maxNVQIsValid },
          name: { value: curInputs.name.value, isValid: nameIsValid },
        };
      });
      return;
    }
    console.log("/////////////////////////////////////////////////////// CourseData",courseData);
    onSubmit(courseData);
  }

  const formIsInvalid =
    !inputs.maxNVQ.isValid ||!inputs.description.isValid || !inputs.name.isValid || !inputs.type.isValid;
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{`${
          submitButtonLabel === "Update"
            ? "Edit Course Details"
            : "Add Course Details"
        }`}</Text>
        <Input
          label="Name"
          invalid={!inputs.name.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "name"),
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
            onChangeText: inputChangedHandler.bind(this, "type"),
            value: inputs.type.value,
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
                      Are you sure to delete course?
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

export default CourseForm;

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
