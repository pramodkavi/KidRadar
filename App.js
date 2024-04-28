import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import CasesView from "./components/CasesOutput/CasesView";
import InstituteView from "./components/InstitutesOutput/InstituteView";
import ManageUserDetails from "./components/ManageUsers/ManageUserDetails";
import UserView from "./components/ManageUsers/UserView";
import PreSchoolCasesView from "./components/PreSchoolCasesOutput/PreSchoolCasesView";
import PreSchoolView from "./components/PreSchoolOutput/PreSchoolView";
import SchoolView from "./components/SchoolOutput/SchoolView";
import { GlobalStyles } from "./constants/styles";
import ChildCases from "./screens/ChildCases";
import MapScreen from "./screens/ChildCasesScreen/MapScreen";
import Courses from "./screens/CourseScreens/Courses";
import ManageCourse from "./screens/CourseScreens/ManageCourse";
import EmergencyContacts from "./screens/EmergencyContactScreens";
import Institutes from "./screens/InstituteScreens/Institutes";
import ManageInstitute from "./screens/InstituteScreens/ManageInstitute";
import LoginScreen from "./screens/LoginScreen";
import ManageChildCases from "./screens/ManageChildCases";
import ManagePreSchoolCases from "./screens/PreSchoolStudentScreens/ManagePreSchoolCases";
import ManagePreSchoolCasesCount from "./screens/PreSchoolStudentScreens/ManagePreSchoolCasesCount";
import PreSchoolCases from "./screens/PreSchoolStudentScreens/PreSchoolCases";
import ManagePreSchoolDetails from "./screens/SchoolPreSchoolScreens/ManagePreSchoolDetails";
import ManageSchoolDetails from "./screens/SchoolPreSchoolScreens/ManageSchoolDetails";
import PreSchoolDetails from "./screens/SchoolPreSchoolScreens/PreSchoolDetails";
import SchoolDetails from "./screens/SchoolPreSchoolScreens/SchoolDetails";
import SignupScreen from "./screens/SignupScreen";
import StudentDetails from "./screens/StudentAssignment/StudentDetails";
import StudentCasesScreen from "./screens/StudentCasesScreen";
import WelcomeDashboard from "./screens/WelcomeDashboard";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { store } from "./store/store";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function ChildCasesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "black",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.primary400,
      })}
    >
      <BottomTabs.Screen
        name="Child Cases"
        component={ChildCases}
        options={{
          title: "Child Cases",
          tabBarLabel: "Child Cases",
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
        headerTintColor: "black",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.primary400,
      })}
    >
      <Tab.Screen name="PreSchools" component={PreSchoolDetails} />
      <Tab.Screen name="School" component={SchoolDetails} />
    </Tab.Navigator>
  );
}

function InstituteOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "black",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.primary400,
      })}
    >
      <Tab.Screen name="Course" component={Courses} />
      <Tab.Screen name="Student Details" component={StudentDetails} />
      <Tab.Screen name="Pathway Hub Details" component={InstituteView} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen name="KidRadar" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={WelcomeDashboard}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="StudentCasesScreen"
        component={StudentCasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Child Cases"
        component={ChildCases}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Overview"
        component={StudentCasesScreen}
        options={{ presentation: "fullScreenModal" }}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChildCasesOverview"
        component={ChildCasesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="School PreSchoool Overview"
        component={SchoolPreSchooolOverview}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Emergency Contact"
        component={EmergencyContacts}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Preschool Cases"
        component={PreSchoolCases}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Pathway Hub"
        component={Institutes}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManageChildCases"
        component={ManageChildCases}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManagePreSchoolCases"
        component={ManagePreSchoolCases}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManagePreSchoolCasesCount"
        component={ManagePreSchoolCasesCount}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManagePreSchoolDetails"
        component={ManagePreSchoolDetails}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManageSchoolDetails"
        component={ManageSchoolDetails}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Manage User Details"
        component={ManageUserDetails}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Pathway Hub Overview"
        component={InstituteOverview}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManageInstitute"
        component={ManageInstitute}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ManageCourse"
        component={ManageCourse}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="CasesView"
        component={CasesView}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="PreSchoolCasesView"
        component={PreSchoolCasesView}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="PreSchoolView"
        component={PreSchoolView}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="School View"
        component={SchoolView}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="User View"
        component={UserView}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="Register"
        component={SignupScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
      {/* {true && <AuthenticatedStack />} */}
    </NavigationContainer>
  );
}

export default function App() {
  LogBox.ignoreAllLogs();
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
