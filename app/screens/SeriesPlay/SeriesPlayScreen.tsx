import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  MaterialIcons,
  Feather,
  AntDesign
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import Toast from "react-native-root-toast";

import { vw, vh } from "react-native-css-vh-vw";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import navigationOptions from "./SeriesPlayScreen.navigationOptions";
import styles from "./SeriesPlayScreen.styles";

const SeriesPlayScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const deviceWidth = Dimensions.get("window").width;
  const [seasons, setSeasons] = useState([])
  const [visible, setVisible] = useState(false)
  const [seasonName, setSeasonName] = useState("")

  useEffect(() => {
    getSeasons()
  }, [])

  const getSeasons = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      seriesId: route.params.id
    }
    console.log(data)
    axios.post(BaseURl + 'series/getSeason', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          setSeasons(resposeJson.data.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const createSeason = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      seriesId: route.params.id,
      seasonName: seasonName
    }
    console.log(data)
    axios.post(BaseURl + 'series/createSeason', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show("Season created successfully.", { duration: Toast.durations.LONG, })
          setVisible(false)
          setSeasonName('')
          getSeasons()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteSeason = async (seasonId) => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      seriesId: route.params.id,
      seasonId: seasonId
    }
    console.log(data)
    axios.post(BaseURl + 'series/deleteSeason', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show(resposeJson.data.message, { duration: Toast.durations.LONG, })
          getSeasons()
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <AntDesign name="plus" color={Colors.blue} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextGroup}>
            <Text.Header>{"Screenplay"}</Text.Header>
          </View>
        </View>
        <View style={styles.chapterInfo}>
          <Text.ModalTitle style={{ fontWeight: "600", marginBottom: 16 }}>
            {route.params.title} Series
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
          {seasons.map((season, index) => (
            <ScrollView key={index} horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.navigationBtn, styles.castInfo]}
                onPress={() => navigator.openSeriesSeasonScreen(
                  {
                    seriesId: route.params.id,
                    seasonId: season.id,
                    seasonName: season.seasonName
                  }
                )}
              >
                <View style={styles.buttonContainer}>
                  <Text.Primary>{season.seasonName}</Text.Primary>
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
                <TouchableOpacity onPress={() => deleteSeason(season.id)}>
                  <View style={[styles.editCastBtn, { backgroundColor: "rgba(255, 69, 58, 1)" }]}>
                    <Feather name="trash-2" size={18} color={Colors.white} />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ))}
        </ScrollView>
      </View>
      <Modal
        isVisible={visible}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              paddingVertical: 25,
              alignItems: "flex-start",
              marginHorizontal: 16,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          ]}
        >
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text.ParagraphTitle style={{ marginBottom: 25 }}>Create Season</Text.ParagraphTitle>
            <TextInput
              value={seasonName}
              placeholder={"Enter Season Name"}
              placeholderTextColor='#fff'
              onChangeText={(value) => setSeasonName(value)}
              style={styles.input}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignContent: "space-between",
            }}
          >
            <View style={{ width: (vw(100) - 64) / 2 - 8, marginRight: 16 }}>
              <Button.Primary
                onPress={() => createSeason()}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Save"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setVisible(false)}
                textType={"Primary"}
                style={{
                  alignItems: "center",
                  height: 40,
                  paddingVertical: 12,
                  borderWidth: 0,
                  backgroundColor: Colors.btnBack,
                }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Cancel"}</Text.Primary>
              </Button.Black>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

SeriesPlayScreen.navigationOptions = navigationOptions();

export default SeriesPlayScreen;
