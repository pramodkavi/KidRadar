import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import {deleteCase, storeCases, storePreSchoolCasesCount, updateCase} from '../../util/http';
import { deleteCase as deleteCaseAction, addCase as addCaseAction, updateCase as updateCaseAction } from '../../slices/CaseSlice';
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import {IconButton} from "react-native-paper";
import PreSchoolCasesCountForm from "../../components/ManagePreSchoolCases/PreSchoolCasesCountForm";
import {addPreSchoolCasesCount, setPreSchoolCasesCount} from "../../slices/PreSchoolCasesCountSlice";

function ManagePreSchoolCasesCount({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector(state => state.cases.cases); // Accessing expenses state from Redux store

  const editedCaseId = route.params?.expenseId;
  const isEditing = !!editedCaseId;

  const selectedCase = cases.find(
      (expense) => expense.id === editedCaseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Counts',
    });
  }, [navigation, isEditing]);

  async function deleteCaseHandler() {
    setIsSubmitting(true);
    try {
      await deleteCase(editedCaseId);
      dispatch(deleteCaseAction(editedCaseId)); // Dispatching deleteCase action
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(caseData) {

    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateCaseAction({ id: editedCaseId, data: caseData })); // Dispatching updateCase action
        await updateCase(editedCaseId, caseData);
      } else {
        const id = await storePreSchoolCasesCount(caseData);
        console.log(".....................Before Checking storePreSchoolCasesCount")
        dispatch(addPreSchoolCasesCount({ ...caseData, id: id }))
        console.log(".....................After Checking storePreSchoolCasesCount")
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
        <PreSchoolCasesCountForm
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

export default ManagePreSchoolCasesCount;

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
