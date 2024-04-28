import {useContext, useLayoutEffect, useState} from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import ChildCasesForm from '../components/ManageCases/ChildCasesForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { deleteCase, storeCases, updateCase } from '../util/http';
import { deleteCase as deleteCaseAction, addCase as addCaseAction, updateCase as updateCaseAction } from '../slices/CaseSlice';
import {AuthContext} from "../store/auth-context"; // Importing Redux actions

function ManageChildCases({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector(state => state.cases.cases); // Accessing expenses state from Redux store

  const editedCaseId = route.params?.expenseId;
  const isEditing = !!editedCaseId;

  const selectedCase = cases.find(
      (expense) => expense.id === editedCaseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Child Case' : 'Create Child Case',
    });
  }, [navigation, isEditing]);

  async function deleteCaseHandler() {
    setIsSubmitting(true);
    try {
      navigation.navigate('Child Cases')
      await deleteCase(editedCaseId);
      dispatch(deleteCaseAction(editedCaseId)); // Dispatching deleteCase action
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(caseData) {
    caseData.uid=authCtx.uId;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateCaseAction({ id: editedCaseId, data: caseData })); // Dispatching updateCase action
        await updateCase(editedCaseId, caseData);
      } else {
        const id = await storeCases(caseData);
        dispatch(addCaseAction({ ...caseData, id: id })); // Dispatching addCase action
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
        <ScrollView>
          <ChildCasesForm
              submitButtonLabel={isEditing ? 'Update' : 'Add'}
              onSubmit={confirmHandler}
              onCancel={cancelHandler}
              defaultValues={selectedCase}
              deleteDetailsHandler={deleteCaseHandler}
          />
        </ScrollView>
      </View>
      
  );
}

export default ManageChildCases;

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
