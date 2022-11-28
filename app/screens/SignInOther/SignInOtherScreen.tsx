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
// import * as Google from 'expo-google-app-auth';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";
import { t } from "utils";

import BaseURl from "constant/BaseURL";
import { signIn } from "../../redux/actions";
import imagePath from "../../constant/imagePath";
import navigationOptions from "./SignInOtherScreen.navigationOptions";
import styles from "./SignInOtherScreen.styles";

WebBrowser.maybeCompleteAuthSession();

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

  const [acessToken, setAccessToken] = React.useState('');
  const [userInf, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '119261466899-hi6kjavtkc3as4mru275nedq7inmfnjc.apps.googleusercontent.com',
    iosClientId: '119261466899-8lsk8hfbr7okmech438avgp8huiagqv8.apps.googleusercontent.com',
    webClientId: '119261466899-hi6kjavtkc3as4mru275nedq7inmfnjc.apps.googleusercontent.com',
    scopes: ["profile", "email"]
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log("========", authentication)
      setAccessToken(authentication.accessToken)
      fetchUserInfo(authentication.accessToken)
    }

  }, [response]);

  async function fetchUserInfo(token) {

    await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((resposeJson) => {
        console.log(resposeJson)
        login(resposeJson.email, resposeJson.name, resposeJson.picture)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function login(email: any, name: any, image: any) {
    const data = {
      email: email,
      userName: name,
      profileImage: image
    }
    axios
      .post(BaseURl + "auth/logiWithGoogle", data)
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.status);
        if (resposeJson.status === 200) {
          console.log(resposeJson.data.data)
          const storeToken = async () => {
            await AsyncStorage.setItem('authToken', resposeJson.data.data.loginToken);
          }
          storeToken()
          alert(resposeJson.data.message)
          navigator.openMainPage()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function loginWithApple() {
    // email: any, name: any, image: any
    const data = {
      // email: email,
      // userName: name,
      // profileImage: image
      email: "mistrydhruvi.dds@gmail.com",
      userName: "Test " + "DDS",
      profileImage: ""
    }
    axios
      .post(BaseURl + "auth/loginWithApple", data)
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.status);
        if (resposeJson.status === 200) {
          console.log(resposeJson.data.data)
          const storeToken = async () => {
            await AsyncStorage.setItem('authToken', resposeJson.data.data.loginToken);
          }
          storeToken()
          alert(resposeJson.data.message)
          navigator.openMainPage()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  async function signInWithAppleAsync() {
    // await AppleAuthentication.signOutAsync(acessToken)

    await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ],

    })
      .then(resp => {
        console.log(resp)
        loginWithApple()
        // loginWithApple(resp.email, resp.fullName.familyName + " " + resp.fullName.givenName, "")
      })
      .catch(err => console.log(err))
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

  async function signInWithGoogleAsync() {

    // try {
    //   const result = await Google.logInAsync({
    //     androidClientId: "174085287297-7qob7sgmld35tojp5u61o72j2iucq4ul.apps.googleusercontent.com",
    //     iosClientId: "174085287297-qsrrshidrad0g213gpi3f2savgf142uf.apps.googleusercontent.com",
    //     scopes: ["profile", "email"]
    //   });

    //   if (result.type === "success") {
    //     setAccessToken(result.acessToken)
    //     setAccessToken(result.user)
    //     console.log("Token ", result.acessToken)
    //     console.log("user", result.user);
    //     login(result.user.email, result.user.name, result.user.photoUrl)
    //   }
    //   else {
    //     console.log(" Denied");
    //   }

    // } catch (error) {
    //   console.log("errorrr", error)
    // }
  }

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
            // onPress={acessToken ? getUserData : promptAsync}
            onPress={() => promptAsync()}
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
            onPress={() => signInWithAppleAsync()}
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
