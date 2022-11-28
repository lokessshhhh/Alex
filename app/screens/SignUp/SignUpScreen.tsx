import React from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import Modal from "react-native-modal";
import { vw, vh } from "react-native-css-vh-vw";
import { Snackbar } from "react-native-paper";
import AnimatedLoader from "react-native-animated-loader";
import fetch from "fetch";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Button, Icon, Input, Text } from "components";
import { Colors } from "style";
import { t } from "utils";
import axios from "axios";

import navigationOptions from "./SignUpScreen.navigationOptions";
import styles from "./SignUpScreen.styles";
import imagePath from "../../constant/imagePath";
import BaseURl from "constant/BaseURL";
import { colors } from "react-native-elements";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useHeaderHeight } from "react-navigation/stack";
const SignUpScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const deviceWidth = Dimensions.get("window").width;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpwd, setConfirmpwd] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [ema, setEma] = React.useState("");

  const [confirmationCode, setConfirmationCode] = React.useState("");
  const [modalConfirmCode, setModalConfirmCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageStatus, setMessageStatus] = React.useState(1); // status 1: success, status 0: error

  // Auth.signUp({
  //   username: email,
  //   password: password,
  //   attributes: {
  //     email: email,
  //     preferred_username: username,
  //   },
  // })


  const deleteUser = () => {
    axios.post(BaseURl + 'auth/modelClose/' + email)
    .then((response)=> {
      console.log(response.data.message,'=res=');
    })
    .catch((err)=>{
      console.log(err,'=errr=');
    })
  }

  const signUp = () => {
    if (checkValidation() == true) {
      setLoading(true);
      console.log(BaseURl);
      axios
        .post(BaseURl + "auth/register", {
          email: email,
          userName: username,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          console.log("successful sign up!", response);
          showToast("Check your verficiation code in mailbox", 1);
          setEma(email);
          setModalConfirmCode(true);
        })
        .catch((err) => {
          if (err.response.data.code === 409) {
            showToast("Email Already Exists", 0);
            setLoading(false);
            return false;
          }
          setLoading(false);
          console.log("error signing up!: ", err.response.data);
        });
    }
  };

  const confirmSignUp = () => {
    if (confirmationCode.length != 4) {
      showToast("Please Enter Valid Data", 0);
      return;
    }
    setLoading(true);
    const verifyData = {
      email: ema,
      otp: confirmationCode,
    };

    axios
      .post(BaseURl + "auth/verifyotp", verifyData)
      .then((response) => {
        if (response.data.code === 200) {
          showToast("OTP Verified Succesfully!", 0);
          alert("OTP Verified Succesfully!");
          setLoading(false);
          console.log("loginResponse------->", response.data);
          setModalConfirmCode(false);
          navigator.openSignIn();
          return;
        }
      })
      .catch((err) => {
        if (err) {
          showToast(err.response.data.message, 0);
          setLoading(false);
          console.log("err : ", err.response.data);
          return;
        }
        
        // if (err.response.data.code === 400) {
        //   showToast("Otp You Entered Is Wrong!", 0);
        //   setLoading(false);
        //   console.log("err : ", err.response.data);
        //   return;
        // }
      });
  };

  const showToast = (message: string, status: number) => {
    setMessage(message);
    setMessageStatus(status);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 2000);
  };

  const checkValidation = () => {
    if (!username || username.length < 5 || username.length > 32) {
      if (!username) {
        showToast("Username Field is required", 0);
        return false;
      }
      if (username.length < 5 || username.length > 32) {
        showToast("Username Length should be between 5 and 32", 0);
        return false;
      }
    }
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
    if (!confirmpwd || confirmpwd != password) {
      if (!confirmpwd) {
        showToast("Confirm Password Field is required", 0);
        return false;
      }
      if (confirmpwd != password) {
        showToast("Password does not match", 0);
        return false;
      }
    }
    return true;
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Image source={imagePath["background"]} style={styles.imageBackground} />
        <View style={[styles.logoContainer, { position: "absolute", top: vh(10) }]}>
          <Icon name="Logo" width="80" height="80" fill="none" />
          <Image source={imagePath["LogoText"]} style={styles.logoText} />
        </View>
        <View style={styles.bottomContainer}>
          <KeyboardAvoidingView
           
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={Platform.select({ ios: 400, android: 150 })}
            enabled={true}
          >
            <Text.TagTitle style={styles.bottomLine1}>{"Create your Account"}</Text.TagTitle>

            <Input
              value={username}
              placeholder={t("UI_USERNAME_I")}
              onChangeText={(value) => {
                setUsername(value);
              }}
            />
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
            <Input
              value={confirmpwd}
              placeholder={t("UI_CONFIRM_PASSWORD_I")}
              type="password"
              onChangeText={(value) => {
                setConfirmpwd(value);
              }}
            />
          </KeyboardAvoidingView>
          <Button.Primary
            fullWidth={true}
            textType={"Primary"}
            onPress={() => signUp()}
            style={{ marginBottom: 24, marginTop: 8 }}
          >
            <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
              {t("UI_REGISTER_B")}
            </Text.TagTitle>
          </Button.Primary>

          <TouchableOpacity
            onPress={() => navigator.openSignInOther()}
            style={[styles.transparentBtnContainer, { alignSelf: "center" }]}
          >
            <Text.Tertiary style={styles.transparentBtn}>{t("UI_LOGIN_OPTIONS_B")}</Text.Tertiary>
          </TouchableOpacity>
          <View style={styles.loginBtnContainer}>
            <Text.Tertiary style={{ marginRight: 16 }}>
              {t("UI_ALREADY_HAVE_ACCOUNT_L")}
            </Text.Tertiary>
            <TouchableOpacity
              onPress={() => navigator.openSignIn()}
              style={[styles.transparentBtnContainer]}
            >
              <Text.Tertiary style={styles.transparentBtn}>{t("UI_LOGIN_B")}</Text.Tertiary>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={snackBarVisiable}
          onDismiss={() => setSnackBarVisible(false)}
          style={{
            width: vw(100) - 16,
            backgroundColor:
              messageStatus == 1 ? "rgba(29, 174, 255, 0.5)" : "rgba(231, 76, 60, 0.5)",
            borderRadius: 16,
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

      {/* Mail Confirm code */}
      <Modal
        isVisible={modalConfirmCode}
        swipeDirection="down"
        onSwipeComplete={() => {
          setModalConfirmCode(false),
          deleteUser();
        }}
        onRequestClose={() => {
          setModalConfirmCode(false),
          deleteUser();
        }}
        onBackdropPress={() => {
          setModalConfirmCode(false),
          deleteUser();
        }}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: -50 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              paddingTop: 24,
              alignItems: "flex-start",
              marginHorizontal: 16,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          ]}
        >
          <Text.ModalTitle style={{ marginBottom: 16 }}>
            {"We sent a confirmation code to your email"}
          </Text.ModalTitle>
          <View style={{ width: "100%" }}>
            <Input
              value={confirmationCode}
              placeholder={"Enter confirm code please."}
              onChangeText={(value) => setConfirmationCode(value)}
            />
          </View>

          <Button.Primary
            fullWidth={true}
            textType={"Primary"}
            onPress={() => confirmSignUp()}
            style={{ marginBottom: 24, marginTop: 8 }}
          >
            <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
              {"Confirm"}
            </Text.TagTitle>
          </Button.Primary>
        </View>
      </Modal>
    </>
  );
};

SignUpScreen.navigationOptions = navigationOptions();

export default SignUpScreen;
