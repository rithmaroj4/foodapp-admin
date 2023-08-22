import React from 'react';
import { StyleSheet, Text, View ,  Dimensions , TextInput , TouchableOpacity,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";

  
  export default function App() {
    const {height, width} = Dimensions.get('window');
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        
      <Image href={require('./assets/logo.png')}/>
     
       
      <View style={styles.closeContainer}> 
      <Text  style={styles.logo}>Reset Password </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="STAFF ID" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({staffid:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="NEW PASSWORD" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({PASSWORD:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="OTP" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({otp:text})}/>
        </View>
       
        
        
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.forgot} onPress={() => navigation.navigate("Manager")}>RESET PASSWORD</Text>
        </TouchableOpacity>
      </View>
      </View>
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
  closeContainer:{
    height:"60%",
    width:"60%",
    justifyContent:'center',
    alignSelf:'center',
    shadowColor: "#000000",
    shadowOffset: {
         width: 0,
     height: 3,
        },
    shadowOpacity:  0.18,
    shadowRadius: 4.59,
    elevation: 5,
    backgroundColor:'#F7F7F7',
    alignItems:'center',
    borderRadius:20,

},
logo:{
  fontWeight:"bold",
  fontSize:50,
  color:"#F07048",
  marginBottom:40
}
});