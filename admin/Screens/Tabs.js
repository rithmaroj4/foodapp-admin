import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,  Dimensions , TextInput ,TouchableOpacity } from 'react-native';
import styles from './styles';
import Svg,{ Image } from 'react-native-svg';
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './RegisterScreen';
import AddItem from './AddItem';
import react from 'react';
import Category from './Category';
import AddCategory from './Category';

const Tab = createBottomTabNavigator();
const Tabs = () => {
    return(
    <Tab.Navigator  screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          fontSize:14}}}>
        <Tab.Screen name= 'ADD STAFF' component={RegisterScreen}/>
        <Tab.Screen name= 'ADD ITEMS ' component={AddItem}/>
        <Tab.Screen name= 'ADD CATEGORY' component={AddCategory}/>
       
    </Tab.Navigator>
    
  
    );
};
export default Tabs;

