import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Story from '../screens/Post';
import BottomTabNavigator from './tabNavigator';

const Stack = createStackNavigator();

export default function Stack() {
  return (
    <Stack.Navigator initialRouteName={"home"} screenOptions={{headerShown: false}}>
        <Stack.Screen component={BottomTabNavigator} name="home"/>
        <Stack.Screen component={Post} name="story"/>
    </Stack.Navigator>
  );
}