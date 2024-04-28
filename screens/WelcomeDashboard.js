import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DrawerContent from "../components/Drawer/DrawerContent";
import GreetingCard from "../components/WelcomeDashboard/GreetingCard";
import { setCase } from "../slices/CaseSlice";
import { setInstitute } from "../slices/InstituteSlice";
import { setPreSchoolCasesCount } from "../slices/PreSchoolCasesCountSlice";
import { AuthContext } from "../store/auth-context";
import {
  fetchCases,
  fetchInstitute,
  fetchPreSchoolCasesCount,
} from "../util/http";

function WelcomeDashboard() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.users.users);
  const authCtx = useContext(AuthContext);
  // Fetching pre school count details
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCases() {
      try {
        const uId = authCtx.uId;
        const preCasesCountFetch = await fetchPreSchoolCasesCount(uId);
        dispatch(setPreSchoolCasesCount(preCasesCountFetch)); // Dispatching setCase action
      } catch (error) {
        console.error("Could not fetch Pre School Cases:", error);
      }
    }

    getCases();
  }, [dispatch]); // Added dispatch as a dependency

  // Fetching cases details
  useEffect(() => {
    async function getCases() {
      try {
        const uId = authCtx.uId;
        const casesFetch = await fetchCases(uId);
        dispatch(setCase(casesFetch)); // Dispatching setCase action
      } catch (error) {
        console.error("Could not fetch cases:", error);
        // Handle error as needed
      }
    }

    getCases();
  }, [dispatch]);
  useEffect(() => {
    async function getCases() {
      try {
        const uId = authCtx.uId;
        const institutesFetch = await fetchInstitute(uId);
        dispatch(setInstitute(institutesFetch)); // Dispatching setCase action
      } catch (error) {
        console.error("Could not fetch Institutes:", error);
      }
    }

    getCases();
  }, [dispatch]); // Added dispatch as a dependency
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}
    >
      <View>
        <GreetingCard />
        <Button
          onPress={() => setOpen((prevOpen) => !prevOpen)}
          title={`${open ? "Close" : "Open"} drawer`}
        />
      </View>
    </Drawer>
  );
}

export default WelcomeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // Set your desired width
    height: 300, // Set your desired height
    resizeMode: "cover", // You can adjust the resizeMode as per your requirement
  },
});
