import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import {
  deleteCase,
  deletePreSchool,
  storeCases,
  storePreSchool,
  storePreSchoolCases,
  updateCase
} from '../../util/http';
import { deleteCase as deleteCaseAction, addCase as addCaseAction, updateCase as updateCaseAction } from '../../slices/CaseSlice';
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import IconButton from '../../components/UI/IconButton';
import PreSchoolForm from "../../components/ManagePreSchoolDetails/PreSchoolForm";
import {addPreSchool, selectPreSchool} from "../../slices/PreSchoolSlice"; // Importing Redux actions

function ManagePreSchoolDetails({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const preSchool = useSelector(selectPreSchool); // Accessing expenses state from Redux store
  console.log("////////////////////PreSchool ",preSchool)
  const editedCaseId = route.params?.expenseId;
  const isEditing = !!editedCaseId;

  const selectedCase = preSchool.find(
      (expense) => expense.id === editedCaseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit School Details' : 'Add School Details',
    });
  }, [navigation, isEditing]);

  async function deleteCaseHandler(){
    setIsSubmitting(true);
    try {
      await deletePreSchool(editedCaseId);
      dispatch(deletePreSchool(editedCaseId)); // Dispatching deleteCase action
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(preSchoolData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateCaseAction({ id: editedCaseId, data: preSchoolData })); // Dispatching updateCase action
        await updateCase(editedCaseId, preSchoolData);
      } else {
        const id = await storePreSchool(preSchoolData);
        dispatch(addPreSchool({ ...preSchoolData, id: id }));
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
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
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            onCancel={cancelHandler}
            defaultValues={selectedCase}
        />
        {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton
                  icon="trash"
                  color="red" // Adjust color here as needed
                  size={36}
                  onPress={deleteCaseHandler}
              />
            </View>
        )}
      </View>
  );
}

export default ManagePreSchoolDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff', // Adjust background color here as needed
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#ccc', // Adjust border color here as needed
    alignItems: 'center',
  },
});
