import { StatusBar } from 'expo-status-bar';
import React ,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import IntroScreen from './Screens/IntroScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ManagerScreen from './Screens/ManagerScreen';
import ForgetPass from './Screens/ForgetPass';
import Category from './Screens/Category';
import * as ScreenOrientation from 'expo-screen-orientation';
import Tabs from './Screens/Tabs';

const Stack = createNativeStackNavigator();


async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

export default function App() {
  useEffect(() => {
    async function setScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    setScreenOrientation();
  }, []);

  return (

    
    <NavigationContainer>
    <Stack.Navigator >
   
      <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Manager" component={ManagerScreen} />
      <Stack.Screen name="Forget" component={ForgetPass} />
      <Stack.Screen name="Category" component={Category} />
      

    
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
