import React, { useEffect } from "react";
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
import * as Linking from "expo-linking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import Modal from "react-native-modal";
import { vw, vh } from "react-native-css-vh-vw";
import { Snackbar } from "react-native-paper";
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "utils";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Button, Icon, Input, Text } from "components";
import { Colors } from "style";
import BaseURl from "constant/BaseURL";
import navigationOptions from "./ForgotPwdScreen.navigationOptions";
import styles from "./ForgotPwdScreen.styles";
import imagePath from "../../constant/imagePath";
import axios from "axios";

const ForgotPwdScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const deviceWidth = Dimensions.get("window").width;

  const [email, setEmail] = React.useState("");
  const [confirmationCode, setConfirmationCode] = React.useState("");
  const [modalConfirmCode, setModalConfirmCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageStatus, setMessageStatus] = React.useState(1); // status 1: success, status 0: error

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
    return true;
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const showToast = (message: string, status: number) => {
    setMessage(message);
    setMessageStatus(status);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 2000);
  };
  const forgetPwdNew = (navigation) => {
    console.log("fogetpwd");
    navigation.push("ForgotPwdNew", {
      email: email,
      confirmCode: confirmationCode,
    });
  };
  const requestConfirmCode = () => {
    // if (checkValidation()) {
    //   setLoading(true);
    //   Auth.forgotPassword(email)
    //     .then((data) => {
    //       setLoading(false);
    //       console.log(data);
    //       showToast("Check your verficiation code in mailbox", 1);
    //       setModalConfirmCode(true);
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       console.log("error", err);
    //       if (err.name == "UserNotFoundException") {
    //         showToast("The Email account doesn't exist", 0);
    //       }
    //     });
    // }
  };

  const resetPasswordEmail = async () => {
    if (checkValidation() == true) {
      await AsyncStorage.setItem("Email", email);
      const data = {
        email: email,
        link: "myapp://ForgotPwdNew",
      };
      console.log(data);
      await axios
        .post(BaseURl + "auth/resetPasswordEmail", data)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            alert(response.data.message);
            navigation.navigate("ForgotPwdNew");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    // <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>

    // </ImageBackground>
    <ScrollView style={styles.container}>
      <Image source={imagePath["background"]} style={styles.imageBackground} />

      <View style={styles.logoContainer}>
        <Icon name="Logo" width="80" height="80" fill="none" />
        <Image source={imagePath["LogoText"]} style={styles.logoText} />
      </View>
      <View style={styles.bottomContainer}>
      <KeyboardAvoidingView
           
           behavior={Platform.OS === "ios" ? "position" : null}
           keyboardVerticalOffset={Platform.select({ ios: 600, android: 150 })}
           enabled={true}
         >
          <Text.TagTitle style={styles.bottomLine1}>{t("UI_RESET_YOUR_PASSWORD_L")}</Text.TagTitle>
          <Input
            keyboardType="email-address"
            value={email}
            placeholder={t("UI_EMAIL_I")}
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
        </KeyboardAvoidingView>

        <Button.Primary
          fullWidth={true}
          textType={"Primary"}
          onPress={() => resetPasswordEmail()}
          style={{ marginBottom: 24, marginTop: 8 }}
        >
          <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
            {t("UI_RESET_PASSWORD_B")}
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
      {/* Mail Confirm code */}
      <Modal
        isVisible={modalConfirmCode}
        swipeDirection="down"
        onSwipeComplete={() => setModalConfirmCode(false)}
        onRequestClose={() => setModalConfirmCode(false)}
        onBackdropPress={() => setModalConfirmCode(false)}
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
            {t("UI_SENT_CONFIRM_CODE_L")}
          </Text.ModalTitle>
          <View style={{ width: "100%" }}>
            <Input
              value={confirmationCode}
              placeholder={t("UI_ENTER_CONFIRM_CODE_I")}
              onChangeText={(value) => setConfirmationCode(value)}
            />
          </View>

          <Button.Primary
            fullWidth={true}
            textType={"Primary"}
            onPress={() => forgetPwdNew(navigation)}
            style={{ marginBottom: 24, marginTop: 8 }}
          >
            <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
              {t("UI_CONFIRM_B")}
            </Text.TagTitle>
          </Button.Primary>
        </View>
      </Modal>
    </ScrollView>
  );
};

ForgotPwdScreen.navigationOptions = navigationOptions();

export default ForgotPwdScreen;
