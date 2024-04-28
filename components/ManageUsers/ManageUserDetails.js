import {useContext, useLayoutEffect, useState} from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import ErrorOverlay from '../../components/UI/ErrorOverlay';
import IconButton from '../../components/UI/IconButton';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import UserForm from './UserForm';
import { updateUser } from '../../slices/UserSlice';
import { updateUsers } from '../../util/http';

function ManageUserDetails({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const user = useSelector(state => state.users.users); // Accessing expenses state from Redux store
  const selectedUser = user[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit User Details'
    });
  }, [navigation]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(caseData) {
    caseData.email = selectedUser.email;
    caseData.id = selectedUser.id;
    caseData.role = selectedUser.role;
    caseData.uId = selectedUser.uId;
    console.log("////////////////////////// caseData",caseData)

    setIsSubmitting(true);
    try {
      await updateUsers(selectedUser.id,caseData);
        dispatch(updateUser({ email: selectedUser.email, data: caseData })); // Dispatching updateCase action
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
          <UserForm
              submitButtonLabel={'Update'}
              onSubmit={confirmHandler}
              onCancel={cancelHandler}
              defaultValues={selectedUser}
          />
        </ScrollView>
      </View>
      
  );
}

export default ManageUserDetails;

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
