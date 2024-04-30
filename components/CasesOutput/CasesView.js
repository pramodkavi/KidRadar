import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";

function CasesView({ route, navigation }) {
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector((state) => state.cases.cases); // Accessing expenses state from Redux store

  const id = route.params?.expenseId;
  const selectedCase = cases.find((data) => data.id === id);

  const initialRegion = {
    latitude: 7.0873,
    longitude: 79.9998,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selectedLocation, setSelectedLocation] = useState(
    selectedCase.location
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Child Case Details",
    });
  }, [navigation]);

  function casePressHandler() {
    navigation.navigate("ManageChildCases", {
      expenseId: id,
    });
  }

  function mapHandler() {
    navigation.navigate("MapScreen", {
      setLocation: selectedLocation,
      getlocation: setSelectedLocation,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.maintext}>Case Details</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <DataTable.Row>
          <DataTable.Cell>Name</DataTable.Cell>
          <DataTable.Cell>{selectedCase.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Age</DataTable.Cell>
          <DataTable.Cell>{selectedCase.age}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Case Type</DataTable.Cell>
          <DataTable.Cell>{selectedCase.caseType.label}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Contact Number</DataTable.Cell>
          <DataTable.Cell>{selectedCase.contactNo}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Date</DataTable.Cell>
          <DataTable.Cell numberOfLines={5}>
            {getFormattedDate(selectedCase.date)}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Division</DataTable.Cell>
          <DataTable.Cell>{selectedCase.division.label}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Reason</DataTable.Cell>
          <DataTable.Cell>{selectedCase.reason}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>School</DataTable.Cell>
          <DataTable.Cell>{selectedCase.school.label}</DataTable.Cell>
        </DataTable.Row>
      </View>
      {selectedCase.caseType.label == "Street Child" && (
        <Button style={styles.button} onPress={mapHandler}>
          See Location
        </Button>
      )}
      <TouchableOpacity style={styles.addBtn}>
        <IconButton
          icon="pencil"
          size={32}
          color={GlobalStyles.colors.primary800}
          onPress={casePressHandler}
        />
      </TouchableOpacity>
    </View>
  );
}

export default CasesView;

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
  addBtn: {
    position: "absolute",
    bottom: 28,
    right: 15,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 15,
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  textwrap: {
    marginBottom: 6,
  },
});
