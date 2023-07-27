import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";


import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";


SplashScreen.preventAutoHideAsync();


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1"
    };
  }


  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }


  componentDidMount() {
    this._loadFontsAsync();
  }

  addStory = () => {
    if(this.state.title && this.state.description && this.state.story && this.state.moral) {
      var storyData = {
        preview_image: this.state.previewImage,
        description: this.state.description,
        author: firebase.auth().currentUser.displayName,
        created: new Date,
        authorUid: firebase.auth().currentUser.uid,
        likes: 0
      }
      firebase.database().ref("/posts/"+(Math.random().toString(36).slice(2))).set(storyData).then(() => {this.props.navigation.navigate("Feed")})
    } else {
      Alert.alert("Todos os campos devem ser preenchidos")
    }
  }


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      var preview_images = {
        image_1: require("../assets/story_image_1"),
        image_2: require("../assets/story_image_2"),
        image_3: require("../assets/story_image_3"),
        image_4: require("../assets/story_image_4"),
        image_5: require("../assets/story_image_5")
      }
      return (
        <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                    <Image styles={styles.iconImage} source={require("../assets/logo.png")}/>
                </View>
            <View style={styles.appTitleTextContainer}>
                <Text style={styles.appTitleText}>Novo post</Text>
            </View>
            </View>
            <View style={styles.fieldsContainer}>
                <Image source={this.state.previewImage}/>
            </View>
            <View>
                <DropDownPicker
                    items= {[
                        {label: "Imagem 1", value: image_1},
                        {label: "Imagem 2", value: image_2},
                        {label: "Imagem 3", value: image_3},
                        {label: "Imagem 4", value: image_4},
                        {label: "Imagem 5", value: image_5}
                    ]}
                    defaultValue={this.state.previewImage}
                    style={{backgroundColor: "transparent", borderwidth: 1, borderColor: "white"}}
                    onSelectItem={(item) => {this.setState({previewImage: item})}}
                />
            </View>
            <ScrollView>
                <TextInput style={styles.inputFont} 
                onChangeText={(title) => {this.setState({title})}}
                placeHolder={"Título"}
                placeHolderTextColor="white"
                />
                <TextInput style={[styles.inputFont, styles.inputFont, styles.inputTextBig]} 
                onChangeText={(description) => {this.setState({description})}}
                placeHolder={"Descrição"}
                placeHolderTextColor="white"
                multiline= {true}
                numberOfLines={3}
                >
                 </TextInput>

                <View style={styles.submitButton}>
                    <Button title={"Enviar"} color={"#841584"} onPress={this.addStory()}/>
                </View>
            </ScrollView>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c",
    },
    droidSafeArea: {
      marginTop:
        Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row",
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center",
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans",
    },
    fieldsContainer: {
      flex: 0.85,
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain",
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      marginTop: RFValue(10),
      fontFamily: "Bubblegum-Sans",
    },
    inputFontExtra: {
      marginTop: RFValue(15),
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5),
    },
  });
  

