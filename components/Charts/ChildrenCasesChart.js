import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Button } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCases } from "../../util/http";
import { setCase } from "../../slices/CaseSlice";

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(54, 33, 141, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 0,
  useShadowColorFromDataset: false, // optional
};
const graphStyle = {
  marginVertical: 8,
  ...chartConfig.style,
};
export function ChildrenCasesChart() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;
  const height = 220;
  const cases = useSelector((state) => state.cases.cases); // Accessing cases state from Redux store

  const jaEla = cases.reduce((acc, obj) => {
    if (obj.division.label === "Ja-Ela") {
      acc++;
    }
    return acc;
  }, 0);
  const katana = cases.reduce((acc, obj) => {
    if (obj.division.label === "Katana") {
      acc++;
    }
    return acc;
  }, 0);
  const negombo = cases.reduce((acc, obj) => {
    if (obj.division.label === "Negombo") {
      acc++;
    }
    return acc;
  }, 0);

  const pieChartData = [
    { name: 'Ja-Ela', population: jaEla, color: '#4AB2D9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Negombo', population: negombo, color: '#537CBC', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Katana', population: katana, color: '#3A3E99', legendFontColor: '#7F7F7F', legendFontSize: 15 },
]

  return (
    <>
      <View style={styles.chartHeader}>
        <Text style={styles.headerTxt}>Children Cases</Text>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("Child Cases");
          }}
        >
          Load more
        </Button>
      </View>
      <View class={"pt-20"}>
        <PieChart
          data={pieChartData}
          width={width}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          // paddingLeft={"15"}
          center={[5, 0]}
          absolute
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chartHeader: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTxt: {
    fontSize: 16,
    fontWeight: "bold",
  }
});
