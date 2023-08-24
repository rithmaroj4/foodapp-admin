import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from "@react-navigation/native";
import SessionManager from '../store/SessionManager';
import COLORS from '../constants/colors';

const LogoutScreen = () => {
  const navigation = useNavigation();
  const adminCredentials = {
    email: 'admin@gmail.com',
   
   
  };
  const handleClearLogout = () => {
    // Perform logout logic, clear session, etc.

    // Navigate to the Login screen
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });

    navigation.dispatch(resetAction);
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await SessionManager.getSession();
      setUser(userData);
    }

    fetchUserData();
  }, []);

  
  const handleLogout = async () => {
  
    await SessionManager.logout();
   
    handleClearLogout();
  };

  const handleCancel = () => {
   
    if (user && user.userLevel === 'staff') {
      navigation.navigate('LiveOrders');
     
    } else {
      navigation.navigate('ITEMS');
     
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Logout</Text>
      <View>
      {user ? (
        <Text style={styles.title}>Hi, {user.email}</Text>
      ) : (
        <Text style={styles.title}>Hi, {adminCredentials.email}</Text>
      )}
    
    </View>
      <Text style={styles.message}>Are you sure you want to log out?</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelText}>cancel</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin:10,
   
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton:{
    backgroundColor: COLORS.white,
    borderColor:COLORS.primary,
    borderWidth:1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin:10,
  },
  cancelText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
