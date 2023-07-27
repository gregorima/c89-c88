import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
import { Switch } from 'react-native-paper';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state= {
            fontsLoaded:false,
            isEnabled: true,
            lightIsEnabled: false,
            lightModeEnabled: true,
            name: ""
        }
      }

      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
      }

      toggleSwitch = () => {
        var previousState = this.state.lightIsEnabled;
        var theme = !this.state.lightIsEnabled ? "dark" : light;
        var updates = {};
        updates["/users/"+firebase.auth().currentUser.uid+"/currentTheme"] = theme

        firebase.database().ref().update(updates)
        this.setState({isEnabled: !previousState, lightModeEnabled: previousState})
      }
    render() {
        return (
            <View style={this.state.lightIsEnabled ? styles.lightContainer : styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                    <Image styles={styles.iconImage} source={require("../assets/logo.png")}/>
                </View>
            <View style={styles.appTitleTextContainer}>
                <Text style={styles.appTitleText}>StoryTelling</Text>
            </View>
            </View>
            <View style={styles.screenContainer}>
                <View styles={styles.profileImageConatainer}>
                    <Image style={styles.profileImage}/>
                    <Text style={styles.nameText}>{this.state.name}</Text>
                </View>
                <View style={styles.themeContainer}>
                    <Text style={styles.themeText}>Tema Escuro</Text>
                    <Switch
                        trackColor={{false: "#767577", true: "white"}}
                        thumbColor={this.state.isEnabled ? "#EE8249" : "#F4F3F4"}
                        value={this.state.lightIsEnabled}
                        onChangeValue={this.toggleSwitch}
                    />
                </View>
                <View style={{flex: 0.4}}/>
            </View>
            </View>
        )
    }

    async fetchUser() {
        var tema, nome
        await firebase.database.ref("/users/"+firebase.auth().currentUser.uid).on("value", (snapshot)=>{
            tema= snapshot.val().currentTheme
            nome= `${snapshot.val().first_name} ${snapshot.val().last_name}`
        })
        this.setState({
            isEnabled: tema=== "light" ? false : true,
            lightModeEnabled: tema=== "light" ? true : false,
            name: nome
        })
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    lightContainer: {
      flex: 1,
      backgroundColor: "white"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
      color: this.state.lightIsEnabled ? "black" : "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    screenContainer: {
      flex: 0.85
    },
    profileImageContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    profileImage: {
      width: RFValue(140),
      height: RFValue(140),
      borderRadius: RFValue(70)
    },
    nameText: {
      color: this.state.lightIsEnabled ? "black" : "white",
      fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans",
      marginTop: RFValue(10)
    },
    themeContainer: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: RFValue(20)
    },
    themeText: {
      color: this.state.lightIsEnabled ? "black" : "white",
      fontSize: RFValue(30),
      fontFamily: "Bubblegum-Sans",
      marginRight: RFValue(15)
    }
  });
  