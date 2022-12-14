import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { color } from "@storybook/addon-knobs";
import SwitchToggle from "react-native-switch-toggle";
import { vw, vh } from "react-native-css-vh-vw";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagePath from "../../constant/imagePath";
import navigationOptions from "./SeriesListScreen.navigationOptions";
import styles from "./SeriesListScreen.styles";

const SeriesListScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [seriesData, setSeriesData] = useState([]);

  const movies = [
    {
      movieId: 1,
      movieTitle: "John Wick Series...",
      movieCategory: "Action, Crime, Thriller",
      movieRate: 30,
      movieThumb: "seriesThumb",
    },
    {
      movieId: 2,
      movieTitle: "John Wick Series...",
      movieCategory: "Action, Crime, Thriller",
      movieRate: 30,
      movieThumb: "thumb2",
    },
    {
      movieId: 3,
      movieTitle: "John Wick Series...",
      movieCategory: "Action, Crime, Thriller",
      movieRate: 30,
      movieThumb: "thumb3",
    },
    {
      movieId: 4,
      movieTitle: "John Wick Series...",
      movieCategory: "Action, Crime, Thriller",
      movieRate: 30,
      movieThumb: "thumb4",
    },
    {
      movieId: 5,
      movieTitle: "John Wick Series...",
      movieCategory: "Action, Crime, Thriller",
      movieRate: 30,
      movieThumb: "thumb5",
    },
    {
      movieId: 6,
      movieTitle: "John Wick Series...",
      movieCategory: "Action, Crime, Thriller",
      movieRate: 30,
      movieThumb: "thumb6",
    },
  ];

  const filterList = (list) => {
    return list.filter((listItem) =>
      listItem.movieTitle.toLowerCase().includes(search.toLowerCase())
    );
  };

  const [search, setSearch] = React.useState("");

  //header scroll styling
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0;
  const maxHeaderHeight = 70;
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 500],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: "clamp",
  });
  const headerPositionX = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, (50 * vw(100)) / 100],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });
  const headerPositionY = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, -50],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });
  const buttonPositionY = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [20, -30],
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
    seriesDetails();
    navigation.addListener("focus", () => {
      seriesDetails();
    });
  }, []);

  //get series
  const seriesDetails = async () => {
    const token = await AsyncStorage.getItem("authToken");

    fetch(BaseURl + "series/seriesDetails", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.code === 200) {
          setSeriesData(responseJson.data);
          console.log(responseJson.data, "====");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchText = (e) => {
    let text = e.toLowerCase();
    let trucks = seriesData;
    let filteredName = trucks.filter((item) => {
      return !item.title || item.title === "" ? null : item.title.toLowerCase().match(text);
    });
    if (!text || text === "") {
      seriesDetails();
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      console.log("no data");
    } else if (Array.isArray(filteredName)) {
      setSeriesData(filteredName);
    }
  };

  return (
    <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
      <View style={styles.container}>
        <Animated.View
          style={{ width: "100%", marginTop: 70, marginBottom: 10, height: headerHeight }}
        >
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                {"Series"}
              </Animated.Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ translateY: buttonPositionY }] }}>
              <TouchableOpacity onPress={() => navigator.openNewSeries()}>
                <AntDesign
                  name="plus"
                  size={20}
                  color={Colors.blue}
                  style={{ textAlignVertical: "center", lineHeight: Font.FontLineHeight.Header }}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.ScrollView
          contentInsetAdjustmentBehavior="automatic"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
            useNativeDriver: false,
          })}
        >
          <TextInput
            style={styles.searchBar}
            placeholder={"Search..."}
            onChangeText={(e) => searchText(e)}
            placeholderTextColor={Colors.white1}
          />
          <View style={styles.movieListContainer}>
            {/* {filterList(movies).map((listItem, index) => ( */}
            {seriesData.map((item, index) => (
              <TouchableOpacity
                style={styles.movieItem}
                key={index}
                onPress={() => navigator.openSeriesDetail({ id: item._id })}
              >
                <Image source={{ uri: item.seriesBanner }} style={styles.thumbImage} />
                <Text.ModalTitle style={{ lineHeight: 24, fontWeight: "700" }}>
                  {item.title}
                </Text.ModalTitle>
                <Text.Tertiary
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ lineHeight: 24, fontWeight: "400", opacity: 0.8, textAlign: "left" }}
                >
                  {item.genres.map((genre) => Object.keys(genre)).toString()}
                  {/* {Object.keys(item.genres).toString().substring(0, 22)} */}
                </Text.Tertiary>
                <LinearGradient
                  style={styles.movieRate}
                  colors={[Colors.GradLeft, Colors.GradRight]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                >
                  <Text.Primary>{"20"}</Text.Primary>
                  <Text.Primary
                    style={{
                      fontSize: 10,
                      marginLeft: 3,
                      textAlignVertical: "bottom",
                      paddingBottom: 0,
                      lineHeight: 16,
                    }}
                  >
                    {"%"}
                  </Text.Primary>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
    </ImageBackground>
  );
};

SeriesListScreen.navigationOptions = navigationOptions();

export default SeriesListScreen;
