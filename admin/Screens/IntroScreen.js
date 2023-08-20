import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import { IntroButton, PrimaryButton } from '../components/Button';
import { useNavigation } from '@react-navigation/native';


const IntroScreen = () => {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ height: 320 ,marginBottom:100}}>
        <Image
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 320,
            resizeMode: 'contain',
            top: 80,
          }}
          source={require('../assets/logo/logo.png')}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={{}}>
  
          <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
            Admin
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: COLORS.gray,
            }}>
            Food made with love.
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />

        </View>
        <IntroButton
         onPress={()=> navigation.navigate("Login")} 
         title={"Get Started"}/>
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },

  indicatorContainer: {
    height: 20, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  currentIndicator: {
    height: 12, 
    width: 30, 
    borderRadius: 10,
    backgroundColor: COLORS.primary, 
    marginHorizontal: 5, 
  },
  indicator:
  {
    height:12,
    width:12,
    borderRadius:6,
    backgroundColor:COLORS.gray,
    marginHorizontal:5,
  },
});