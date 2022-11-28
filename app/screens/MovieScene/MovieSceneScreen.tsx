import React, { useEffect } from "react";
import { ScrollView, View, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from 'react-native-root-toast';
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
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./MovieSceneScreen.navigationOptions";
import styles from "./MovieSceneScreenstyles";
import imagePath from "../../constant/imagePath";

const MovieSceneScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const deviceWidth = Dimensions.get("window").width;

  const [modalRemoveHero, setModalRemoveHero] = React.useState(false);
  const [modalHero, setModalHero] = React.useState(false);
  const [modalNewActor, setModalNewActor] = React.useState(false);
  const [modalDelActor, setModalDelActor] = React.useState(false);
  const [modalConfirmSave, setModalConfirmSave] = React.useState(false);
  //New Actor
  const [actorName, setActorName] = React.useState("");
  const [heroName, setHeroName] = React.useState("");
  const [actorDescription, setActorDescription] = React.useState("");
  const [actorImage, setActorImage] = React.useState("");
  const [actorData, setActorData] = React.useState([]);
  const [actorIndex, setActorIndex] = React.useState([]);
  const [selectedActor, setSelectedActor] = React.useState([]);
  const [actorURL, setActorURL] = React.useState([]);
  const [actorDataList, setActorDataList] = React.useState<any>();
  //
  const [sceneName, setSceneName] = React.useState("");
  const [sceneDesc, setSceneDesc] = React.useState("");


  useEffect(() => {
    console.log(route);
    setSceneName(route.params.sceneName)
    setSceneDesc(route.params.sceneDesc)
    setSelectedActor(route.params.actors)
  }, [])

  const saveScene = () => {
    setModalConfirmSave(false);
    navigator.goBack();

  };

  const saveNewActor = async () => {
    const token = await AsyncStorage.getItem('authToken')
    var formData = new FormData();
    let filename = actorImage.split('/').pop();

    formData.append('actorName', actorName);
    formData.append('heroName', heroName);
    formData.append('actorDescription', actorDescription);
    formData.append('actorImage', {
      uri: actorImage,
      name: filename,
      type: "image/jpeg"
    });

    fetch(BaseURl + 'movies/actorDetails', {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.code === 200) {
          let data = []
          alert(responseJson.message)
          data.push(responseJson.data)
          console.log(actorData)
          if (actorData.length === 0) { setActorData(data) }
          else { setActorData(prevState => [...prevState, responseJson.data]) }
          setActorName("")
          setActorDescription("")
          setHeroName("")
          setActorImage("")
          setModalNewActor(false)
        } else {
          alert(responseJson.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const selectActors = (item, index) => {
    if (actorIndex.length > 0) {
      if (actorIndex.includes(index)) {
        let removeIndex = actorIndex.filter((i) => i !== index)
        let remove = selectedActor.filter((i) => i.actorId !== item.actorId)
        console.log(remove)
        setActorIndex(removeIndex)
        setSelectedActor(remove)
      } else {
        setActorIndex((prevState: any) => [...prevState, index])
        setSelectedActor((prevState: any) => [...prevState, item])
      }
    } else {
      setActorIndex((prevState: any) => [...prevState, index])
      setSelectedActor((prevState: any) => [...prevState, item])
    }
  }

  const saveActorsURL = () => {
    setModalHero(false)
    let data = []
    console.log(selectedActor)
    selectedActor.map(item => {
      data.push(item)
      if (actorURL.length === 0) { setActorURL(data) }
      else { setActorURL(prevState => [...prevState, item]) }
    })
    console.log(data)

  }

  const pickMovieBanner = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    setActorImage(result.uri)
  }

  const saveScreenPlay = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      movieId: route.params.id,
      actId: route.params.actId,
      sceneId: route.params.sceneId,
      sceneName: sceneName,
      sceneDescription: sceneDesc,
      actors: selectedActor
    }
    console.log(data)
    axios.post(BaseURl + 'movies/editScene', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show(resposeJson.data.message, { duration: Toast.durations.LONG, })
          navigator.goBack()
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={{ backgroundColor: Colors.GradTop, height: vh(100) }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModalConfirmSave(true)}> 
            <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
          </TouchableOpacity>
          <View style={styles.headerTextGroup}>
            <Text.Header>{route.params.sceneName}</Text.Header>
          </View>
        </View>
        <View style={styles.info}>
          <Feather name="info" size={20} color={Colors.white} style={{ marginRight: 10 }} />
          <Text.Tertiary style={{ flex: 1 }}>
            {
              "In this scene, it is recommended to reveal the world of the protagonist. Show his friends, love, creativity, hobbies and smoothly move to tragedy."
            }
          </Text.Tertiary>
        </View>
        <Input value={sceneName} onChangeText={(text) => setSceneName(text)} placeholder={"Scene Title"} />
        <TextInput
          // value={
          //   "Watch Molly's Game yesterday, good movie, just a little too long for me Kevin Costner was excellent, as per usual."
          // }
          value={sceneDesc}
          onChangeText={(text) => setSceneDesc(text)}
          placeholder={"Enter your text here"}
          placeholderTextColor={Colors.white1}
          style={{
            height: 120,
            backgroundColor: Colors.inputBack,
            padding: 16,
            borderRadius: 8,
            textAlignVertical: "top",
            color: Colors.white,
            lineHeight: 24,
          }}
          numberOfLines={3}
          multiline={true}
        />
        <View style={styles.avatarGroup}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => {
            setActorURL([])
            setModalHero(true)
          }}>
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={Colors.blue}
              style={{ textAlign: "center", paddingVertical: 12 }}
            />
          </TouchableOpacity>
          {selectedActor ? selectedActor.map(item => (
            <View style={styles.avatar}>
              <Image
                source={{ uri: item.actorImage }}
                style={{ width: 48, height: 48, borderRadius: 24 }}
              />
              <TouchableOpacity
                onPress={() => setModalRemoveHero(true)}
                style={{ position: "absolute", top: -2, right: -2 }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "rgba(255, 69, 58, 1)",
                    padding: 2,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="ios-close" size={16} color={Colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          )) : null}
        </View>

        <View style={{ position: "absolute", bottom: 50, marginHorizontal: 16, width: "100%" }}>
          <Button.Primary
            onPress={() => saveScreenPlay()}
            textType={"Primary"}
            style={{ alignItems: "center", height: 48 }}
          >
            <Text.TagTitle style={{ fontWeight: "700", marginTop: -4 }}>
              {"Save Scene"}
            </Text.TagTitle>
          </Button.Primary>
        </View>
      </View>

      {/* RemoveHero Modal */}
      <Modal
        isVisible={modalRemoveHero}
        swipeDirection="down"
        onSwipeComplete={() => setModalRemoveHero(false)}
        onRequestClose={() => setModalRemoveHero(false)}
        onBackdropPress={() => setModalRemoveHero(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              height: 180,
              paddingVertical: 24,
              alignItems: "flex-start",
              marginHorizontal: 16,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              bottom: 0,
              position: "absolute",
            },
          ]}
        >
          <View style={{ marginBottom: 25, display: "flex", flexDirection: "row" }}>
            <Icon name="Detach" width={24} height={24} fill="none" color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Detach Current Hero?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “current Hero“?"}
          </Text.Tertiary>
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
                onPress={() => setModalRemoveHero(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Detach"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalRemoveHero(false)}
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

      {/* SaveScene Modal */}
      <Modal
        isVisible={modalConfirmSave}
        swipeDirection="down"
        onSwipeComplete={() => setModalConfirmSave(false)}
        onRequestClose={() => setModalConfirmSave(false)}
        onBackdropPress={() => setModalConfirmSave(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0 }}
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
              bottom: 0,
              position: "absolute",
            },
          ]}
        >
          <View style={{ marginBottom: 25, display: "flex", flexDirection: "row" }}>
            <Ionicons name="warning" size={24} fill="none" color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Save Scene?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you want to save the data before exiting the scene editor? "}
          </Text.Tertiary>
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
                onPress={() => saveScreenPlay()}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Save"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => {
                  setModalConfirmSave(false)
                  navigator.goBack()
                }}
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

      {/* dreamcast Modal */}
      <Modal
        isVisible={modalHero}
        onRequestClose={() => setModalHero(false)}
        onBackdropPress={() => setModalHero(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
      >
        <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: Colors.white,
              opacity: 0.3,
              marginTop: 8,
              marginBottom: 18,
            }}
          ></View>

          <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalHero(false)}>
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>

          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Dream Cast"}</Text.ModalTitle>

          <TouchableOpacity style={styles.modalAddBtn} onPress={() => setModalNewActor(true)}>
            <AntDesign name="plus" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <ScrollView>
            {actorData ? actorData.map((item, index) => (
              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]} key={index}>
                <ScrollView horizontal={true} >
                  <TouchableOpacity style={styles.castInfo} onPress={() => selectActors(item, index)}>
                    <Image
                      source={{ uri: item.actorImage }}
                      style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
                    />
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text.ParagraphTitle style={{ marginBottom: 8, fontWeight: "700" }}>
                        {item.actorName}
                      </Text.ParagraphTitle>
                      <Text.Tertiary>{`Actor: ${item.heroName}`}</Text.Tertiary>
                      <Text.Tertiary style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        {item.actorDescription}
                      </Text.Tertiary>
                    </View>
                    {actorIndex.map((i) => i === index ? <Image source={imagePath["check"]} style={{ width: 24, height: 24, marginLeft: 20 }} /> : null)}
                  </TouchableOpacity>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => setModalNewActor(true)}>
                      <View style={styles.editCastBtn}>
                        <Icon name="Edit_white" width="24" height="24" fill="none" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalDelActor(true)}>
                      <View style={[styles.editCastBtn, { backgroundColor: "rgba(255, 69, 58, 1)" }]}>
                        <Feather name="trash-2" size={24} color={Colors.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            )) : null}
          </ScrollView>
          <Button.Primary
            onPress={() => saveActorsURL()}
            textType={"Primary"}
            style={{ alignItems: "center" }}
          >
            <Text.TagTitle>{"Attach Selected"}</Text.TagTitle>
          </Button.Primary>
        </View>
        {/* newActor Modal */}
        <Modal
          isVisible={modalNewActor}
          swipeDirection="down"
          onSwipeComplete={() => setModalNewActor(false)}
          onRequestClose={() => setModalNewActor(false)}
          onBackdropPress={() => setModalNewActor(false)}
          deviceWidth={deviceWidth}
          style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
        >
          <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: Colors.white,
                opacity: 0.3,
                marginTop: 8,
                marginBottom: 18,
              }}
            ></View>

            <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalNewActor(false)}>
              <Ionicons name="arrow-back" size={20} color={Colors.blue} />
            </TouchableOpacity>

            <Text.ModalTitle style={{ marginBottom: 25 }}>{"Create a New Hero"}</Text.ModalTitle>
            <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
              <View style={{ flex: 1 }}>
                <Input value={heroName} onChangeText={(text) => setHeroName(text)} placeholder={"Hero's Name"} />
              </View>
            </View>
            <View style={{ height: vh(90) - 220 }}>
              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <View style={{ flex: 1, marginRight: 16 }}>
                  <Input value={actorName} onChangeText={(text) => setActorName(text)} placeholder={"Actor's Name"} />
                </View>
                <TouchableOpacity
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: Colors.btnBack,
                  }}
                  onPress={() => pickMovieBanner()}
                >
                  {actorImage
                    ? <Image source={{ uri: actorImage }} style={{ flex: 1, borderRadius: 22, }} resizeMode='cover' />
                    : <View style={{ padding: 10 }}><Icon name="User" width={96} height={96} fill={"none"} /></View>}
                </TouchableOpacity>
              </View>

              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <TextInput
                  value={actorDescription}
                  onChangeText={(text) => setActorDescription(text)}
                  placeholder={"Ex killer, suffering after his daughter dies."}
                  placeholderTextColor={Colors.white1}
                  style={{
                    color: '#fff',
                    height: 160,
                    backgroundColor: Colors.inputBack,
                    padding: 16,
                    borderRadius: 8,
                    textAlignVertical: "top",
                    width: "100%",
                  }}
                  numberOfLines={3}
                  multiline={true}
                />
              </View>
            </View>

            <Button.Primary
              onPress={() => saveNewActor()}
              textType={"Primary"}
              style={{ alignItems: "center" }}
            >
              <Text.TagTitle>{"Create"}</Text.TagTitle>
            </Button.Primary>
          </View>
        </Modal>
      </Modal>


      {/* delActor Modal */}
      <Modal
        isVisible={modalDelActor}
        swipeDirection="down"
        onSwipeComplete={() => setModalDelActor(false)}
        onRequestClose={() => setModalDelActor(false)}
        onBackdropPress={() => setModalDelActor(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              height: 180,
              paddingVertical: 24,
              alignItems: "flex-start",
              marginHorizontal: 16,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          ]}
        >
          <Text.ModalTitle style={{ marginBottom: 25, textAlign: "left" }}>
            <Feather name="trash-2" size={24} color={Colors.white} style={{ letterSpacing: 10 }} />
            {"Delete an Actor?"}
          </Text.ModalTitle>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “Actor_Name”?"}
          </Text.Tertiary>
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
                onPress={() => setModalDelActor(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Delete"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalDelActor(false)}
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

MovieSceneScreen.navigationOptions = navigationOptions();

export default MovieSceneScreen;
