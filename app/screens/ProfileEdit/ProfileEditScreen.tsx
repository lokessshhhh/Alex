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
} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import Modal from "react-native-modal";
import { vw, vh } from "react-native-css-vh-vw";
import { API, Auth } from "aws-amplify";
import Storage from "@aws-amplify/storage";
import { Gravatar, GravatarApi } from "react-native-gravatar";
import UserAvatar from "react-native-user-avatar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { color } from "@storybook/addon-knobs";
import SwitchToggle from "react-native-switch-toggle";
import { useSelector } from "react-redux";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

// import { Users } from "../../../models";
import imagePath from "../../constant/imagePath";
import navigationOptions from "./ProfileEditScreen.navigationOptions";
import styles from "./ProfileEditScreen.styles";
//graphql
import * as queries from "../../../src/graphql/queries";
import * as mutations from "../../../src/graphql/mutations";
import * as subscriptions from "../../../src/graphql/subscriptions";



import BaseURl from "constant/BaseURL";

const ProfileEditScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const deviceWidth = Dimensions.get("window").width;

  //main state
  const [emailAdd, setEmail] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [oldPwd, setOldPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [isOnNotification, setIsOnNotification] = useState(true);
  const [registeredInfo, setRegisteredInfo] = useState(null);
  const [avatar, setAvatar] = useState(null);

  //etc state
  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageStatus, setMessageStatus] = React.useState(1); // status 1: success, status 0: error
  const [loading, setLoading] = React.useState(false);
  const [percentage, setPercentage] = useState(0);

  //modal state
  const [imgChooseModal, setImgChooseModal] = React.useState(false);

  //redux
  const { userInfo } = useSelector((state) => state.saveUserReducer);


  useEffect(() => {

    setGetAllUser()

  }, [])


  useEffect(() => {
    (async () => {
      if (Platform.OS == "ios") {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraRollStatus.status !== "granted" || cameraStatus.status !== "granted") {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
      const user = await getUserByMail();
      if (!user) {
        //not registered yet to db
        setUserName(userInfo.preferred_username ? userInfo.preferred_username : userInfo.name);
      } else {
        setRegisteredInfo(user);
        if (user.avatar != null) {
          setAvatar(user.avatar);
        } else {
          setAvatar(null);
        }
        if (user.username != null) {
          setUserName(user.username);
        }
      }
    })();
  }, []);

  const setGetAllUser = async () => {
    const token = await AsyncStorage.getItem('authToken')
    console.log("Toooo", token)


    axios.get(BaseURl + "userDetails", {
      headers: {
        "Authorization": `Bearer ${token}`

      }
    })
      .then((response) => {
        console.log("emailreser:", response.data.data.email)
        setUserName(response.data.data.userName)
        setEmail(response.data.data.email)

        // alert('sucess')
      })
      .catch((error) => {
        console.log("error in profile :", error)
        alert(error)

      })

  };

  const editProfile = async () => {

    var profileData = new FormData();
    // profileData.append('profileImage', 'Fred');
    profileData.append('name', userName);
    profileData.append('currentPassword', oldPwd);
    profileData.append('newPassword', newPwd);

    const token = await AsyncStorage.getItem('authToken')
    console.log("Toooo", token)


    axios.get(BaseURl + "userDetails", {
      headers: {
        "Authorization": `Bearer ${token}`

      }
    })
      .then((response) => {
        console.log("emailreser:", response.data.data.email)
        setUserName(response.data.data.userName)
        setEmail(response.data.data.email)

        alert('sucess EditProfile')
      })
      .catch((error) => {
        console.log("error in profile :", error)
        alert(error)

      })

  };

  const saveProfile = async () => {
    // setLoading(true);

    if (registeredInfo) {
      console.log("user exists");
      if (userName.length < 5 || userName.length > 32) {
        showToast("Username Length should be between 5 and 32", 0);
        return;
      }
      const userDetails = {
        id: registeredInfo.id,
        username: userName,
        avatar: avatar,
      };
      const updateUser = await API.graphql({
        query: mutations.updateUser,
        variables: { input: userDetails },
      });
    } else {
      console.log("user doesn't exist");
      if (userName.length < 5 || userName.length > 32) {
        showToast("Username Length should be between 5 and 32", 0);
        return;
      }
      // const userDetails = {
      //   email: userInfo.email,
      //   username: userName,
      //   avatar: avatar,
      // };
      // const newUser = await API.graphql({
      //   query: mutations.createUser,
      //   variables: { input: userDetails },
      // });
    }
    //if password fields are full, change the password
    if (oldPwd != "" && newPwd != "" && confirmPwd != "") {
      console.log("change pwd");
      if (oldPwd.length < 8 || newPwd.length < 8 || confirmPwd.length < 8) {
        if (oldPwd.length < 8) {
          showToast("Check your old password again. It should be over 8 letters", 0);
          return;
        }
        if (newPwd.length < 8) {
          showToast("Check your new password again. It should be over 8 letters", 0);
          return;
        }
        if (confirmPwd.length < 8) {
          showToast("Check your confirm password again. It should be over 8 letters", 0);
          return;
        }
      }
      if (newPwd != confirmPwd) {
        showToast("Confirm your password again", 0);
        return;
      }

      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, oldPwd, newPwd);
        })
        .then((data) => {
          setLoading(false);
          showToast("Password changed successfully", 1);
          setOldPwd("");
          setNewPwd("");
          setConfirmPwd("");
        })
        .catch((err) => {
          setLoading(false);
          if (err.name == "NotAuthorizedException") {
            showToast("Confirm your current password.", 0);
          }
          if (err.name == "LimitExceededException") {
            showToast("Attempt limit exceeded, please try after some time.", 0);
          }
          console.log(err);
        });
    } else {
      console.log("here");
      setLoading(false);
    }

    // navigator.goBack();
  };

  const getUserByMail = async () => {
    const filter = {
      email: {
        eq: userInfo.email,
      },
    };
    const currentUser = await API.graphql({
      query: queries.listUsers,
      variables: { filter: filter },
    });
    const users = currentUser.data.listUsers.items;
    if (users.length > 0) {
      return users[0];
    } else {
      return false;
    }
  };

  const onNewFocus = () => {
    if (oldPwd.length < 8) {
      showToast("Confirm your old Password", 0);
      setNewPwd("");
      return;
    }
  };

  const onConfirmFocus = () => {
    if (oldPwd.length < 8) {
      showToast("Confirm your old Password", 0);
      setNewPwd("");
      return;
    }
    if (newPwd.length < 8) {
      showToast("Confirm your new Password", 0);
      setConfirmPwd("");
      return;
    }
  };

  const showToast = (message: string, status: number) => {
    setMessage(message);
    setMessageStatus(status);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 2000);
  };

  //Image Upload by camera and local storage

  const fromGallery = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    setImgChooseModal(false);
    handleImagePicked(result);
    console.log("resulltwdw", result)
    setUserProfile(result.uri)
  };

  const fromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
    });
    setImgChooseModal(false);
    handleImagePicked(result);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelled");
        return;
      } else {
        setLoading(true);
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        console.log("img", JSON.stringify(img));
        const uploadUrl = await uploadImage("avatars/" + ".png", img);
        console.log("uriiiiii", uploadUrl);
        downloadImage(uploadUrl);
      }
    } catch (e) {
      console.log("efhu", e);
      alert("Upload failed");
    }
  };
  const uploadImage = (filename, img) => {
    Auth.currentCredentials();

    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        console.log(progress);
        setLoading_upload(progress);
      },
    })
      .then((response) => {
        console.log(response);
        setLoading(false);
        return response.key;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        return error.response;
      });
  };

  const setLoading_upload = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated); // due to s3 put function scoped
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  const downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setAvatar(result))
      .catch((err) => console.log(err));
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
  if (registeredInfo != null)
    return (
      <ScrollView style={styles.container}>
        <Image source={imagePath["background"]} style={styles.imageBackground} />

        <Snackbar
          visible={snackBarVisiable}
          onDismiss={() => setSnackBarVisible(false)}
          style={{
            backgroundColor:
              messageStatus == 1 ? "rgba(29, 174, 255, 0.5)" : "rgba(231, 76, 60, 0.5)",
            borderRadius: 16,
            marginHorizontal: 16,
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
        <View
          style={{
            position: "absolute",
            paddingHorizontal: 16,
            width: "100%",
            marginTop: 60,
          }}
        >
          <TouchableOpacity onPress={() => navigator.goBack()} style={[styles.goBack]}>
            <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
          </TouchableOpacity>
          <Text.Header style={{ marginBottom: 26 }}>{"Edit Profile"}</Text.Header>
          <View style={styles.avatarEdit}>
            {avatar != null && <Image source={{ uri: userProfile }} style={styles.avatar} />}
            {/* {avatar == null && userInfo.email.search("@gmail") != -1 && ( */}
            {avatar == null && (

              <Gravatar
                options={{
                  email: userInfo.email,
                  parameters: { size: "200", d: "mm" },
                  secure: true,
                }}
                style={styles.avatar}
              />
            )}
            {/* )} */}
            {/* {avatar == null && userInfo.email.search("@gmail") == -1 && ( */}
            {avatar == null && userInfo.email.search("@gmail") == -1 && (

              <UserAvatar size={80} name={userInfo.preferred_username} style={styles.avatar} />
            )}

            {/* )} */}
            <TouchableOpacity style={{ marginTop: -50 }} onPress={() => setImgChooseModal(true)}>
              <AntDesign name="camera" size={30} color={Colors.blue} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <Input
              value={userName}
              placeholder={"First Name"}
              onChangeText={(value) => setUserName(value)}
            />
            <Input
              value={userName}
              placeholder={"Last Name"}
              onChangeText={(value) => setUserName(value)}
            />


            <Input value={emailAdd} placeholder={"E-mail"}
              editable={false}
            />
            <Input
              value={oldPwd}
              placeholder={"Old Password"}
              type="password"
              onChangeText={(value) => setOldPwd(value)}
            />
            <Input
              value={newPwd}
              placeholder={"New Password"}
              type="password"
              onChangeText={(value) => setNewPwd(value)}
              onFocus={() => onNewFocus()}
            />
            <Input
              value={confirmPwd}
              placeholder={"Confirm New Password"}
              type="password"
              onChangeText={(value) => setConfirmPwd(value)}
              onFocus={() => onConfirmFocus()}
            />
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 30, paddingHorizontal: 16, width: "100%" }}>
          {/* <Button.Primary fullWidth={true} textType={"Primary"} onPress={() => saveProfile()}> */}
          <Button.Primary fullWidth={true} textType={"Primary"} onPress={() => {
            saveProfile()
            // editProfile()
            // setGetAllUser()
          }
          }>

            <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
              {"Save Profile"}
            </Text.TagTitle>
          </Button.Primary>
        </View>
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0)"
          source={require("../../../assets/loader.json")}
          animationStyle={{ width: 100, height: 100, top: -20 }}
          speed={1}
        />

        {/* ImageChoose Modal */}
        <Modal
          isVisible={imgChooseModal}
          swipeDirection="down"
          onSwipeComplete={() => setImgChooseModal(false)}
          onRequestClose={() => setImgChooseModal(false)}
          onBackdropPress={() => setImgChooseModal(false)}
          deviceWidth={deviceWidth}
          style={{ width: "100%", marginLeft: 0, marginBottom: 0 }}
        >
          <View
            style={[
              styles.modalContainer,
              {
                paddingVertical: 24,
                alignItems: "flex-start",
                marginHorizontal: 16,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              },
            ]}
          >
            <Text.ModalTitle style={{ marginBottom: 25, textAlign: "left" }}>
              {"Select to pick image."}
            </Text.ModalTitle>
            <View style={styles.imageChooseMethods}>
              <TouchableOpacity style={styles.imageChooseMethod} onPress={() => fromGallery()}>
                <Ionicons
                  name={"image"}
                  size={70}
                  color={Colors.blue}
                  style={{ textAlign: "center" }}
                />
                <Text.Tertiary style={{ textAlign: "center" }}>{"Gallery"}</Text.Tertiary>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageChooseMethod} onPress={() => fromCamera()}>
                <AntDesign
                  name="camera"
                  style={{ textAlign: "center" }}
                  size={70}
                  color={Colors.blue}
                />
                <Text.Tertiary style={{ textAlign: "center" }}>{"Camera"}</Text.Tertiary>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  else
    return (
      <ScrollView style={styles.container}>
        <Image source={imagePath["background"]} style={styles.imageBackground} />
        <Snackbar
          visible={snackBarVisiable}
          onDismiss={() => setSnackBarVisible(false)}
          style={{
            backgroundColor:
              messageStatus == 1 ? "rgba(29, 174, 255, 0.5)" : "rgba(231, 76, 60, 0.5)",
            borderRadius: 16,
            marginHorizontal: 16,
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
        <View
          style={{
            position: "absolute",
            paddingHorizontal: 16,
            width: "100%",
            marginTop: 60,
          }}
        >
          <TouchableOpacity onPress={() => navigator.goBack()} style={[styles.goBack]}>
            <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
          </TouchableOpacity>
          <Text.Header style={{ marginBottom: 26 }}>{"Edit Profile"}</Text.Header>
          <View style={styles.avatarEdit}>
            {/* {userInfo.email.search("@gmail") != -1 ? ( // if mail is gmail returns gravatar
              <Gravatar
                options={{
                  email: userInfo.email,
                  parameters: { size: "200", d: "mm" },
                  secure: true,
                }}
                style={styles.avatar}
              /> */}
            {/* // ) : ( */}
            <UserAvatar size={80} name={userInfo.preferred_username} style={styles.avatar} />
            {/* )} */}
            <TouchableOpacity style={{ marginTop: -50 }} onPress={() => setImgChooseModal(true)}>
              <AntDesign name="camera" size={30} color={Colors.blue} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <Input
              value={userName}
              placeholder={"First Name"}
              onChangeText={(value) => setUserName(value)}
            />
            <Input
              value={userName}
              placeholder={"Last Name"}
              onChangeText={(value) => setUserName(value)}
            />

            <Input value={emailAdd} placeholder={"E-mail"}
              editable={false}
            />
            <Input
              value={oldPwd}
              placeholder={"Old Password"}
              type="password"
              onChangeText={(value) => setOldPwd(value)}
            />
            <Input
              value={newPwd}
              placeholder={"New Password"}
              type="password"
              onChangeText={(value) => setNewPwd(value)}
              onFocus={() => onNewFocus()}
            />
            <Input
              value={confirmPwd}
              placeholder={"Confirm New Password"}
              type="password"
              onChangeText={(value) => setConfirmPwd(value)}
              onFocus={() => onConfirmFocus()}
            />
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 30, paddingHorizontal: 16, width: "100%" }}>
          {/* <Button.Primary fullWidth={true} textType={"Primary"} onPress={() => saveProfile()}> */}
          <Button.Primary fullWidth={true} textType={"Primary"} onPress={() => {
            saveProfile()
            // editProfile()
          }}>

            <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
              {"Save Profile"}
            </Text.TagTitle>
          </Button.Primary>
        </View>
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0)"
          source={require("../../../assets/loader.json")}
          animationStyle={{ width: 100, height: 100, top: -20 }}
          speed={1}
        />

        {/* ImageChoose Modal */}
        <Modal
          isVisible={imgChooseModal}
          swipeDirection="down"
          onSwipeComplete={() => setImgChooseModal(false)}
          onRequestClose={() => setImgChooseModal(false)}
          onBackdropPress={() => setImgChooseModal(false)}
          deviceWidth={deviceWidth}
          style={{ width: "100%", marginLeft: 0, marginBottom: 0 }}
        >
          <View
            style={[
              styles.modalContainer,
              {
                paddingVertical: 24,
                alignItems: "flex-start",
                marginHorizontal: 16,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              },
            ]}
          >
            <Text.ModalTitle style={{ marginBottom: 25, textAlign: "left" }}>
              {"Select to pick image."}
            </Text.ModalTitle>
            <View style={styles.imageChooseMethods}>
              <TouchableOpacity style={styles.imageChooseMethod} onPress={() => fromGallery()}>
                <Ionicons
                  name={"image"}
                  size={70}
                  color={Colors.blue}
                  style={{ textAlign: "center" }}
                />
                <Text.Tertiary style={{ textAlign: "center" }}>{"Gallery"}</Text.Tertiary>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageChooseMethod} onPress={() => fromCamera()}>
                <AntDesign
                  name="camera"
                  style={{ textAlign: "center" }}
                  size={70}
                  color={Colors.blue}
                />
                <Text.Tertiary style={{ textAlign: "center" }}>{"Camera"}</Text.Tertiary>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
};

ProfileEditScreen.navigationOptions = navigationOptions();

export default ProfileEditScreen;
