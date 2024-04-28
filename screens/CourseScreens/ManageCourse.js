import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import CourseForm from "../../components/ManageCourseDetails/CourseForm";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import IconButton from "../../components/UI/IconButton";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import {
  addCourse,
  deleteCourse,
  selectCourse,
  updateCourse,
} from "../../slices/CourseSlice";
import {
  deleteCase,
  deleteCourses,
  storeCourses,
  updateCourses,
} from "../../util/http";
import { selectGeneralId } from "../../slices/GeneralIdSlice";

function ManageCourse({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const courses = useSelector(selectCourse); // Accessing expenses state from Redux store
  const instituteid = useSelector(selectGeneralId); // Accessing expenses state from Redux store
  const editedCourseId = route.params?.dataId;
  const isEditing = !!editedCourseId;

  const selectedCase = courses.find((expense) => expense.id === editedCourseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Course" : "Create New Course",
    });
  }, [navigation, isEditing]);

  async function deleteCaseHandler() {
    setIsSubmitting(true);
    try {
      await deleteCourses(editedCourseId);
      dispatch(deleteCourse(editedCourseId)); // Dispatching deleteCase action
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(courseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateCourses(editedCourseId, courseData);
        dispatch(updateCourse({ id: editedCourseId, data: courseData })); // Dispatching updateCase action
      } else {
        courseData.instituteId = instituteid;
        const id = await storeCourses(courseData);
        dispatch(addCourse({ ...courseData, id: id })); // Dispatching addCase action
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
      <CourseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedCase}
        deleteDetailsHandler={deleteCaseHandler}
      />
    </View>
  );
}

export default ManageCourse;

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
