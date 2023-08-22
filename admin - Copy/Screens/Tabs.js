import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,  Dimensions , TextInput ,TouchableOpacity } from 'react-native';
import styles from './styles';
import Svg,{ Image } from 'react-native-svg';
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './RegisterScreen';
import AddItem from './AddItem';
import react from 'react';
import Category from './CategoryScreen';
import AddCategory from './CategoryScreen';
import Staff from './StaffScreen';
import Items from './ItemsScreen';
import OrderScreen from './OrderScreen';

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
        <Tab.Screen name= 'STAFF' component={Staff}/>
        <Tab.Screen name= 'ITEMS ' component={Items}/>
        <Tab.Screen name= 'CATEGORY' component={AddCategory}/>
        <Tab.Screen name= 'ORDERS' component={OrderScreen}/>
       
    </Tab.Navigator>
    
  
    );
};
export default Tabs;

