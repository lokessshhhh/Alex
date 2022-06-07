import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text } from "components";
import { Colors, Font } from "style";

import imagesPath from "../../constant/imagePath";
import navigationOptions from "./MovieDetailScreen.navigationOptions";
import styles from "./MovieDetailScreen.styles";
import imagePath from "../../constant/imagePath";
import BaseURl from "constant/BaseURL";

const MovieDetailScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute();
  const [movie, setMovie] = useState<any>([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    getSignleMovie()
  }, [])

  useEffect(() => {
    console.log("--------------Movie ", movie);
  }, [movie])
  const genres = [
    { genre: "Comedy" },
    { genre: "Sci-Fi" },
    { genre: "Crime" },
    { genre: "Action" },
  ];
  const dreamcasts = [
    { castName: "Keanu Reeves", realName: "John Wick", avatar: "avatar3" },
    { castName: "Laetitia Casta", realName: "Laetitia Casta", avatar: "avatar2" },
    { castName: "Keanu Reeves", realName: "John Wick", avatar: "avatar3" },
    { castName: "Laetitia Casta", realName: "Laetitia Casta", avatar: "avatar2" },
    { castName: "Keanu Reeves", realName: "John Wick", avatar: "avatar3" },
    { castName: "Laetitia Casta", realName: "Laetitia Casta", avatar: "avatar2" },
  ];
  const tags = [
    { tag: "Comedy" },
    { tag: "Cops" },
    { tag: "Thriller" },
    { tag: "Fantasy" },
    { tag: "Action" },
    { tag: "Romance" },
  ];
  const smiliarMovies = [
    { title: "John Wick1", thumb: "similar1" },
    { title: "John Wick2", thumb: "similar2" },
    { title: "Speed", thumb: "similar3" },
    { title: "Professional", thumb: "similar1" },
    { title: "Speed", thumb: "similar3" },
    { title: "Professional", thumb: "similar1" },
  ];


  const getSignleMovie = async () => {
    setSpinner(true)
    const token = await AsyncStorage.getItem('authToken')

    axios({
      method: 'get',
      url: BaseURl + 'movies/singleMovie/' + route.params.id,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          setMovie(resposeJson.data.data)
          setSpinner(false)
        }
      })
      .catch((err) => {
        setSpinner(false)
        console.log(err);
      })
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.GradTop }}>
      <Image source={movie.movieBanner ? { uri: movie.movieBanner } : imagesPath["movieThumb"]} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <MaterialIcons name="arrow-back" color={Colors.white} size={20} />
          </TouchableOpacity>
          <View style={styles.rightActions}>
            <TouchableOpacity onPress={() =>
              navigator.openEditMovie(
                { id: movie._id }
              )}>
              <Icon
                name="Edit_white"
                width="20"
                height="20"
                fill="none"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="upload" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.movieTitle}>
          <Text.Primary
            style={{
              fontSize: Font.FontSize.TagTitle + 2,
              lineHeight: Font.FontLineHeight.TagTitle,
              textAlignVertical: "center",
            }}
          >
            {movie.title}
          </Text.Primary>
          <TouchableOpacity onPress={() => navigator.openMoviePlay(
            { id: movie._id }
          )}>
            <LinearGradient
              style={styles.screenPlay}
              colors={[Colors.GradLeft, Colors.GradRight]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
            >
              <Icon name="File" width={96} height={96} fill="none" style={{ top: 13, left: 13 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Logline"}</Text.TagTitle>
            <Text.Tertiary>
              {movie.logline ? Object.values(movie.logline).toString().replaceAll(',', ' ') : ''}
            </Text.Tertiary>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Tagline"}</Text.TagTitle>
            <Text.Tertiary>{movie.tagline}</Text.Tertiary>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Writer"}</Text.TagTitle>
            <View style={styles.writers}>
              <View style={styles.writer}>
                <Image
                  source={movie.author ? { uri: movie.author.profileImage } : imagePath["avatar"]}
                  style={{ width: 24, height: 24, borderRadius: 12 }}
                />
                <Text.Secondary
                  style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                >
                  {movie.author ? movie.author.name : ''}
                </Text.Secondary>
              </View>
            </View>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Synopsis"}</Text.TagTitle>
            <Text.Tertiary>
              {movie.synopsis}
            </Text.Tertiary>
            <Text.Tertiary style={{ color: Colors.blue }}>{"Show more"}</Text.Tertiary>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Genres"}</Text.TagTitle>
            <ScrollView style={styles.genres} horizontal={true}>
              {movie.genres ? movie.genres.map((genre, index) => (
                <View style={styles.genre} key={index}>
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {Object.keys(genre)}
                  </Text.Primary>
                </View>
              )) : null}
            </ScrollView>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Dream Cast"}</Text.TagTitle>
            <ScrollView style={styles.casts} horizontal={true}>
              {movie.actors ? movie.actors.map((dreamcast, index) => (
                <View style={styles.cast} key={index}>
                  <Image
                    source={dreamcast.actorImage ? { uri: dreamcast.actorImage } : imagePath[dreamcast.avatar]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {dreamcast.actorName}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{dreamcast.heroName}</Text.Primary>
                </View>
              )) : null}
            </ScrollView>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Tags"}</Text.TagTitle>
            <ScrollView style={styles.genres} horizontal={true}>
              {movie.tags ? movie.tags.map((tag, index) => (
                <View style={styles.genre} key={index}>
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {tag}
                  </Text.Primary>
                </View>
              )) : null}
            </ScrollView>
          </View>

          <View style={[styles.contentItem, { marginBottom: 20 }]}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>
              {"Similar Movies"}
            </Text.TagTitle>
            <ScrollView style={styles.casts} horizontal={true}>
              {movie.similarMovies ? movie.similarMovies.map((similarMovie, index) => (
                <View style={[styles.cast, { marginTop: 6 }]} key={index}>
                  <Image
                    source={similarMovie.moviePoster ? { uri: similarMovie.moviePoster } : imagePath[similarMovie.thumb]}
                    style={{ width: 80, height: 100, borderRadius: 16 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {similarMovie.movieName}
                  </Text.Primary>
                </View>
              )) : null}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

MovieDetailScreen.navigationOptions = navigationOptions();

export default MovieDetailScreen;
