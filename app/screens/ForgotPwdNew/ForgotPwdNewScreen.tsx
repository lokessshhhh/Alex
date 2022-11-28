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
  LogBox
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import AnimatedLoader from "react-native-animated-loader";
import { Snackbar } from "react-native-paper";
import { vw, vh } from "react-native-css-vh-vw";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Button, Icon, Input, Text } from "components";
import { Colors } from "style";
import axios from "axios";
import { useEffect } from "react";
import BaseURl from "constant/BaseURL";
import navigationOptions from "./ForgotPwdNewScreen.navigationOptions";
import styles from "./ForgotPwdNewScreen.styles";
import imagePath from "../../constant/imagePath";
import { platform } from "utils";

const ForgotPwdNewScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const email = route.params?.email;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const confirmCode = route.params?.confirmCode;

  const deviceWidth = Dimensions.get("window").width;

  const [password, setPassword] = React.useState("");
  const [confirmpwd, setConfirmpwd] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [GetMyEmail, SetGetMyEmail] = React.useState("");
  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageStatus, setMessageStatus] = React.useState(1); // status 1: success, status 0: error

  useEffect(() => {
    GetEmail();
    LogBox.ignoreAllLogs()
  }, []);

  const checkValidation = () => {
    if (!password || password.length < 8) {
      if (!password) {
        showToast("New Password Field is required", 0);
        return false;
      }
      if (password.length < 8) {
        showToast("New Password Length should be over 8", 0);
        return false;
      }
    }
    if (!confirmpwd || confirmpwd != password) {
      if (!confirmpwd) {
        showToast("Confirm Password Field is required", 0);
        return false;
      }
      if (confirmpwd != password) {
        showToast("Passowrd Does Not Match", 0);
        return false;
      }
    }
    return true;
  };

  const showToast = (message: string, status: number) => {
    setMessage(message);
    setMessageStatus(status);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 2000);
  };

  const resetPwd = () => {
    if (checkValidation()) {
      setLoading(true);
      resetMyPassword();
      // axios.post("http://44.202.199.4:8000/api/auth/language", {
      //   headers: {
      //     email: email
      //   }
      // })
      //   .then((response) => {
      //     console.log("response :", response)
      //     setLoading(false);
      //     showToast("successful changed Password!", 1);
      //     navigator.openSignIn();
      //   })
      //   .catch((error) => {
      //     console.log("error :", error)
      //   })

      // Auth.forgotPasswordSubmit(email, confirmCode, password)
      //   .then((data) => {
      //     console.log(data);
      //     setLoading(false);
      //     showToast("successful changed Password!", 1);
      //     navigator.openSignIn();
      //   })
      //   .catch((err) => {
      //     console.log("error", err);
      //     setLoading(false);
      //     showToast("Server Connection Error, Please try again later", 0);
      //   });
    }
  };
  const resetMyPassword = async () => {
    // await axios.post('http://localhost:8000/api/auth/resetPassword/test1001.dds@gmail.com', {
    //   newPassword: password,
    // }, {
    //         headers: {
    //             // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzg5MWE4YjI1NWJiMzJiMTQ0MzFjYyIsImVtYWlsIjoidGVzdDEwMDEuZGRzQGdtYWlsLmNvbSIsImlhdCI6MTY2MTUwMzg5MSwiZXhwIjozMzI4MTkxNzgyfQ.ZtV5jLpjdEecZytA5quF3MDJ9yhaTEMkXQFL3lUKx1U`
    //         }
    // })
    // .then(response => {
    //   console.log(response,'=======res======')
    // })
    // .catch(error => {
    //     console.log(error.response,'=====err========')
    // });

    //   const token = await AsyncStorage.getItem('authToken')
    //   await axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/api/auth/resetPassword/test1001.dds@gmail.com',
    //     headers: { 'Authorization': `Bearer ${token}` },
    //     data: {
    //       newPassword: password,
    //     }
    // })
    //     .then((response) => {
    //         alert("Password Change Succesfull")
    //         console.log(response.data,'=====resdata====')
    //         console.log(response.data.message,'=====resdata====')
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         // alert('Not Valid')
    //     })

    const data = {
      newPassword: password,
    };
    console.log(data);
    await axios
      .post(BaseURl + "auth/resetPassword/" + GetMyEmail, data, {})
      .then((response) => {
        console.log(response.data, "=======res========");
        alert("Password Update Successfully!");
        navigation.navigate("SignInScreen");
      })
      .catch((error) => {
        console.log(error, "=========err========");
      });

    //   const token = await AsyncStorage.getItem('authToken')
    //   let data = {newPassword:password}

    //    axios.post(BaseURl + 'auth/resetPassword/test1001.dds@gmail.com', data, {
    //     headers: {
    //       "Authorization": `Bearer ${token}`,
    //     }
    //    })
    //    .then((responseJson) => {
    //       console.log("reactNativeDemo","response get details:"+responseJson);
    //    })
    //    .catch((error) => {
    //       console.log("axios error===:",error);
    //    });

    // //   await axios.post('http://localhost:8000/api/auth/resetPassword/test1001.dds@gmail.com',
    // // {
    // //   newPassword:password,
    // // },{
    // //     "headers": {
    // //       'Content-Type': 'application/json',
    // //       "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzg5MWE4YjI1NWJiMzJiMTQ0MzFjYyIsImVtYWlsIjoidGVzdDEwMDEuZGRzQGdtYWlsLmNvbSIsImlhdCI6MTY2MTUwMzg5MSwiZXhwIjozMzI4MTkxNzgyfQ.ZtV5jLpjdEecZytA5quF3MDJ9yhaTEMkXQFL3lUKx1U',
    // //     }
    // // }).then((response) => {
    // //    console.log("reactNativeDemo","response get details:"+response.data);
    // // })
    // // .catch((error) => {
    // //    console.log("axios error===:",error);
    // // });
  };

  const GetEmail = async () => {
    const value = await AsyncStorage.getItem("Email");
    SetGetMyEmail(value);
    console.log(value, "=========MyResetEmail=========");
    console.log(GetMyEmail, "=========MyResetEmail=========");
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={imagePath["background"]} style={styles.imageBackground} />
      <View style={styles.logoContainer}>
        <Icon name="Logo" width="80" height="80" fill="none" />
        <Image source={imagePath["LogoText"]} style={styles.logoText} />
      </View>
      <View style={styles.bottomContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
          keyboardVerticalOffset={Platform.select({ ios: 550, android: 150 })}
          enabled={true}
        >
          <Text.TagTitle style={styles.bottomLine1}>{"Reset your Password"}</Text.TagTitle>
          <Input
            value={password}
            placeholder={"New Password"}
            type="password"
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
          <Input
            value={confirmpwd}
            placeholder={"Confirm New Password"}
            type="password"
            onChangeText={(value) => {
              setConfirmpwd(value);
            }}
          />
        </KeyboardAvoidingView>
        <Button.Primary
          fullWidth={true}
          textType={"Primary"}
          onPress={() => {
            resetPwd();
          }}
          style={{ marginBottom: 24, marginTop: 8 }}
        >
          <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
            {"Reset Password"}
          </Text.TagTitle>
        </Button.Primary>

        <TouchableOpacity
          onPress={() => navigator.openSignInOther()}
          style={[styles.transparentBtnContainer, { alignSelf: "center" }]}
        >
          <Text.Tertiary style={styles.transparentBtn}>{"Log In Options"}</Text.Tertiary>
        </TouchableOpacity>
        <View style={styles.loginBtnContainer}>
          <Text.Tertiary style={{ marginRight: 16 }}>{"Already have an account?"}</Text.Tertiary>
          <TouchableOpacity
            onPress={() => navigator.openSignIn()}
            style={[styles.transparentBtnContainer]}
          >
            <Text.Tertiary style={styles.transparentBtn}>{"Login"}</Text.Tertiary>
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

ForgotPwdNewScreen.navigationOptions = navigationOptions();

export default ForgotPwdNewScreen;
