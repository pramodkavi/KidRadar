import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

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
export function PreschoolGraduatesCounts() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

    const width = Dimensions.get('window').width
    const height = 220
    const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);

    console.log("///////////////////////////// preSchoolCasesCount",preSchoolCasesCount)
    let jaEla = 0;let negombo = 0;let katana = 0; 

    if(preSchoolCasesCount != []){
         jaEla = preSchoolCasesCount.find(item => item.division.label === "Ja-Ela")?.graduatesCounts != undefined?
        preSchoolCasesCount.find(item => item.division.label === "Ja-Ela")?.graduatesCounts: 0
        ;
         negombo = preSchoolCasesCount.find(item => item.division.label === "Negombo")?.graduatesCounts!= undefined?
        preSchoolCasesCount.find(item => item.division.label === "Negombo")?.graduatesCounts: 0
        ;
         katana = preSchoolCasesCount.find(item => item.division.label === "Katana")?.graduatesCounts!= undefined?
        preSchoolCasesCount.find(item => item.division.label === "Katana")?.graduatesCounts: 0
        ;
        console.log("///////////////////////// count divitions",jaEla,negombo,katana)
    }
    
    const pieChartData = [
      {
        name: "Ja-Ela",
        population: jaEla,
        color: "#4AB2D9",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Negombo",
        population: negombo,
        color: "#537CBC",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Katana",
        population: katana,
        color: "#3A3E99",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    return (
        <>
            <View style={styles.chartHeader}>
                <Text style={styles.headerTxt}>Preschool Graduates counts</Text>
                <Button
                    mode="outlined"
                    onPress={() => {
                        navigation.navigate('PreSchoolCases');
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
    )
}

const styles = StyleSheet.create({
  chartHeader: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
