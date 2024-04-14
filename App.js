import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ManageChildCases from './screens/ManageChildCases';
import ChildCases from './screens/ChildCases';
import { GlobalStyles } from './constants/styles';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
import {PaperProvider} from 'react-native-paper';
import { Provider } from "react-redux";
import { store } from "./store/store";
import StudentCasesScreen from "./screens/StudentCasesScreen";
import ManagePreSchoolCases from "./screens/PreSchoolStudentScreens/ManagePreSchoolCases";
import ManagePreSchoolCasesCount from "./screens/PreSchoolStudentScreens/ManagePreSchoolCasesCount";
import PreSchoolCases from "./screens/PreSchoolStudentScreens/PreSchoolCases";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PreSchoolDetails from './screens/SchoolPreSchoolScreens/PreSchoolDetails';
import ManagePreSchoolDetails from './screens/SchoolPreSchoolScreens/ManagePreSchoolDetails';
import SchoolDetails from './screens/SchoolPreSchoolScreens/SchoolDetails';
import ManageSchoolDetails from './screens/SchoolPreSchoolScreens/ManageSchoolDetails';
import AuthContextProvider, {AuthContext} from "./store/auth-context";
import {useContext} from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import IconButton from './components/UI/IconButton';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

function ChildCasesOverview() {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: 'black',
                tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                tabBarActiveTintColor: GlobalStyles.colors.primary400,
            })}
        >
            <BottomTabs.Screen
                name="Student Cases"
                component={SchoolPreSchooolOverview}
                options={{
                    title: 'Students',
                    tabBarLabel: 'Students',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Child Cases"
                component={ChildCases}
                options={{
                    title: 'Child Cases',
                    tabBarLabel: 'Child Cases',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />

        </BottomTabs.Navigator>
    );
}



function SchoolPreSchooolOverview() {
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: 'black',
                tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                tabBarActiveTintColor: GlobalStyles.colors.primary400,
            })}
        >
            <Tab.Screen name="PreSchools" component={PreSchoolDetails} />
            <Tab.Screen name="School" component={SchoolDetails} />
        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: 'black',
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: 'black',
            }}
        >
            {/*<Stack.Screen*/}
            {/*    name="Welcome"*/}
            {/*    component={WelcomeScreen}*/}
            {/*    options={{*/}
            {/*        headerRight: ({ tintColor }) => (*/}
            {/*            <IconButton*/}
            {/*                icon="exit"*/}
            {/*                color={tintColor}*/}
            {/*                size={24}*/}
            {/*                onPress={authCtx.logout}*/}
            {/*            />*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
             <Stack.Screen
                name="ChildCasesOverview"
                component={ChildCasesOverview}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="School PreSchoool Overview"
                component={SchoolPreSchooolOverview}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="ChildCases"
                component={ChildCases}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="PreSchoolCases"
                component={PreSchoolCases}
                options={{
                    presentation: 'modal',
                }}
            />

            <Stack.Screen
                name="ManageChildCases"
                component={ManageChildCases}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="ManagePreSchoolCases"
                component={ManagePreSchoolCases}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="ManagePreSchoolCasesCount"
                component={ManagePreSchoolCasesCount}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="ManagePreSchoolDetails"
                component={ManagePreSchoolDetails}
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="ManageSchoolDetails"
                component={ManageSchoolDetails}
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);
    console.log("///////////////////authCtx.token In APP",authCtx.token)
    console.log("///////////////////authCtx.token In APP",authCtx.uId)

    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}


export default function App() {
    return (
        <>
            <Provider store={store}>
                <PaperProvider>
                    <AuthContextProvider>
                        <Navigation />
                    </AuthContextProvider>
                </PaperProvider>
            </Provider>
        </>
    );
}
// export default function App() {
//     return (
//
//         <Provider store={store}>
//             <PaperProvider>
//                 <StatusBar style="white" />
//                 <NavigationContainer>
//                     <Stack.Navigator
//                         screenOptions={{
//                             headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
//                             headerTintColor: 'black',
//                         }}
//                     >
//                         {/* <Stack.Screen
//                             name="ChildCasesOverview"
//                             component={ChildCasesOverview}
//                             options={{ headerShown: false }}
//                         /> */}
//                         <Stack.Screen
//                             name="School PreSchoool Overview"
//                             component={SchoolPreSchooolOverview}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                         <Stack.Screen
//                             name="ChildCases"
//                             component={ChildCases}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                         <Stack.Screen
//                             name="PreSchoolCases"
//                             component={PreSchoolCases}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//
//                         <Stack.Screen
//                             name="ManageChildCases"
//                             component={ManageChildCases}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                         <Stack.Screen
//                             name="ManagePreSchoolCases"
//                             component={ManagePreSchoolCases}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                         <Stack.Screen
//                             name="ManagePreSchoolCasesCount"
//                             component={ManagePreSchoolCasesCount}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                         <Stack.Screen
//                             name="ManagePreSchoolDetails"
//                             component={ManagePreSchoolDetails}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                         <Stack.Screen
//                             name="ManageSchoolDetails"
//                             component={ManageSchoolDetails}
//                             options={{
//                                 presentation: 'modal',
//                             }}
//                         />
//                     </Stack.Navigator>
//                 </NavigationContainer>
//             </PaperProvider>
//         </Provider>
//     );
// }
