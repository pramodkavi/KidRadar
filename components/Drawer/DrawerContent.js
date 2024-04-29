import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  ArrowRightOnRectangleIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";

const deviceWidth = Dimensions.get("window").width;
export default function DrawerContent() {
  const authCtx = useContext(AuthContext);
  let navigation = useNavigation();
  const user = useSelector((state) => state.users.users);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View>
          <TouchableOpacity
            className={"flex-row"}
            style={{
              paddingLeft: deviceWidth * 0.04,
              paddingTop: 10,
              flexDirection: "column",
            }}
            onPress={() => navigation.navigate("User View")}
          >
            <View>
              <Image
                source={require("../../assets/avatar.png")} // Change the path to your image file
                style={styles.image}
              />
            </View>
            <View>
              <Text className={"text-lg font-semibold "}>{user[0].name}</Text>
              <Text className={"text-gray-400"} style={{ color: "gray" }}>
                {user[0].designation}
              </Text>
            </View>
          </TouchableOpacity>
          {user[0].role != 7000 && (
            <TouchableOpacity
              className={"mt-2 py-2 "}
              style={{ backgroundColor: GlobalStyles.colors.primary400 }}
              onPress={() => navigation.navigate("Register")}
            >
              <View className={"flex-row px-2 space-x-3 jus"}>
                <UserIcon className="h-8 w-8" color={"white"} />
                {user[0].role === 5000 && (
                  <Text
                    className=" flex-1"
                    style={{ color: "white", fontSize: 16 }}
                  >
                    Register System Admin
                  </Text>
                )}
                {user[0].role === 6000 && (
                  <Text
                    className=" flex-1"
                    style={{ color: "white", fontSize: 16 }}
                  >
                    Register Officer
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}

          {user[0].role === 7000 && (
            <TouchableOpacity
              className={"mt-2 py-2 "}
              style={{ backgroundColor: GlobalStyles.colors.primary400 }}
              onPress={() => navigation.navigate("Emergency Contact")}
            >
              <View className={"flex-row px-2 space-x-3 jus"}>
                <PhoneIcon className="h-8 w-8" color={"white"} />
                <Text
                  className=" flex-1"
                  style={{ color: "white", fontSize: 16 }}
                >
                  Emergency Contact
                </Text>
                {/*<Image source={require("../../assets/images/crown.png")} className={"w-5 h-5"} />*/}
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className={"mt-2 py-2 "}
            style={{ backgroundColor: GlobalStyles.colors.primary400 }}
            onPress={authCtx.logout}
          >
            <View className={"flex-row px-2 space-x-3 jus"}>
              <ArrowRightOnRectangleIcon className="h-8 w-8" color={"white"} />
              <Text
                className=" flex-1"
                style={{ color: "white", fontSize: 16 }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "25%", // Set your desired width
    height: 70, // Set your desired height
    resizeMode: "cover", // You can adjust the resizeMode as per your requirement
  },
  logout: {
    // position:abo
    marginTop: "500",
  },
});
