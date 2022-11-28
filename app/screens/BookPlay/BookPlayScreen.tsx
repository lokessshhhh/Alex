import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-root-toast";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { vw, vh } from "react-native-css-vh-vw";
import { GradientCircularProgress } from "react-native-circular-gradient-progress";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./BookPlayScreen.navigationOptions";
import styles from "./BookPlayScreen.styles";
import imagePath from "../../constant/imagePath";

const BookPlayScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const deviceWidth = Dimensions.get("window").width;
  const [menuScript, setMenuScript] = useState([])

  useEffect(() => {
    getActs()
  }, [])

  const getActs = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      bookId: route.params.id
    }
    axios.post(BaseURl + 'books/getActs', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          setMenuScript(resposeJson.data.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const createAct = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      bookId: route.params.id
    }
    console.log(data)
    axios.post(BaseURl + 'books/createAct', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show("Act added successfully.", { duration: Toast.durations.LONG, })
          getActs()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteAct = async (actId) => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      bookId: route.params.id,
      actId: actId
    }
    console.log(data)
    axios.post(BaseURl + 'books/deleteAct', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show(resposeJson.data.message, { duration: Toast.durations.LONG, })
          getActs()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={{ backgroundColor: Colors.GradTop }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => createAct()}>
              <AntDesign name="plus" color={Colors.blue} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextGroup}>
            <Text.Header>{"Manuscript"}</Text.Header>
          </View>
        </View>
        <View style={styles.chapterInfo}>
          <Text.ModalTitle style={{ fontWeight: "600", marginBottom: 16 }}>
            {route.params.title}
          </Text.ModalTitle>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{ display: "flex", flexDirection: "column", width: "50%", paddingRight: 10 }}
            >
              <Text.Tertiary style={{ marginBottom: 8 }}>{"Start Date:"}</Text.Tertiary>
              <Text.ModalTitle style={{ fontWeight: "600" }}>{"Jul 10, 2019"}</Text.ModalTitle>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", width: "50%", paddingRight: 10 }}
            >
              <Text.Tertiary style={{ marginBottom: 8 }}>{"Last Update:"}</Text.Tertiary>
              <Text.ModalTitle style={{ fontWeight: "600" }}>{"Aug 06, 2021"}</Text.ModalTitle>
            </View>
          </View>
        </View>
        <ScrollView>
          {menuScript.map((manuscript, index) => (
            <ScrollView key={index} horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.navigationBtn, styles.castInfo]}
                onPress={() => navigator.openBookActScreen(
                  {
                    id: route.params.id,
                    actId: manuscript.id,
                    actName: manuscript.name
                  }
                )}
                key={index}
              >
                <View style={styles.buttonContainer}>
                  <Text.Primary>{manuscript.name}</Text.Primary>
                  <View style={styles.btnLeft}>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      style={{ textAlignVertical: "center" }}
                      color={Colors.white}
                      size={14}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => deleteAct(manuscript.id)}>
                  <View style={[styles.editCastBtn, { backgroundColor: "rgba(255, 69, 58, 1)" }]}>
                    <Feather name="trash-2" size={18} color={Colors.white} />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

BookPlayScreen.navigationOptions = navigationOptions();

export default BookPlayScreen;
