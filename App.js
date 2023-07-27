import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/drawerNavigator';
import Register from './screens/register';
import LogIn from './screens/login';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase  from 'firebase';
import { firebaseConfig } from './config';
if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig);
  } else {firebase.app()}

const Stack = createStackNavigator(initialRouteName="login", screenOptions={{headerShown: false, gestureEnabled: false}})
const StackNav = () => {
  <Stack.Navigator>
      <Stack.Screen name='login' component={LogIn}/>
      <Stack.Screen name='register' component={Register}/>
      <Stack.Screen name='drawernav' component={DrawerNavigator}/>
  </Stack.Navigator>
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}
