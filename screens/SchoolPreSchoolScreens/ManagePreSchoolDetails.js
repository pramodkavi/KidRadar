import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import PreSchoolForm from "../../components/ManagePreSchoolDetails/PreSchoolForm";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import {
  addPreSchool,
  deletepreSchool,
  selectPreSchool,
  updatePreSchool,
} from "../../slices/PreSchoolSlice";
import { AuthContext } from "../../store/auth-context"; // Importing Redux actions
import {
  deletePreSchool,
  storePreSchool,
  updatePreschool,
} from "../../util/http";

function ManagePreSchoolDetails({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const preSchool = useSelector(selectPreSchool); // Accessing expenses state from Redux store
  const editedCaseId = route.params?.dataId;
  const isEditing = !!editedCaseId;

  const selectedCase = preSchool.find((expense) => expense.id === editedCaseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit PreSchool Details" : "Add PreSchool Details",
    });
  }, [navigation, isEditing]);

  async function deleteDetailsHandler() {
    setIsSubmitting(true);
    navigation.navigate("School PreSchoool Overview");
    try {
      await deletePreSchool(editedCaseId);
      dispatch(deletepreSchool(editedCaseId)); // Dispatching deleteCase action
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(preSchoolData) {
    preSchoolData.uid = authCtx.uId;
    setIsSubmitting(true);
    try {

      if (isEditing) {
        dispatch(updatePreSchool({ id: editedCaseId, data: preSchoolData })); // Dispatching updateCase action
        await updatePreschool(editedCaseId, preSchoolData);
      } else {
        const id = await storePreSchool(preSchoolData);
        dispatch(addPreSchool({ ...preSchoolData, id: id }));
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
      <PreSchoolForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedCase}
        deleteDetailsHandler={deleteDetailsHandler}
      />
    </View>
  );
}

export default ManagePreSchoolDetails;

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
