import React from 'react';
import { StyleSheet, Text, View ,  Dimensions , TextInput , TouchableOpacity,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import { Formik } from 'formik';
import * as yup from 'yup';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import SessionManager from '../store/SessionManager';

  
   const  LoginScreen = () => {



    const validationSchema = yup.object().shape({
      // Define validation rules for each field in your form
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    });
  
    const { height, width } = Dimensions.get('window');
    const navigation = useNavigation();
  



    // Hardcoded admin credentials
    const adminCredentials = {
      email: 'admin@gmail.com',
      password: '123',
     
    };

    // const handleLogin = async (values) => {
    //   try {
    //     const usersCollection = firebase.firestore().collection('Staff');
    //     const querySnapshot = await usersCollection.where('email', '==', values.email).get();
    //     if (querySnapshot.empty) {
    //       throw new yup.ValidationError('User not found. Please check your email.', null, 'email');
    //     } else {
    //       let foundUser = false;
    //       querySnapshot.forEach((doc) => {
    //         const user = doc.data();
    //         if (user.password === values.password) {
    //           foundUser = true;
    //           // Login successful,
    //           if(doc.data().userLevel ==='Admin')
    //           {
    //             navigation.navigate('Tabs');
    //           }
    //           else
    //           {
    //             navigation.navigate('LiveOrders');
    //           }
                
              
    //         }
    //       });
    
    //       if (!foundUser) {
    //         throw new yup.ValidationError('Invalid password. Please try again.', null, 'password');
    //       }
    //     }
    //   } catch (error) {
    //     throw error;
    //   }
    // };
    

    const handleLogin = async (values) => {
      try {
        const usersCollection = firebase.firestore().collection('Staff');
        const querySnapshot = await usersCollection.where('email', '==', values.email).get();
    
        if (querySnapshot.empty) {
          throw new yup.ValidationError('User not found. Please check your email.', null, 'email');
        }
    
        let foundUser = false;
    
        for (const doc of querySnapshot.docs) {
          const user = doc.data();
    
          if (user.password === values.password) {
            foundUser = true;
            // Login successful
    
            const userData = {
              email: values.email,
              userLevel: doc.data().userLevel,
            
             
            };
    
            // Store the session
            await SessionManager.login(userData);
    
            // Navigate to the appropriate screen
            if (doc.data().userLevel === 'staff') {
              navigation.navigate('LiveOrders');
            } else {
              navigation.navigate('Tabs');
            }
    
            // Exit the loop since we've found the user
            break;
          }
        }
    
        if (!foundUser) {
          throw new yup.ValidationError('Invalid password. Please try again.', null, 'password');
        }
      } catch (error) {
        throw error;
      }
    };
    

 
    return (
      <View style={styles.container}>
        
      <Image href={require('./assets/logo.png')}/>
     <View style={styles.loginContainer}>
      <Text  style={styles.logo}>Hello There... </Text>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError }) => {
          try {
            // Check if the user's credentials are the admin credentials
            if (values.email === adminCredentials.email && values.password === adminCredentials.password) {
              
              navigation.navigate('Tabs');
            
              
            } else {
              // Handle login for regular users
              await handleLogin(values);
            }
          } catch (error) {
            // Handle validation errors
            if (error.name === 'ValidationError') {
             
              error.path && setFieldError(error.path, error.message);
            } else {
              console.log(error);
            }
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldError }) => (
          <View>
           
            <View style={styles.inputBox}>
              <Icon name="user" size={22} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                placeholderTextColor={COLORS.primary} 
              />
            </View>

            {touched.email && errors.email && <Text style={styles.errorLable}>{errors.email}</Text>}

            <View style={styles.inputBox}>
              <Icon name="lock" size={22} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={COLORS.primary} 
              />
            </View>

            {touched.password && errors.password && <Text style={styles.errorLable}>{errors.password}</Text>}

            <SecondaryButton onPress={handleSubmit} title="Login" />
            {/* <TouchableOpacity>
              <Text style={styles.forgot} onPress={() => navigation.navigate('Forget')}>
                Forgot Password?
              </Text>
            </TouchableOpacity> */}
          </View>
        )}
      </Formik>
      </View>
      
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLORS.white

  },

  loginContainer: {
  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLORS.white,
    elevation:20,
    width:800,
    margin:100,
    height:550

  },

  
  inputBox: {
    position: 'relative',
    flexDirection: 'row', // Change 'column' to 'row'
    alignItems: 'center',
    width:650,
    backgroundColor:COLORS.white,
    borderRadius:15,
    borderWidth:0.8,
    height:60,
    borderColor:COLORS.primary,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    fontSize:19,
    color:"black",
  },
  inputText: {
    
    flex: 1, 
    paddingLeft: 15, 
    fontSize:16,
  },
  forgot:{
    color:"black",
    fontSize:14,
    top:10,
    marginBottom:10,
    textAlign:"center",
  },
  errorLable:{
  color:COLORS.red,
  marginBottom:20,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:COLORS.primary,
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
  color:COLORS.primary,
  marginBottom:40
}
});
export default LoginScreen;