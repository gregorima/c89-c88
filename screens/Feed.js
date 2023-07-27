import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import * as Font from "expo-font"
import * as Splash from "expo-splash-screen"
import StoryCard from "./storyCard"
import Post from './Post';

Splash.preventAutoHideAsync()

var fonts = {"bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf")}
var stories = require("./tempStories.json")

export default class Feed extends Component {
    constructor() {
        super();
        this.state = {
            fontIsLoaded: false
        }
    }

    async loadFonts() {
        await Font.loadAsync(fonts)
        this.setState({fontIsLoaded: true})
    }

    componentDidMount() {
        this.loadFonts()
    }

    renderItem = ({item: story}) => {
        return
         <Post story={story}/>
    }
    
    render() {
       if(this.state.fontIsLoaded) {
          Splash.hideAsync()
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image style={styles.image}/>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}></Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <FlatList data={stories} renderItem={renderItem()} keyExtraxtor={(item, index) => {index.toString()}}/>
                    </View>
                </View>
            )
       } else {}
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
      flex: 0.93
    },
  });
  
  
  