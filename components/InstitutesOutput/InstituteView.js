import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { GlobalStyles } from "../../constants/styles";
import { selectGeneralId } from "../../slices/GeneralIdSlice";
import { selectInstitute } from "../../slices/InstituteSlice";
import IconButton from "../UI/IconButton";

function InstituteView({ route, navigation }) {
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector(selectInstitute); // Accessing expenses state from Redux store

  const id = useSelector(selectGeneralId); // Accessing expenses state from Redux store
  const selectedData = cases.find((data) => data.id === id);

  function casePressHandler() {
    navigation.navigate("ManageInstitute", {
      instituteId: id,
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.maintext}>Pathway Hub Details</Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <DataTable.Row>
          <DataTable.Cell>Name</DataTable.Cell>
          <DataTable.Cell>{selectedData.name ?? "-"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Contact Number</DataTable.Cell>
          <DataTable.Cell>{selectedData.contactNo}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Description</DataTable.Cell>
          <DataTable.Cell>{selectedData.description}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Detailed Name</DataTable.Cell>
          <DataTable.Cell>{selectedData.detailedName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Email</DataTable.Cell>
          <DataTable.Cell>{selectedData.email}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Institute Type</DataTable.Cell>
          <DataTable.Cell>{selectedData.type.label ?? "-"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Sub Type</DataTable.Cell>
          <DataTable.Cell>{selectedData.subType ?? "-"}</DataTable.Cell>
        </DataTable.Row>
      </View>
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

export default InstituteView;

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
