import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import Stack from './stack';
import Logout from '../screens/logout';
import firebase from 'firebase';
import Component from 'react-native-paper/lib/typescript/src/components/Typography/Text';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component() {
  constructor() {
    super();
    this.state = {
      lightTheme: true
    }
  }

  componentDidMount() {
      var tema 
      firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on("value", (data)=>{tema= data.val().currentTheme})
      this.setState({lightTheme: tema})
  }

  render() {
    return (
      <Drawer.Navigator drawerContentOptions={{
        activeChangeColor: "#E91E63",
        inactiveChangeColor: this.state.lightTheme ? "black" : "white",
        itemStyle: {marginVertical: 2.5},
      }}>
          <Drawer.Screen component={Stack} name="home"/>
          <Drawer.Screen component={Profile} name="profile"/>
          <Drawer.Screen component={Logout} name="logout"/>
      </Drawer.Navigator>
    );
  }
  }