import React, { useEffect } from "react";
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
import navigationOptions from "./BookSceneScreen.navigationOptions";
import styles from "./BookSceneScreen.styles";
import imagePath from "../../constant/imagePath";

const BookSceneScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
  const deviceWidth = Dimensions.get("window").width;
  console.log(route)
  const [modalRemoveHero, setModalRemoveHero] = React.useState(false);
  const [modalHero, setModalHero] = React.useState(false);
  const [modalNewActor, setModalNewActor] = React.useState(false);
  const [modalDelActor, setModalDelActor] = React.useState(false);
  const [modalConfirmSave, setModalConfirmSave] = React.useState(false);
  const [modalRemoveChapter, setModalRemoveChapter] = React.useState(false);
  //
  const [heroName, setHeroName] = React.useState("");
  const [actorDescription, setActorDescription] = React.useState("");
  const [herosList, setHerosList] = React.useState([]);
  const [actorIndex, setActorIndex] = React.useState([]);
  const [selectedActor, setSelectedActor] = React.useState([]);
  //
  const [sceneName, setSceneName] = React.useState("");
  const [sceneDesc, setSceneDesc] = React.useState("");
  const [actors, setActors] = React.useState([]);

  useEffect(() => {
    setSceneName(route.params.chapter.sceneTitle)
    setSceneDesc(route.params.chapter.sceneDescription)
    setActors(route.params.chapter.actors)
  }, [])

  const saveNewHero = () => {
    setModalNewActor(false)
    let data = []
    data.push({ heroName: heroName, actorDescription: actorDescription })
    if (herosList.length > 0) { setHerosList(prevState => [...prevState, { heroName: heroName, actorDescription: actorDescription }]) }
    else { setHerosList(data) }
  }

  const selectHeros = (item, index) => {
    if (actorIndex.length > 0) {
      if (actorIndex.includes(index)) {
        let removeIndex = actorIndex.filter((i) => i !== index)
        let remove = selectedActor.filter((i) => i.actorId !== item.actorId)
        console.log(remove)
        setActorIndex(removeIndex)
        setActors(remove)
      } else {
        setActorIndex((prevState: any) => [...prevState, index])
        if (actors.length > 0) { setActors(prevState => [...prevState, item]) }
        else {
          let data = []
          data.push(item)
          setActors(data)
        }
      }
    } else {
      setActorIndex((prevState: any) => [...prevState, index])
      if (actors.length > 0) { setActors(prevState => [...prevState, item]) }
      else {
        let data = []
        data.push(item)
        setActors(data)
      }
    }
  }

  const removeHero = (i) => {
    // setModalRemoveHero(true)
    let data = actors.filter((item) => item.heroName !== i.heroName)
    setActors(data)
  }

  const editScene = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      bookId: route.params.id,
      actId: route.params.actId,
      sceneId: route.params.chapter._id,
      sceneTitle: sceneName,
      sceneDescription: sceneDesc,
      actors: actors
    }
    console.log(data)
    axios.post(BaseURl + 'books/editScene', data, {
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

  const deleteChapter = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const data = {
      bookId: route.params.id,
      actId: route.params.actId,
      chapterId: route.params.chapter._id,
    }
    console.log(data)
    axios.post(BaseURl + 'books/deleteChapter', data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.data.code === 200) {
          Toast.show(resposeJson.data.message, { duration: Toast.durations.LONG, })
          setModalRemoveChapter(false);
          navigator.goBack()
        }
      })
      .catch((err) => {
        setModalRemoveChapter(false);
        console.log(err);
      })
  }

  return (
    <View style={{ backgroundColor: Colors.GradTop, height: vh(100) }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => setModalConfirmSave(true)}>
              <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalRemoveChapter(true)}>
              <Feather name="trash-2" size={20} color={"rgba(255, 69, 58, 1)"} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextGroup}>
            <Text.Header>{"Chapter 1"}</Text.Header>
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
          <TouchableOpacity style={styles.circleBtn} onPress={() => setModalHero(true)}>
            <Text.Primary
              style={{
                borderRadius: 16,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: Colors.btnBack,
              }}
            >
              {"Add Hero"}
            </Text.Primary>
          </TouchableOpacity>
          {actors.length > 0 ? actors.map((item, index) => (
            <View style={styles.avatar} key={index}>
              <Text.Primary
                style={{
                  borderRadius: 16,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: Colors.btnBack,
                }}
              >
                {item.heroName}
              </Text.Primary>
              <TouchableOpacity
                onPress={() => removeHero(item)}
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
            onPress={() => editScene()}
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
                onPress={() => editScene()}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Save"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalConfirmSave(false)}
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

      {/* RemoveHero Chapter */}
      <Modal
        isVisible={modalRemoveChapter}
        swipeDirection="down"
        onSwipeComplete={() => setModalRemoveChapter(false)}
        onRequestClose={() => setModalRemoveChapter(false)}
        onBackdropPress={() => setModalRemoveChapter(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              height: 200,
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
          <View style={{ marginBottom: 16, display: "flex", flexDirection: "row" }}>
            <Feather name="trash-2" size={24} color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Delete Chapter?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “Current Chapter”?"}
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
                onPress={() => deleteChapter()}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Delete"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalRemoveChapter(false)}
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

          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Attach a Hero"}</Text.ModalTitle>

          <TouchableOpacity style={styles.modalAddBtn} onPress={() => setModalNewActor(true)}>
            <AntDesign name="plus" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <ScrollView>
            {herosList ? herosList.map((item, index) => (
              <TouchableOpacity onPress={() => selectHeros(item, index)} style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]} key={index}>
                <ScrollView horizontal={true}>
                  <View style={[styles.castInfo]}>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text.ParagraphTitle style={{ marginBottom: 8, fontWeight: "700" }}>
                        {item.heroName}
                      </Text.ParagraphTitle>
                      <Text.Tertiary style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        {item.actorDescription}
                      </Text.Tertiary>
                    </View>
                    {actorIndex.map((i) => i === index ? <Image source={imagePath["check"]} style={{ width: 24, height: 24, marginLeft: 20 }} /> : null)}
                  </View>
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
              </TouchableOpacity>
            )) : null}
          </ScrollView>
          <Button.Primary
            onPress={() => setModalHero(false)}
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
              onPress={() => saveNewHero()}
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

BookSceneScreen.navigationOptions = navigationOptions();

export default BookSceneScreen;
