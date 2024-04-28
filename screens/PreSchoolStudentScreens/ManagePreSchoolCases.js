import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import {
  deleteCase,
  deletePreSchoolCases,
  storeCases,
  storePreSchoolCases,
  updateCase,
  updatePreSchoolCases,
} from "../../util/http";
import {
  addPreSchoolCase,
  updatePreSchoolCase,
  deletePreSchoolCase,
} from "../../slices/PreSchoolCasesSlice";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import IconButton from "../../components/UI/IconButton";
import PreSchoolCasesForm from "../../components/ManagePreSchoolCases/PreSchoolCasesForm";
import { AuthContext } from "../../store/auth-context"; // Importing Redux actions

function ManagePreSchoolCases({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector((state) => state.preSchoolCases.preSchoolCases); // Accessing expenses state from Redux store

  const editedCaseId = route.params?.dataId;
  const isEditing = !!editedCaseId;

  const selectedCase = cases.find((expense) => expense.id === editedCaseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Preschool Case" : "Create Preschool Case",
    });
  }, [navigation, isEditing]);

  async function deleteCaseHandler() {
    navigation.navigate("Preschool Cases");
    setIsSubmitting(true);
    try {
      await deletePreSchoolCases(editedCaseId);
      dispatch(deletePreSchoolCase(editedCaseId)); // Dispatching deleteCase action
    } catch (error) {
      setError("Could not delete pre-school cases - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(caseData) {
    caseData.uid = authCtx.uId;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updatePreSchoolCases(editedCaseId, caseData);
        dispatch(updatePreSchoolCase({ id: editedCaseId, data: caseData })); // Dispatching updateCase action
      } else {
        const id = await storePreSchoolCases(caseData);
        dispatch(addPreSchoolCase({ ...caseData, id: id })); // Dispatching addCase action
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
      <PreSchoolCasesForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedCase}
        deleteDetailsHandler={deleteCaseHandler}
      />
      
    </View>
  );
}

export default ManagePreSchoolCases;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff", // Adjust background color here as needed
  },
 
});
