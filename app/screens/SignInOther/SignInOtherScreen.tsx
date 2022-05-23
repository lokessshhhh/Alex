import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Linking,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AnimatedLoader from "react-native-animated-loader";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Amplify, { Auth, Hub } from "aws-amplify";
import * as WebBrowser from "expo-web-browser";
import { useDispatch, useSelector } from "react-redux";
import * as Google from 'expo-google-app-auth'

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";
import { t } from "utils";

import { signIn } from "../../redux/actions";
import imagePath from "../../constant/imagePath";
import navigationOptions from "./SignInOtherScreen.navigationOptions";
import styles from "./SignInOtherScreen.styles";
// import awsconfig from "../../../src/aws-exports";

// async function urlOpener(url, redirectUrl) {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

//   if (type === "success" && Platform.OS === "ios") {
//     WebBrowser.dismissBrowser();
//     return Linking.openURL(newUrl);
//   }
// }

// Amplify.configure({
//   ...awsconfig,
//   // oauth: {
//   //   ...awsconfig.oauth,
//   //   urlOpener,
//   // },
// });
const SignInOtherScreen: NavStatelessComponent = () => {


  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const signInDispatch = () => dispatch(signIn());
  const { userInfo } = useSelector((state) => state.saveUserReducer);
  console.log("userInfo_signinother:", userInfo);

  const [acessToken, setAccessToken] = React.useState();
  const [userInf, setUserInfo] = React.useState();

  async function signInWithGoogleAsync() {

    try {
      const result = await Google.logInAsync({
        androidClientId: "174085287297-7qob7sgmld35tojp5u61o72j2iucq4ul.apps.googleusercontent.com",
        iosClientId: "174085287297-qsrrshidrad0g213gpi3f2savgf142uf.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        setAccessToken(result.acessToken)
        setAccessToken(result.user)
        console.log("Token ", result.acessToken)
        console.log("user", result.user);
        Alert.alert("Email", result.user.email)

      }
      else {
        console.log(" Denied");
      }

    } catch (error) {
      console.log("errorrr", error)
    }
  }


  function showUserInfo() {
    if (userInf) {
      return (
        <View style={styles.userInf}>
          <Text>Welcome {acessToken.name}</Text>
          <Text>email {acessToken.email}</Text>
        </View>
      )
    }
  }

  async function getUserData() {

    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${acessToken}` }
    })

    userInfoResponse.json().then(data => {
      setUserInfo(data)
      console.log("dataaa", data)
    })

  }

  Hub.listen("auth", async (data) => {
    switch (data.payload.event) {
      case "signIn":
        console.log("sign IN");
        setLoading(false);
        signInDispatch();
        navigator.openMainPage();
        break;
      case "signOut":
        console.log("sign OUT");
        break;
      case "signIn_failure":
        setLoading(false);
        console.log("SignIn Failure");
        break;
    }
  });

  // const googleSignIn = () => {
  //   setLoading(true);

  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   // }, 3000);
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   // Auth.federatedSignIn({ provider: "Google" });

  //   Auth.federatedSignIn();
  // };

  return (
    <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Icon name="Logo" width="80" height="80" fill="none" />
          <Image source={imagePath["LogoText"]} style={styles.logoText} />
        </View>
        <View style={styles.bottomContainer}>
          <Text.TagTitle style={styles.bottomLine1}>
            {t("UI_LOGIN_ANOTHER_METHODS_L")}
          </Text.TagTitle>

          {showUserInfo()}

          <Button.White
            // title={acessToken ? "Get user Data" : "Login"}
            onPress={acessToken ? getUserData : signInWithGoogleAsync}

            fullWidth={true}
            textType={"White"}
            // onPress={() => {
            //   // navigator.openMainPage()
            //   // googleSignIn();
            // }}
            style={styles.signInBtns}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}>
              <Icon name="Google" width="25" height="24" fill="none" />
              <Text.TagTitle
                style={{
                  textTransform: "none",
                  lineHeight: 24,
                  color: Colors.black,
                  marginLeft: 10,
                }}
              >
                {"Log In with Google"}
              </Text.TagTitle>
            </View>
          </Button.White>

          <Button.Black
            fullWidth={true}
            textType={"Black"}
            onPress={() => navigator.openMainPage()}
            style={styles.signInBtns}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Icon name="Apple" width="25" height="24" fill="none" />
              <Text.TagTitle style={{ textTransform: "none", lineHeight: 24, marginLeft: 10 }}>
                {"Log In with Apple"}
              </Text.TagTitle>
            </View>
          </Button.Black>

          <TouchableOpacity
            onPress={() => navigator.openSignIn()}
            style={[styles.transparentBtnContainer, { alignSelf: "center" }]}
          >
            <Text.Tertiary style={styles.transparentBtn}>{t("UI_LOGIN_BY_EMAIL_B")}</Text.Tertiary>
          </TouchableOpacity>
        </View>
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0)"
          source={require("../../../assets/loader.json")}
          animationStyle={{ width: 100, height: 100, top: -20 }}
          speed={1}
        />


      </View>
    </ImageBackground>
  );
};

SignInOtherScreen.navigationOptions = navigationOptions();

export default SignInOtherScreen;
