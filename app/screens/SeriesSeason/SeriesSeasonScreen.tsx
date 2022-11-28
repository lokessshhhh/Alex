import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { vw, vh } from "react-native-css-vh-vw";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button, Accordion } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import navigationOptions from "./SeriesSeasonScreen.navigationOptions";
import styles from "./SeriesSeasonScreen.styles";
import Toast from "react-native-root-toast";


const SeriesSeasonScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const deviceWidth = Dimensions.get("window").width;
  const [episodes, setEpisodes] = useState([])
  const [visible, setVisible] = useState(false)
  const [episodeName, setEpisodeName] = useState("")

  //header animation
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 30;
  const maxHeaderHeight = 100;
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 1000],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: "clamp",
  });

  const headerPositionX = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, (30 * vw(100)) / 100],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });

  const headerPositionY = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, -50],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });
  const fontsize = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [34, 26],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getEpisodes()
    })
    getEpisodes()
  }, [])

  const getEpisodes = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      seriesId: route.params.seriesId,
      seasonId: route.params.seasonId,
    }
    console.log(data)
    axios.post(BaseURl + 'series/getEpisodes', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          setEpisodes(resposeJson.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const createEpisode = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      seriesId: route.params.seriesId,
      seasonId: route.params.seasonId,
      episodeName: episodeName
    }
    console.log(data)
    axios.post(BaseURl + 'series/createEpisode', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show("Episode created successfully.", { duration: Toast.durations.LONG, })
          setVisible(false)
          setEpisodeName('')
          getEpisodes()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={{ backgroundColor: Colors.GradTop }}>
      <View style={styles.container}>
        <Animated.View
          style={{ width: "100%", marginTop: 50, marginBottom: 10, height: headerHeight }}
        >
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <AntDesign name="plus" color={Colors.blue} size={20} />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              transform: [{ translateX: headerPositionX }, { translateY: headerPositionY }],
            }}
          >
            <Animated.Text style={[styles.headerText, { fontSize: fontsize }]}>
              {route.params.seasonName}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          contentInsetAdjustmentBehavior="automatic"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
            useNativeDriver: false,
          })}
        >
          {episodes.map((episode, index) => (
            <Accordion
              key={index}
              title={episode.episodeName}
              data={episode.acts}
              seriesId={route.params.seriesId}
              seasonId={route.params.seasonId}
              episodeId={episode.id}
            />
          ))}
        </Animated.ScrollView>
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
            <Text.ParagraphTitle style={{ marginBottom: 25 }}>Create Episode</Text.ParagraphTitle>
            <TextInput
              value={episodeName}
              placeholder={"Enter Episode Name"}
              placeholderTextColor='#fff'
              onChangeText={(value) => setEpisodeName(value)}
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
                onPress={() => createEpisode()}
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

SeriesSeasonScreen.navigationOptions = navigationOptions();

export default SeriesSeasonScreen;
