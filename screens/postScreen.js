import React, { Component } from "react";
import {
  View,
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


SplashScreen.preventAutoHideAsync();


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class postScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      storyId: this.props.story.key,
      storyData: this.props.story.value,
      isLiked: false,
      likes: this.props.story.value.likes,
    };
  }


  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }


  componentDidMount() {
    this._loadFontsAsync();
  }

  likeAction = () => {
    if(!this.state.isLiked) {
      firebase.database().ref("posts").child(this.state.storyId).child("likes").set(firebase.database.ServerValue.increment(-1))
      this.setState({likes: this.state.likes-=1, isliked: false})
    } else {
      firebase.database().ref("posts").child(this.state.storyId).child("likes").set(firebase.database.ServerValue.increment(+1))
      this.setState({likes: this.state.likes+=1, isliked: false})
    }
  } 

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Image
              source={images[story.previewImage]}
              style={styles.storyImage}
            ></Image>


            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {story.title}
              </Text>
              <Text style={styles.storyAuthorText}>
                {story.author}
              </Text>
              <Text style={styles.descriptionText}>
                {story.description}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={this.state.isLiked ? styles.likeButtonLiked : styles.likeButtonIsLiked} onPress={this.likeAction}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={this.state.lightTheme ? styles.likeTextLight : styles.likeText}>{this.state.likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  }
});


