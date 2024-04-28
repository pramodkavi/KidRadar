import { StyleSheet, Text, View } from "react-native";

import { useState } from "react";
import { Alert, Modal, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function PreSchoolCaseSummary({ countDetails }) {

  // const description = count[0].description;
  const graduatesCounts = 18;
  const scholarsCounts = 148;
  // const countCasesByDivision = ( division) => {
  //   const cases = useSelector((state) => state.cases.cases);
  //   return cases.reduce((count, currentCase) => {
  //     if (currentCase.division && currentCase.division.label === division) {
  //       count++;
  //     }
  //     return count;
  //   }, 0);
  // };
  function SummaryByDivision(division) {
    // Filter countDetails based on division label
    const divisionData = countDetails.find(
      (item) => item.division.label === division
    );

    // If divisionData is found, extract graduatesCounts and scholarsCounts
    const graduatesCounts = divisionData ? divisionData.graduatesCounts : 0;
    const scholarsCounts = divisionData ? divisionData.scholarsCounts : 0;

    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={styles.container}>
        <Pressable onPress={() => setModalVisible(true)}>
          <View>
            <Text style={styles.city}>{division}</Text>
            <View style={styles.subContainer}>
              <Text style={styles.sum}>{scholarsCounts}</Text>
              <Text style={styles.horizontleLine}>|</Text>
              <Text style={styles.sumWarn}>{graduatesCounts}</Text>
            </View>
          </View>
        </Pressable>
        <View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>
                    {divisionData?.division?.label}
                  </Text>
                  <Text>{`Description : ${divisionData?.description}`}</Text>
                  <View style={styles.modalView}>
                    <Text>{`Graduated count : ${divisionData?.graduatesCounts}`}</Text>
                    <Text>{`Scholars count : ${divisionData?.scholarsCounts}`}</Text>
                  </View>
                  <View style={styles.modalButtons}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.cancelButton}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }

  // const casesSum = cases.reduce((sum, expense) => {
  //   return sum + expense.amount;
  // }, 0);

  return (
    <View style={styles.section}>
      {SummaryByDivision("Katana")}
      {SummaryByDivision("Ja-Ela")}
      {SummaryByDivision("Negombo")}
    </View>
  );
}

export default PreSchoolCaseSummary;

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    width: "30%",
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: "center",
    maxHeight: 75,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  city: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray700,
  },
  sumWarn: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.error500,
  },
  horizontleLine: {
    marginHorizontal: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray700,
  },
  justofyButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  trashIcon: { marginTop: 20 },
  cancelButton: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  deleteButton: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: "#f00",
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#ddd",
    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
  },
});
