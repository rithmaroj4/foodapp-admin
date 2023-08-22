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
import Category from './Screens/CategoryScreen';
import * as ScreenOrientation from 'expo-screen-orientation';
import Tabs from './Screens/Tabs';
import LiveOrderScreen from './Screens/LiveOrderScreen';
import AddCategory from './Screens/CategoryScreen';
import { Drawer } from 'react-native-paper';
import DrawerScreen from './navigation/Drawer';

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
      <Stack.Screen name="Tabs" component={DrawerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
      
     
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Manager" component={ManagerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Forget" component={ForgetPass} options={{ headerShown: false }} />
      <Stack.Screen name="Category" component={AddCategory} options={{ headerShown: false }} />
      <Stack.Screen name="LiveOrders" component={LiveOrderScreen} />
    
      

    
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
