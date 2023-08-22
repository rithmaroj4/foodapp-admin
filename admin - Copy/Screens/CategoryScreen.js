// import { StyleSheet, Text, View,TextInput,Dimensions ,SafeAreaView} from "react-native";
// import React, { useState }  from 'react'
// import { firebase } from "../firebase";
// import { SecondaryButton } from "../components/Button";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const AddCategory = () => {

//   const navigation = useNavigation();
//   const {height, width} = Dimensions.get('window');
//   const [categoryId, setCategoryId] = useState("");
//   const [categoryName, setCategoryName] = useState("");
//   const [description, setDescription] = useState("");

//   const addRef = firebase.firestore().collection("Categories");

//   const AddCategory = () => {
//     // check if we have new field data
//     const validateFields = () => {
//       if (!categoryId.trim()) {
//         alert("Please enter Category ID");
//         return false;
//       }
//       if (!categoryName.trim()) {
//         alert("Please enter Category Name");
//         return false;
//       }
//       if (!description.trim()) {
//         alert("Please enter Description");
//         return false;
//       }
//       return true;
//     };

//       if (!validateFields()) {
//         return; // If any field is empty, stop the function here
//       }

//       const data = {
//         categoryId: categoryId,
//         categoryName: categoryName,
//         description: description,
//       };
//       addRef
//         .add(data)
//         .then(() => {
//           setCategoryId("");
//           setCategoryName("");
//           setDescription("");

//           alert("Added ");
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     };

//   return (

//     <SafeAreaView style={[styles.container, { height, width }]}>
//        <View style={styles.container}>
//       <Text style={styles.header}>Add Category</Text>
//       <TextInput
//         style={styles.TextInput}
//         placeholder="Enter Category ID"
//         placeholderTextColor="#003f5c"
//         value={categoryId}
//         onChangeText={(categoryId) => setCategoryId(categoryId)}
//       />

//       <TextInput
//         style={styles.TextInput}
//         placeholder="Enter Category Name"
//         placeholderTextColor="#003f5c"
//         value={categoryName}
//         onChangeText={(categoryName) => setCategoryName(categoryName)}
//       />

//       <TextInput
//         style={styles.TextInput}
//         placeholder="Description"
//         value={description}
//         placeholderTextColor="#003f5c"
//         onChangeText={(text) => setDescription(text)}
//       />

//       <SecondaryButton title="Add data" onPress={AddCategory} />
//       <TouchableOpacity onPress={() => navigation.navigate("ItemScreen")}></TouchableOpacity>
//     </View>
//     </SafeAreaView>

//   );
// };

// export default AddCategory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   header: {
//     textAlign: "center",
//     fontSize: 26,
//     marginTop: 30,
//     marginBottom:30,
//     fontWeight: "bold",
//   },
//   TextInput: {
//     borderWidth: 1,
//     height: 50,
//     borderColor: "black",
//     marginLeft: 100,
//     marginRight:100,
//     padding: 5,
//     fontSize: 18,
//     fontSize: 22,
//     margin:20,
//     borderRadius: 6,
//     justifyContent: "center",
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import AddCategoryModal from "../components/AddCategoryModal";
import { AddButton } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddCategory = () => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const [isEditModal, setIsEditModal] = useState(false); // New state for edit mode
  const [initialCategory, setInitialCategory] = useState(null);

  const addRef = firebase.firestore().collection("Categories");

  const fetchCategories = async () => {
    const snapshot = await addRef.orderBy("createdAt", "asc").get();
    const categoriesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <View style={styles.titleView}>
          <Text style={styles.title}>Categories</Text>
        </View>
        <AddButton title={"+ Add New"} onPress={toggleModal} />
      </View>
      <View style={styles.seperator}></View>

      {/* <FlatList
        style={styles.table}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.categoryName}</Text>
            <Text>{item.categoryId}</Text>
            <Text>{item.description}</Text>
          
          </View>
        )}
      /> */}
      <ScrollView style={{ top: 30 }}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, styles.headerCell]}>Category ID</Text>
            <Text style={[styles.cell, styles.headerCell]}>Category Name</Text>
            <Text style={[styles.descriptionCell, styles.headerCell]}>
              Description
            </Text>
            <Text style={[styles.headerCell]}>Action</Text>
           
          </View>
          {categories.map((item) => (
            <View style={styles.row} key={item.id}>
              <Text style={styles.cell}>{item.categoryId}</Text>
              <Text style={styles.cell}>{item.categoryName}</Text>
              <Text style={styles.descriptionCell}>{item.description}</Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => {
                    setModalVisible(true);
                    setIsEditModal(true);
                    setInitialCategory(item);
                  }}
                >
                  <Icon
                    name="square-edit-outline"
                    color={COLORS.dark}
                    size={25}
                    fontWeight={"bold"}
                  />
                  <Text
                    style={{
                      color: COLORS.primary,
                      //  fontSize: 25,
                      fontWeight: "500",
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <AddCategoryModal
        isVisible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          setIsEditModal(false); // Reset edit mode
          setInitialCategory(null); // Reset initial category
        }}
        onAddCategory={fetchCategories}
        isEditMode={isEditModal}
        initialCategory={initialCategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 1,
    elevation: 20,
    shadowColor: COLORS.dark,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "flex-end",
  },
  title: {
    fontSize: 35,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  titleView: {
    marginLeft: 40,
  },

  table: {
    top: 0,
    right: 0,
    padding: 50,
    // width: Dimensions.get("window").width * 0.9,
    // position: "absolute",
  },

  floatingButton: {
    position: "relative",
    bottom: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    top: 20,
    right: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: COLORS.gray,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
  },
  cell: {
    flex: 1,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
  },
  descriptionCell: {
    flex: 4,
    marginRight: 30,
    // Adjust the flex value to control the width of the column
  },
  editButtonText: {
    color: COLORS.white,
  },
});

export default AddCategory;
