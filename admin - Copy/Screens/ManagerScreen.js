import React from 'react';
import { StyleSheet, Text, View ,  Dimensions , TextInput , TouchableOpacity,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import{NavigationContainer}  from "@react-navigation/native";
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Tabs from './Tabs';

  
  export default function App() {
    const {height, width} = Dimensions.get('window');
    const navigation = useNavigation();
    return (
     <NavigationContainer independent={true} >
      <Tabs/>
      </NavigationContainer>
        
        
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDB59E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"white",
    fontSize:14
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#F07048",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});