//import { StatusBar } from 
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
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import LogoutScreen from './LogoutScreen';


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
          fontSize:14},
          tabBarActiveTintColor:COLORS.primary,

          }}>
       
       <Tab.Screen
  name="ITEMS"
  component={Items}
  options={{
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="shopping-bag" color={color} size={size} />
    ),
  }}
/>

<Tab.Screen
  name="CATEGORY"
  component={AddCategory}
  options={{
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="tags" color={color} size={size} />
    ),
  }}
/>

<Tab.Screen
  name="ORDERS"
  component={OrderScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="clipboard-list" color={color} size={size} />
    ),
  }}
/>

<Tab.Screen
  name="STAFF"
  component={Staff}
  options={{
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="users" color={color} size={size} />
    ),
  }}
/>

<Tab.Screen
  name="LOGOUT"
  component={LogoutScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="sign-out-alt" color={color} size={size} />
    ),
  }}
/>
       
    </Tab.Navigator>
    
  
    );
};
export default Tabs;

