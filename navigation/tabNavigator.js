import {StyleSheet} from "react-native"
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "./screens/Feed";
import CreateStory from "./screens/CreateStory";
import CreatePost from "../screens/CreatePost";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
      <Tab.Navigator
        labeled={false}
        style={styles.tabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused
                ? 'book'
                : 'book-outline';
            } else if (route.name === 'Criar História') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Criar Post" component={CreatePost} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create{
  tabStyle: {
    backgroundColor: "#2f345d",
    height: 8%,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  }
}