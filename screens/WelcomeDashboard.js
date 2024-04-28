import React, { useEffect } from "react";
import { View } from "react-native";
import GreetingCard from "../components/WelcomeDashboard/GreetingCard";
import { fetchInstitute, fetchPreSchoolCasesCount } from "../util/http";
import { setPreSchoolCasesCount } from "../slices/PreSchoolCasesCountSlice";
import { useDispatch, useSelector } from "react-redux";
import { setInstitute } from "../slices/InstituteSlice";

function WelcomeDashboard() {

  const user = useSelector(state => state.users.users);
  console.log("///////////////////// user in ",user)
  console.log("///////////////////// name ",user[0].name)
  console.log("///////////////////// name ",user[0].designation)
  console.log("///////////////////// name ",user[0].phoneNumber)
  console.log("///////////////////// name ",user[0].email)

  // Fetching pre school count details
  const dispatch = useDispatch();
//   useEffect(() => {
//     async function getCases() {
//         try {
//              const preCasesCountFetch=await fetchPreSchoolCasesCount();
//              dispatch(setPreSchoolCasesCount(preCasesCountFetch)); // Dispatching setCase action
//         } catch (error) {
//             console.error('Could not fetch Pre School Cases:', error);
//         }
//     }

//     getCases();
// }, [dispatch]); // Added dispatch as a dependency

// Fetching cases details
  useEffect(() => {
          async function getCases() {
              try {
                  const casesFetch = await fetchCases();
                  dispatch(setCase(casesFetch)); // Dispatching setCase action
              } catch (error) {
                  console.error('Could not fetch cases:', error);
                  // Handle error as needed
              }
          }

          getCases();
      }, [dispatch]);
      useEffect(() => {
        async function getCases() {
            try {
                const institutesFetch = await fetchInstitute();
                dispatch(setInstitute(institutesFetch)); // Dispatching setCase action
            } catch (error) {
                console.error('Could not fetch Institutes:', error);
            }
        }

        getCases();
    }, [dispatch]); // Added dispatch as a dependency
  return (
    <View>
      <GreetingCard />
    </View>
  );
}

export default WelcomeDashboard;
