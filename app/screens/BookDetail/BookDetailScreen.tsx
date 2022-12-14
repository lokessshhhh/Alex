import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./BookDetailScreen.navigationOptions";
import styles from "./BookDetailScreen.styles";
import imagePath from "../../constant/imagePath";

const BookDetailScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const [book, setBook] = useState<any>([]);
  const [manuScript, setManuScript] = useState([]);

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

  useEffect(() => {
    getSignleBook()
    navigation.addListener('focus', () => {
      getSignleBook()
    })
  }, [])

  const getSignleBook = async () => {
    const token = await AsyncStorage.getItem('authToken')

    fetch(BaseURl + 'books/singleBook/' + route.params.id, {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.code === 200) {
          setBook(resposeJson.data)
          setManuScript(resposeJson.data.manuScript)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.GradTop }}>
      <Image source={book.bookBanner ? { uri: book.bookBanner } : imagesPath["bookThumb"]} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <MaterialIcons name="arrow-back" color={Colors.white} size={20} />
          </TouchableOpacity>
          <View style={styles.rightActions}>
            <TouchableOpacity onPress={() => navigator.openEditBook(
              { id: book._id }
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
          <View>
            <Text.Primary
              style={{
                fontSize: Font.FontSize.TagTitle + 2,
                lineHeight: Font.FontLineHeight.TagTitle,
                textAlignVertical: "center",
              }}
            >
              {book.title}
            </Text.Primary>
            <Text.Tertiary>{"6 Acts, 48 Chapters"}</Text.Tertiary>
          </View>
          <TouchableOpacity onPress={() => navigator.openBookPlay(
            {
              id: book._id,
              manuScript: manuScript,
              title: book.title
            }
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
              {book.logline ? Object.values(book.logline).toString().replaceAll(',', ' ') : ''}
            </Text.Tertiary>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Tagline"}</Text.TagTitle>
            <Text.Tertiary>{book.tagline}</Text.Tertiary>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Writer"}</Text.TagTitle>
            <View style={styles.writers}>
              <View style={styles.writer}>
                <Image
                  source={book.author ? { uri: book.author.profileImage } : imagePath["avatar"]}
                  style={{ width: 24, height: 24, borderRadius: 12 }}
                />
                <Text.Secondary
                  style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                >
                  {book.author ? book.author.name : ""}
                </Text.Secondary>
              </View>
            </View>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Synopsis"}</Text.TagTitle>
            <Text.Tertiary>
              {book.synopsis}
            </Text.Tertiary>
            <Text.Tertiary style={{ color: Colors.blue }}>{"Show more"}</Text.Tertiary>
          </View>

          <View style={styles.contentItem}>
            <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Genres"}</Text.TagTitle>
            <ScrollView style={styles.genres} horizontal={true}>
              {book.genres ? book.genres.map((genre, index) => (
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
              {book.actors ? book.actors.map((dreamcast, index) => (
                <View style={styles.cast} key={index}>
                  <Image
                    source={{ uri: dreamcast.actorImage }}
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
              {book.tags ? book.tags.map((tag, index) => (
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
              {book.similarBooks ? book.similarBooks.map((similarMovie, index) => (
                <View style={[styles.cast, { marginTop: 6 }]} key={index}>
                  <Image
                    source={{ uri: similarMovie.bookPoster }}
                    style={{ width: 80, height: 100, borderRadius: 16 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {similarMovie.bookName}
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

BookDetailScreen.navigationOptions = navigationOptions();

export default BookDetailScreen;
