import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import { storeUser } from "../util/http";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const user = useSelector((state) => state.users.users);
  async function signupHandler({
    email,
    password,
    name,
    phoneNumber,
    designation,
  }) {
    setIsAuthenticating(true);

    try {
      const res = await createUser(email, password);
      authCtx.authenticate(res.token);
      authCtx.setUID(
        res.localId ? res.localId : "pIvQlCCo0kWrIxYIouvx38romT63"
      );

      let userData = { email, password, name, phoneNumber, designation };
      userData.uId = res.localId;

      if (user[0].role === 5000) {
        userData.role = 6000;
      } else {
        userData.role = 7000;
      }
      const id = await storeUser(userData);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
    navigation.goBack();
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
