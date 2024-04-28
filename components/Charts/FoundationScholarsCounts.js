import { useEffect } from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {PieChart} from "react-native-chart-kit";
import {Button} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchPreSchoolCasesCount } from "../../util/http";
import { setPreSchoolCasesCount } from "../../slices/PreSchoolCasesCountSlice";


const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(54, 33, 141, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};
const graphStyle = {
    marginVertical: 8,
    ...chartConfig.style
}
export function FoundationScholarsCounts(){
    const width = Dimensions.get('window').width
    const height = 220
    const dispatch = useDispatch();
    useEffect(() => {
        async function getCases() {
            try {
                 const preCasesCountFetch=await fetchPreSchoolCasesCount();
                 dispatch(setPreSchoolCasesCount(preCasesCountFetch)); // Dispatching setCase action
            } catch (error) {
                console.error('Could not fetch Pre School Cases:', error);
            }
        }

        getCases();
    }, [dispatch]); // Added dispatch as a dependency

    const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);
    const jaEla = preSchoolCasesCount.find(item => item.division.label === "Ja-Ela").scholarsCounts?
    preSchoolCasesCount.find(item => item.division.label === "Ja-Ela").scholarsCounts:0;
    const negombo = preSchoolCasesCount.find(item => item.division.label === "Negombo").scholarsCounts?
    preSchoolCasesCount.find(item => item.division.label === "Negombo").scholarsCounts:0;
    const katana = preSchoolCasesCount.find(item => item.division.label === "Katana").scholarsCounts?
    preSchoolCasesCount.find(item => item.division.label === "Katana").scholarsCounts:0;
    const pieChartData = [
        { name: 'Ja-Ela', population: jaEla, color: '#4AB2D9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Negombo', population: negombo, color: '#537CBC', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Katana', population: katana, color: '#3A3E99', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ]
    return (
        <>
            <View style={styles.chartHeader}>
                <Text style={styles.headerTxt}>Scholars Counts</Text>
                <Button mode="outlined" >
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
                    absolute
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    chartHeader: {
        marginTop:8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
    },
    headerTxt:{
        fontSize:16,
        fontWeight:"bold"
    }
});