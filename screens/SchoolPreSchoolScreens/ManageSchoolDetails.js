import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { deleteSchools, storeSchool, updateSchools } from "../../util/http";
import {
  deleteCase as deleteCaseAction,
  addCase as addCaseAction,
  updateCase as updateCaseAction,
} from "../../slices/CaseSlice";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import IconButton from "../../components/UI/IconButton";
import SchoolForm from "../../components/ManageSchoolDetails/SchoolForm";
import {
  addSchool,
  deleteSchool,
  updateSchool,
} from "../../slices/SchoolSlice"; // Importing Redux actions
import { AuthContext } from "../../store/auth-context";

function ManageSchoolDetails({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector((state) => state.schools.schools); // Accessing expenses state from Redux store

  const editedCaseId = route.params?.dataId;
  console.log("--------------------------------", editedCaseId);
  const isEditing = !!editedCaseId;

  const selectedCase = cases.find((expense) => expense.id === editedCaseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit School Details" : "Create School",
    });
  }, [navigation, isEditing]);

  async function deleteSchoolHandler() {
    setIsSubmitting(true);
    navigation.navigate("School PreSchoool Overview");
    try {
      await deleteSchools(editedCaseId);
      dispatch(deleteSchool(editedCaseId)); // Dispatching deleteCase action
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(schoolData) {
    console.log(schoolData);
    schoolData.uid = authCtx.uId;

    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateSchool({ id: editedCaseId, data: schoolData })); // Dispatching updateCase action
        await updateSchools(editedCaseId, schoolData);
      } else {
        const id = await storeSchool(schoolData);
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");    
        console.log(id);
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
    
        dispatch(addSchool({ ...schoolData, id: id })); // Dispatching addCase action
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <SchoolForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedCase}
        deleteDetailsHandler={deleteSchoolHandler}
      />
    </View>
  );
}

export default ManageSchoolDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff", // Adjust background color here as needed
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#ccc", // Adjust border color here as needed
    alignItems: "center",
  },
});
