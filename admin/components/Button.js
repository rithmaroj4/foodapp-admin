import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../constants/colors";

const SecondaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
        <Text style={{ ...style.title, color:COLORS.white}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const DetailButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor:COLORS.white }}>
        <Text style={{ ...style.title, color: COLORS.dark}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const PrimaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.primaryButton, backgroundColor: COLORS.primary }}>
        <Text style={{ ...style.title, color: COLORS.white }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DecrementButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={style.actionBtn} onPress={onPress}>
      <Icon name="remove" size={30} color={Colors.white} />
    </TouchableOpacity>
  );
};

const IncrementButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={style.actionBtn} onPress={onPress}>
      <Icon name="add" size={30} color={Colors.white} />
    </TouchableOpacity>
  );
};

const IntroButton = ({title,onPress=()=>{}}) => {
  return (
    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', }}activeOpacity={0.8} onPress={onPress}>
        <View style={style.btnContainer1}>
            <Text style={style.title}>{title}</Text>
        </View>

    </TouchableOpacity>
  );
};

const CancelButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.CancelButton}}>
        <Text style={{ ...style.title, color: COLORS.primary }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const AddButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.AddButton}}>
        <Text style={{ ...style.title, color: COLORS.white }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: { color: "white", fontWeight: "bold", fontSize: 20 },
  btnContainer: {
    height: 60,
    marginLeft: 120,
    marginRight: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    width: 75,
    height: 50,
    margin: 5,
    backgroundColor: "#F07048",
    borderRadius: 18,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: "#F07048",
    width: 250,
    height: 57,
    padding: 12,
    borderRadius: 20,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  title:{
    color:COLORS.white, 
    fontWeight:'bold', 
    fontSize:20
},
btnContainer1:{
    backgroundColor:COLORS.primary,
    height:60,
    width:500,
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',

    },
CancelButton:{
    
  width:150,
  borderColor:COLORS.primary,
  borderWidth:2,
  //height: 60,
  padding: 12,
  borderRadius: 20,
  margin: 20,
  justifyContent: "center",
  alignItems: "center",
},
AddButton:{
  width:"auto",
  padding: 12,
  borderRadius: 10,
  margin: 20,
  backgroundColor:COLORS.primary,
  justifyContent: "center",
  alignItems: "center",
},

});

export {
  SecondaryButton,
  IncrementButton,
  DecrementButton,
  PrimaryButton,
  DetailButton,
  IntroButton,
  CancelButton,
  AddButton
};
