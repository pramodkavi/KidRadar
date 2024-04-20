import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import CourseForm from '../../components/ManageCourseDetails/CourseForm';
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import IconButton from '../../components/UI/IconButton';
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { addCourse, selectCourse } from '../../slices/CourseSlice';
import { deleteCase, deleteCourse, storeCourses, storeSchool, updateCase, updateCourse } from '../../util/http';

function ManageCourse({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const courses = useSelector(selectCourse); // Accessing expenses state from Redux store

  const editedCourseId = route.params?.expenseId;
  const isEditing = !!editedCourseId;

  const selectedCase = courses.find(
      (expense) => expense.id === editedCourseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit School Case' : 'Create School Case',
    });
  }, [navigation, isEditing]);

  async function deleteCaseHandler(){
    setIsSubmitting(true);
    try {
      await deleteCase(editedCaseId);
      dispatch(deleteCourse(editedCaseId)); // Dispatching deleteCase action
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(courseData) {
    console.log("////////////////courseData in Manage",courseData);
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateCourse({ id: editedCaseId, data: courseData })); // Dispatching updateCase action
        await updateCourse(editedCaseId, courseData);
      } else {
        courseData.instituteId ="6620de7eb07d140952120cde"; 
        const id = await storeCourses(courseData);
        // dispatch(addCourse({ ...courseData, id: id })); // Dispatching addCase action
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
        <CourseForm
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

export default ManageCourse;

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
