import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import InstituteForm from "../../components/ManageInstituteDetails/InstituteForm";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import {
  addInstitute,
  deleteInstitute as deleteIstituteFromStore,
  selectInstitute,
  updateInstitute,
} from "../../slices/InstituteSlice"; // Importing Redux actions
import { AuthContext } from "../../store/auth-context";
import {
  deleteInstitute,
  storeInstitute,
  updateInstitut,
} from "../../util/http";

function ManageInstitute({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const institutes = useSelector(selectInstitute); // Accessing expenses state from Redux store

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const editedInstituteId = route.params?.instituteId;
  const isEditing = !!editedInstituteId;

  const selectedInstitute = editedInstituteId 
  ? institutes.find(institute => institute.id === editedInstituteId) 
  : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Pathway Hub Details" : "Add Pathway Hub Details",
    });
  }, [navigation, isEditing]);

  async function deleteDetailsHandler() {
    try {
      await deleteInstitute(editedInstituteId);
      // dispatch(deleteIstituteFromStore(editedInstituteId));
      navigation.navigate("Pathway Hub");
    } catch (error) {
      console.error("Could not delete Pathway Hub:", error);
      setError("Could not delete Pathway Hub - please try again later!");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(instituteData) {
    instituteData.uid = authCtx.uId;
    setIsSubmitting(true);

    try {
      if (isEditing) {
        dispatch(
          updateInstitute({ id: editedInstituteId, data: instituteData })
        ); // Dispatching updateCase action
        await updateInstitut(editedInstituteId, instituteData);
      } else {
        const id = await storeInstitute(instituteData);
        dispatch(addInstitute({ ...instituteData, id: id }));
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
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
      <InstituteForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedInstitute}
        deleteDetailsHandler={deleteDetailsHandler}
      />
    </View>
  );
}

export default ManageInstitute;

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
