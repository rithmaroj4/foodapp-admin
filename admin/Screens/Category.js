import { StyleSheet, Text, View,TextInput,Dimensions ,SafeAreaView} from "react-native";
import React, { useState }  from 'react'
import { firebase } from "../firebase";
import { SecondaryButton } from "../components/Button";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddCategory = () => {

  const navigation = useNavigation();
  const {height, width} = Dimensions.get('window');
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const addRef = firebase.firestore().collection("Categories");

  const AddCategory = () => {
    // check if we have new field data
    const validateFields = () => {
      if (!categoryId.trim()) {
        alert("Please enter Category ID");
        return false;
      }
      if (!categoryName.trim()) {
        alert("Please enter Category Name");
        return false;
      }
      if (!description.trim()) {
        alert("Please enter Description");
        return false;
      }
      return true;
    };
  
   
      if (!validateFields()) {
        return; // If any field is empty, stop the function here
      }
  
      const data = {
        categoryId: categoryId,
        categoryName: categoryName,
        description: description,
      };
      addRef
        .add(data)
        .then(() => {
          setCategoryId("");
          setCategoryName("");
          setDescription("");
  
          alert("Added ");
        })
        .catch((error) => {
          alert(error);
        });
    };
  

  return (

    <SafeAreaView style={[styles.container, { height, width }]}>
       <View style={styles.container}>
      <Text style={styles.header}>Add Category</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter Category ID"
        placeholderTextColor="#003f5c"
        value={categoryId}
        onChangeText={(categoryId) => setCategoryId(categoryId)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Enter Category Name"
        placeholderTextColor="#003f5c"
        value={categoryName}
        onChangeText={(categoryName) => setCategoryName(categoryName)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Description"
        value={description}
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setDescription(text)}
      />

      <SecondaryButton title="Add data" onPress={AddCategory} />
      <TouchableOpacity onPress={() => navigation.navigate("ItemScreen")}></TouchableOpacity>
    </View>
    </SafeAreaView>
   
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    textAlign: "center",
    fontSize: 26,
    marginTop: 30,
    marginBottom:30,
    fontWeight: "bold",
  },
  TextInput: {
    borderWidth: 1,
    height: 50,
    borderColor: "black",
    marginLeft: 100,
    marginRight:100,
    padding: 5,
    fontSize: 18,
    fontSize: 22,
    margin:20,
    borderRadius: 6,
    justifyContent: "center",
  },
});
