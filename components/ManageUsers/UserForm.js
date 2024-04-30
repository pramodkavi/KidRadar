import { useNavigation } from "@react-navigation/native";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import Input from "./Input";
import { useState } from "react";

function UserForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");

  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    designation: {
      value: defaultValues ? defaultValues.designation : "",
      isValid: true,
    },
    phoneNumber: {
      value: defaultValues ? defaultValues.phoneNumber.toString() : "",
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
    const contactNoIsValid =
      !isNaN(caseData.phoneNumber) && String(caseData.phoneNumber).length == 9;

    if (!nameIsValid || !designationIsValid || !contactNoIsValid) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          designation: {
            value: curInputs.designation.value,
            isValid: designationIsValid,
          },
          phoneNumber: {
            value: curInputs.phoneNumber.value,
            isValid: contactNoIsValid,
          },
        };
      });
      return;
    }
    console.log("/////////////////////////// case data", caseData);
    onSubmit(caseData);
  }

  const formIsInvalid =
    !inputs.name.isValid ||
    !inputs.phoneNumber.isValid ||
    !inputs.designation.isValid;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <ScrollView>
    <View>
      <Text style={styles.title}>Update User Details</Text>

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
        label="Phone Number"
        invalid={!inputs.phoneNumber.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "phoneNumber"),
          value: inputs.phoneNumber.value,
        }}
      />
      <Input
        label="Designation"
        invalid={!inputs.designation.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "designation"),
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
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.trashIcon}
        >
          <Text style={styles.updateButton}>{submitButtonLabel}</Text>
        </Pressable>
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
                    Are you sure to update user?
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
                      onPress={submitHandler}
                    >
                      <Text style={styles.deleteButton}>Update</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
    // </ScrollView>
  );
}

export default UserForm;

const styles = StyleSheet.create({
  updateButton: {
    minWidth: 80,
    minHeight: 20,
    padding: 5,
    backgroundColor: "gray",
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    marginBottom: 18,
  },
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
    justifyContent: "space-between",
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
});
