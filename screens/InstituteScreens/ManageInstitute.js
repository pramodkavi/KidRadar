import {useContext, useLayoutEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import {
  deletePreSchool, storeInstitute,
  storePreSchool,
  updateCase, updateInstitut
} from '../../util/http';
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import IconButton from '../../components/UI/IconButton';
import {AuthContext} from "../../store/auth-context";
import InstituteForm from "../../components/ManageInstituteDetails/InstituteForm";
import {
  addInstitute,
  deleteInstitute,
  selectInstitute,
  setInstitute,
  updateInstitute
} from "../../slices/InstituteSlice"; // Importing Redux actions

function ManageInstitute({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const institutes = useSelector(selectInstitute); // Accessing expenses state from Redux store

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const editedInstituteId = route.params?.instituteId;
  const isEditing = !!editedInstituteId;
console.log("editedInstituteId",editedInstituteId)
  const selectedInstitute = institutes.find(
      (institute) => institute.id === editedInstituteId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Institute Details' : 'Add Institute Details',
    });
  }, [navigation, isEditing]);

  async function deleteDetailsHandler(){
    navigation.navigate('InstituteOverview');
    setIsSubmitting(true);
    try {
      await deletePreSchool(editedInstituteId);
      dispatch(deleteInstitute(editedInstituteId)); // Dispatching deleteCase action
    } catch (error) {
      setError('Could not delete Institute - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(instituteData) {
    instituteData.uid=authCtx.uId;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateInstitute({ id: editedInstituteId, data: instituteData })); // Dispatching updateCase action
        console.log("////////editedInstitute");
        await updateInstitut(editedInstituteId, instituteData)
      } else {
        const id = await storeInstitute(instituteData);
        dispatch(addInstitute({ ...instituteData, id: id }));
      }
      navigation.goBack();
    } catch (error) {
        console.log("error",error);
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
        <InstituteForm
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            onCancel={cancelHandler}
            defaultValues={selectedInstitute}
        />
        {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton
                  icon="trash"
                  color="red" // Adjust color here as needed
                  size={36}
                  onPress={deleteDetailsHandler}
              />
            </View>
        )}
      </View>
  );
}

export default ManageInstitute;

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
