import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";

export default function App() {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();

  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("1");

  const todoRef = firebase.firestore().collection("Products");

  const [categories, setCategories] = useState([]); // State to store categories fetched from Firestore
  
  // Fetch categories from Firestore
  useEffect(() => {
    const categoriesRef = firebase.firestore().collection("Categories");

    categoriesRef
      .get()
      .then((querySnapshot) => {
        const categoriesData = querySnapshot.docs.map((doc) => ({
          label: doc.data().categoryName,
          value: doc.data().id,
        }));
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const validateFields = () => {
    if (!itemName.trim() || !image.trim() || !image1.trim() || !image2.trim() || !price.trim() || !description.trim() || !category.trim()) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };
  const dataAddOn = () => {
    // Check if any of the required fields are empty
    if (!validateFields()) {
      return; // Stop the function if any field is empty
    }
    // check if we have new field data

    const data = {
      itemName: itemName,
      image: image,
      image1: image1,
      image2: image2,
      price: parseInt(price),
      description: description,
      category: category,
      quantity: parseInt(quantity),
    };
    todoRef
      .add(data)
      .then(() => {
          setItemName("");
          setImage("");
          setImage1("");
          setImage2("");
          setPrice("");
          setDescription("");
          setCategory("");
          setQuantity("1");

        alert("Added ");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="ITEM NAME"
          placeholderTextColor="#003f5c"
          onChangeText={(text) =>  setItemName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="IMAGE URL 1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setImage(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="IMAGE URL 2"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setImage1(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="IMAGE URL 3"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setImage2(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="ITEM DETAIL"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="ITEM PRICE"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPrice(text)}
        />
      </View>
     
      <View style={styles.inputView} >
          <Text 
          style={styles.inputText}
          onPress={() => setIsDropdownVisible(true)}>
            {category ? category : "---Select foodType----"}
          </Text>
        </View>
        {isDropdownVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isDropdownVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.closeButton} onPress={() => setIsDropdownVisible(false)}>Close</Text>
                {categories.map((category) => (
                  <Text
                    key={category.value}
                    onPress={() => {
                      setCategory(category.label);
                      setIsDropdownVisible(false);
                    }}
                    style={styles.categoryOption}
                  >
                    {category.label}
                  </Text>
                ))}
              </View>
            </View>
          </Modal>
        )}
      

      {/* <View style={styles.inputView}>
        <Picker
          selectedValue={category}
          onValueChange={(text) => setCategory(text)}
        >
          <Picker.Item label="---Select foodType----" value="" />
          {categories.map((category) => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>
      </View> */}

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.forgot} onPress={dataAddOn}>
          ADD ITEM
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDB59E",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "white",
    fontSize: 14,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#F07048",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 100,
    fontWeight: "bold",
  },
  closeContainer: {
    height: "20%",
    width: "20%",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    borderRadius: 20,
  },
 
  
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    maxHeight: "70%", 
    justifyContent:"center",
  },
  closeButton: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: "bold",
 
    color: "#007bff",
  },
  categoryOption: {
    fontSize: 23,
    marginBottom: 10,
    color: "#333",
  },
});
