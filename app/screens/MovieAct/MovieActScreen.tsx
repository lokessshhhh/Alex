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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { vw, vh } from "react-native-css-vh-vw";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./MovieActScreen.navigationOptions";
import styles from "./MovieActScreen.styles";
import imagePath from "../../constant/imagePath";

const MovieActScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const deviceWidth = Dimensions.get("window").width;
  // const scenes = [
  //   {
  //     title: "Scene 1",
  //     image: "Open Image Pt. 1",
  //     desc:
  //       "Watch Molly's Game yesterday, good movie, just a little too long for me Kevin Costner was excellent, as per usual.",
  //     avatars: [{ imgName: "avatar3" }, { imgName: "avatar2" }],
  //   },
  //   {
  //     title: "Finding a Treasure",
  //     image: "",
  //     desc:
  //       "Watch Molly's Game yesterday, good movie, just a little too long for me Kevin Costner was excellent, as per usual.",
  //     avatars: [{ imgName: "avatar3" }, { imgName: "avatar2" }],
  //   },
  //   {
  //     title: "Scene 3",
  //     image: "Open Image Pt. 3",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 4",
  //     image: "Open Image Pt. 4",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 5",
  //     image: "Open Image Pt. 5",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 6",
  //     image: "Open Image Pt. 6",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 7",
  //     image: "Open Image Pt. 7",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 8",
  //     image: "Open Image Pt. 8",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 9",
  //     image: "Open Image Pt. 9",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  //   {
  //     title: "Scene 10",
  //     image: "Open Image Pt. 10",
  //     desc: "Scene text has not been added yet.",
  //     avatars: [],
  //   },
  // ];
  const [scenes, setScenes] = useState([]);

  //header animation
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 30;
  const maxHeaderHeight = 100;
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 500],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: "clamp",
  });
  const headerPositionX = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, (37 * vw(100)) / 100],
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
      getScreenplayScene()
    })
    getScreenplayScene()
  }, [])

  const getScreenplayScene = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      movieId: route.params.id,
      actId: route.params.actId,
      sceneId: route.params.sceneId,
    }
    console.log(data)
    axios.post(BaseURl + 'movies/getscreenPlayScenes', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          setScenes(resposeJson.data.data)
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
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
          </TouchableOpacity>
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
              {route.params.actName}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          style={{ marginBottom: 50 }}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
            useNativeDriver: false,
          })}
        >
          {scenes.map((scene, index) => (
            <TouchableOpacity
              style={styles.navigationBtn}
              onPress={() => navigator.openMovieSceneScreen(
                {
                  id: route.params.id,
                  actId: route.params.actId,
                  sceneId: scene._id,
                  sceneName: scene.sceneName,
                  sceneDesc: scene.sceneDescription,
                  actors: scene.actors
                }
              )}
              key={index}
            >
              <View style={styles.buttonContainer}>
                <LinearGradient
                  style={styles.gradientNumber}
                  colors={[Colors.GradLeft, Colors.GradRight]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                >
                  <Text.ParagraphTitle
                    style={{ textAlignVertical: "center", lineHeight: 44, textAlign: "center" }}
                  >
                    {index + 1}
                  </Text.ParagraphTitle>
                </LinearGradient>
                <View style={styles.sceneDesc}>
                  <View style={styles.sceneTitle}>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text.ParagraphTitle>{scene.sceneName}</Text.ParagraphTitle>
                      {/* <Text.Tertiary style={{ fontWeight: "800", marginBottom: 11 }}>
                        {scene.image}
                      </Text.Tertiary> */}
                    </View>
                    <View style={styles.btnLeft}>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        style={{ textAlignVertical: "center" }}
                        color={Colors.white}
                        size={14}
                      />
                    </View>
                  </View>
                  <Text.Tertiary style={{ color: Colors.white, marginBottom: 11 }}>
                    {scene.sceneDescription}
                  </Text.Tertiary>
                  {scene.actors.length > 0 ? (
                    <View style={styles.avatars}>
                      {scene.actors.map((avatar, avatar_index) => (
                        <Image
                          source={{ uri: avatar.actorImage }}
                          style={styles.avatar}
                          key={avatar_index}
                        />
                      ))}
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* {scenes.map((scene, index) => (
            <TouchableOpacity
              style={styles.navigationBtn}
              onPress={() => navigator.openMovieSceneScreen(
                {
                  id: route.params.id,
                  actName: route.params.actName,
                  sceneName: scene.title,
                  sceneDes: scene.desc
                }
              )}
              key={index}
            >
              <View style={styles.buttonContainer}>
                <LinearGradient
                  style={styles.gradientNumber}
                  colors={[Colors.GradLeft, Colors.GradRight]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                >
                  <Text.ParagraphTitle
                    style={{ textAlignVertical: "center", lineHeight: 44, textAlign: "center" }}
                  >
                    {index + 1}
                  </Text.ParagraphTitle>
                </LinearGradient>
                <View style={styles.sceneDesc}>
                  <View style={styles.sceneTitle}>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text.ParagraphTitle>{scene.title}</Text.ParagraphTitle>
                      <Text.Tertiary style={{ fontWeight: "800", marginBottom: 11 }}>
                        {scene.image}
                      </Text.Tertiary>
                    </View>
                    <View style={styles.btnLeft}>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        style={{ textAlignVertical: "center" }}
                        color={Colors.white}
                        size={14}
                      />
                    </View>
                  </View>
                  <Text.Tertiary style={{ color: Colors.white, marginBottom: 11 }}>
                    {scene.desc}
                  </Text.Tertiary>
                  {scene.avatars.length > 0 ? (
                    <View style={styles.avatars}>
                      {scene.avatars.map((avatar, avatar_index) => (
                        <Image
                          source={imagePath[avatar.imgName]}
                          style={styles.avatar}
                          key={avatar_index}
                        />
                      ))}
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          ))} */}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

MovieActScreen.navigationOptions = navigationOptions();

export default MovieActScreen;
