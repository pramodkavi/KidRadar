import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux"; // Importing Redux hooks
import PreSchoolOutput from "../../components/PreSchoolOutput/PreSchoolOutput";
import IconButton from "../../components/UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { setPreSchool } from "../../slices/PreSchoolSlice";
import { AuthContext } from "../../store/auth-context";
import {
  fetchPreSchools
} from "../../util/http";

function PreSchoolDetails() {
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getPreSchool() {
      try {
        const uId = authCtx.uId;
        const fetchPreSchoolDetails = await fetchPreSchools(uId);
        dispatch(setPreSchool(fetchPreSchoolDetails));
      } catch (error) {
        console.error("Could not fetch preschool details:", error);
      }
    }

    getPreSchool();
  }, [dispatch]); // Added dispatch as a dependency

  return (
    <>
      <PreSchoolOutput
        totalCases="Total"
        fallbackText="No registered PreSchool found!"
      />
      <TouchableOpacity style={styles.addBtn}>
        <IconButton
          icon="add"
          size={32}
          color={GlobalStyles.colors.primary800}
          onPress={() => {
            navigation.navigate("ManagePreSchoolDetails");
          }}
        />
      </TouchableOpacity>
    </>
  );
}

export default PreSchoolDetails;

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 28,
    right: 15,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 15,
  },
  addBtn1: {
    position: "absolute",
    bottom: 90,
    right: 15,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 15,
  },
});
