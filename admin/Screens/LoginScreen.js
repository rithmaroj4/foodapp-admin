import React from 'react';
import { StyleSheet, Text, View ,  Dimensions , TextInput , TouchableOpacity,Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import { Formik } from 'formik';
import * as yup from 'yup';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace 'FontAwesome' with the appropriate icon library

  
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
      password: 'admin123',
    };

    const handleLogin = async (values) => {
      try {
        const usersCollection = firebase.firestore().collection('Staff');
        const querySnapshot = await usersCollection.where('email', '==', values.email).get();
        if (querySnapshot.empty) {
          throw new yup.ValidationError('User not found. Please check your email.', null, 'email');
        } else {
          let foundUser = false;
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            if (user.password === values.password) {
              foundUser = true;
              // Login successful,
              navigation.navigate('Tabs');
            }
          });
    
          if (!foundUser) {
            throw new yup.ValidationError('Invalid password. Please try again.', null, 'password');
          }
        }
      } catch (error) {
        throw error;
      }
    };
    

 
    return (
      <View style={styles.container}>
        
      <Image href={require('./assets/logo.png')}/>
     
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
              // Formik's `setFieldError` will display the error messages below the input fields
              // It automatically checks for the 'path' in the validation error and sets the error message for that field
              error.path && setFieldError(error.path, error.message);
            } else {
              console.log(error);
            }
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldError }) => (
          <View>
            {/* Your Formik form code */}
            <View style={styles.inputBox}>
              <Icon name="user" size={22} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputText}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                placeholderTextColor={COLORS.primary} // Optional, change placeholder text color
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
                placeholderTextColor={COLORS.primary} // Optional, change placeholder text color
              />
            </View>

            {touched.password && errors.password && <Text style={styles.errorLable}>{errors.password}</Text>}

            <SecondaryButton onPress={handleSubmit} title="Login" />
            <TouchableOpacity>
              <Text style={styles.forgot} onPress={() => navigation.navigate('Forget')}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
 
      
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  inputBox: {
    position: 'relative',
    flexDirection: 'row', // Change 'column' to 'row'
    alignItems: 'center',
    width:650,
    backgroundColor:"#FFFFFF",
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
export default LoginScreen;