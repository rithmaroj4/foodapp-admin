import React ,{useState} from 'react';
import { StyleSheet, Text, View ,  Dimensions , TextInput , TouchableOpacity,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import { PrimaryButton } from '../components/Button';
  
  const RegisterScreen = () => {
    const {height, width} = Dimensions.get('window');
    const navigation = useNavigation();
    const[staffname,setstaffname] =useState('');
    const[staffid,setstaffid] =useState('');
    const[email,setemail] =useState('');
    const[password,setpassword] =useState('');

    const addStaffRef = firebase.firestore().collection("Staff");
    const dataAddOn = ()=>{
      // check if we have new field data
  
            const data = {
              staffname:staffname,
              staffid:staffid,
              email:email,
              password:password,
              
  
          };
          addStaffRef
          .add(data)
          .then(() => {
  
            setstaffname('');
            setstaffid('');
            setemail('');
            setpassword('');
          
  
          alert('Added ')
          })
          .catch((error)=>{
  
              alert(error);
          })
  
   }


    return (
      <View style={styles.container}>
        
      <Image href={require('./assets/logo.png')}/>
     
       <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="STAFF NAME" 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setstaffname(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="STAFF ID" 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setstaffid(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="E-MAIL" 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setemail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="PASSWORD" 
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setpassword(text)}/>
        </View>
        
        <PrimaryButton onPress={dataAddOn} title="ADD STAFF" />
        
      </View>
    );
  }
  export default RegisterScreen;

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
    borderRadius:10,
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