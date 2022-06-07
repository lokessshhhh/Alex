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
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Auth, Hub } from "aws-amplify";
import { Snackbar } from "react-native-paper";
import { vw, vh } from "react-native-css-vh-vw";
import AnimatedLoader from "react-native-animated-loader";
import { useSelector, useDispatch } from "react-redux";
import { t } from "utils";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import imagePath from "../../constant/imagePath";
import navigationOptions from "./SignInScreen.navigationOptions";
import styles from "./SignInScreen.styles";
import { signIn } from "../../redux/actions";
import BaseURl from "constant/BaseURL";
import axios from "axios";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignInScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  const deviceWidth = Dimensions.get("window").width;

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageStatus, setMessageStatus] = React.useState(1); // status 1: success, status 0: error

  const [loading, setLoading] = React.useState(false);

  const showToast = (message: string, status: number) => {
    setMessage(message);
    setMessageStatus(status);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 2000);
  };
  useEffect(() => {

  }, [])

  const checkValidation = () => {
    if (!email || !validateEmail(email)) {
      if (!email) {
        showToast("Email Field is required", 0);
        return false;
      }
      if (!validateEmail(email)) {
        showToast("Email is not valid", 0);
        return false;
      }
    }
    if (!password || password.length < 8) {
      if (!password) {
        showToast("Password Field is required", 0);
        return false;
      }
      if (password.length < 8) {
        showToast("Password Length should be over 8", 0);
        return false;
      }
    }
    return true;
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const dispatch = useDispatch();
  const signInDispatch = () => dispatch(signIn());

  // Auth.signIn(email, password)
  //   .then((user) => {
  //     // setLoading(false);
  //     // setUser({ user });
  //     signInDispatch();
  //     console.log("successful sign in!");
  //     navigator.openMainPage();
  //   })

  const signInClick = async () => {
    // navigator.openMainPage()
    setLoading(true);
    const loginData = {
      email: email,
      password: password
    }
    axios
      .post(BaseURl + "auth/login", loginData)
      .then((response) => {
        setLoading(false);
        console.log("loginToken", response.data);
        if (response.status === 200) {
          const storeToken = async () => {
            await AsyncStorage.setItem('authToken', response.data.user.loginToken);
          }
          storeToken()
          alert(response.data.message)
          navigator.openMainPage()
        }
        else {
          alert("User Not Found!")
        }
      })
      .catch((err) => {
        alert("User Not Found!")
        setLoading(false);
        console.log("error please try again", err)
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={imagePath["background"]} style={styles.imageBackground} />
      <View style={styles.logoContainer}>
        <Icon name="Logo" width="80" height="80" fill="none" />
        <Image source={imagePath["LogoText"]} style={styles.logoText} />
      </View>
      <View style={styles.bottomContainer}>
        <Text.TagTitle style={styles.bottomLine1}>{t("UI_SIGN_INTO_YOUR_ACCOUNT_L")}</Text.TagTitle>
        <Input
          value={email}
          placeholder={t("UI_EMAIL_I")}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Input
          value={password}
          placeholder={t("UI_PASSWORD_I")}
          type="password"
          onChangeText={(value) => {
            setPassword(value);
          }}
        />

        <TouchableOpacity
          onPress={() => navigator.openForgotPwd()}
          style={styles.transparentBtnContainer}
        >
          <Text.Tertiary style={styles.transparentBtn}>{t("UI_FORGOT_PASSWORD_B")}</Text.Tertiary>
        </TouchableOpacity>
        <Button.Primary
          fullWidth={true}
          textType={"Primary"}
          onPress={() => signInClick()}
          style={{ marginBottom: 24 }}
        >
          <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
            {t("UI_LOGIN_B")}
          </Text.TagTitle>
        </Button.Primary>

        <TouchableOpacity
          onPress={() => navigator.openSignInOther()}
          style={[styles.transparentBtnContainer, { alignSelf: "center" }]}
        >
          <Text.Tertiary style={styles.transparentBtn}>{t("UI_LOGIN_OPTIONS_B")}</Text.Tertiary>
        </TouchableOpacity>

        <View style={styles.registerBtnContainer}>
          <Text.Tertiary style={{ marginRight: 16 }}>{t("UI_DON_HAVE_ACCOUNT_L")}</Text.Tertiary>
          <TouchableOpacity
            onPress={() => navigator.openSignUp()}
            style={[styles.transparentBtnContainer]}
          >
            <Text.Tertiary style={styles.transparentBtn}>{t("UI_REGISTER_B")}</Text.Tertiary>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={snackBarVisiable}
        onDismiss={() => setSnackBarVisible(false)}
        style={{
          width: "100%",
          backgroundColor:
            messageStatus == 1 ? "rgba(29, 174, 255, 0.5)" : "rgba(231, 76, 60, 0.5)",
          borderRadius: 16,
          marginLeft: 16,
          bottom: vh(10),
        }}
      >
        <AntDesign
          name={messageStatus == 1 ? "checkcircle" : "exclamationcircle"}
          size={20}
          color={messageStatus == 1 ? "rgba(46, 204, 113, 1)" : "rgba(255, 69, 58, 1)"}
          style={{ letterSpacing: 20 }}
        />
        <Text.Primary style={{ marginLeft: 20 }}>{message}</Text.Primary>
      </Snackbar>
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0)"
        source={require("../../../assets/loader.json")}
        animationStyle={{ width: 100, height: 100, top: -20 }}
        speed={1}
      />
    </ScrollView>
  );
};

SignInScreen.navigationOptions = navigationOptions();

export default SignInScreen;
