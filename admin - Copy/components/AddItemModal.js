import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import * as yup from "yup";
import { PrimaryButton, CancelButton } from "../components/Button";
import COLORS from "../constants/colors";
import { firebase } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import IsLiveCheckbox from "./IsLiveCheckbox";

const AddItemModal = ({
  isVisible,
  onClose,
  onAddItem,
  isEditMode,
  initialItem,
}) => {
  const validationSchema = yup.object().shape({
    itemName: yup.string().required("Item Name is required"),
    image: yup.string().required("Image URL1 is required"),
    image1: yup.string().required("Image URL2 is required"),
    image2: yup.string().required("Image URL3 is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
  });

  const [categories, setCategories] = useState([]);
  const [IsLive, setIsLive] = useState(initialItem?.IsLive || "1");
  

  const productsRef = firebase.firestore().collection("Products");

  // Fetch categories from Firestore
  useEffect(() => {
    const categoriesRef = firebase.firestore().collection("Categories");

    categoriesRef
      .get()
      .then((querySnapshot) => {
        const categoriesData = querySnapshot.docs.map((doc) => ({
          label: doc.data().categoryName,
          catId: doc.id,
        }));
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);

  //add and update

  const handleAddItem = (values, { resetForm }) => {
    const {
      itemName,
      image,
      image1,
      image2,
      price,
      description,
      category,
      quantity,
    } = values;

    const data = {
      itemName: itemName,
      image: image,
      image1: image1,
      image2: image2,
      price: parseFloat(price),
      description: description,
      category: category,
      quantity: parseInt(quantity),
      IsLive: IsLive,
     // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      // other fields
    };

    if (isEditMode) {
      // Update existing item
      productsRef
        .doc(initialItem.id) // Use the document ID of the existing item
        .update(data)
        .then(() => {
          alert("Updated");
          onClose();
          resetForm();
          if (onAddItem) {
            onAddItem();
          }
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    } else {
      // Add new item
      productsRef
        .add(data)
        .then(() => {
          alert("Added");
          onClose();
          resetForm();
          if (onAddItem) {
            onAddItem();
          }
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  };

  const handleToggleIsLive = () => {
   // console.log("Before toggle: IsLive =", IsLive);
    setIsLive((prevIsLive) => (prevIsLive === "1" ? "0" : "1"));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close-box" color={COLORS.primary} size={40} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            {isEditMode ? "Update Item" : "Add Item"}
          </Text>

          <Formik
            initialValues={{
              itemName: initialItem?.itemName || "",
              image: initialItem?.image || "",
              image1: initialItem?.image1 || "",
              image2: initialItem?.image2 || "",
              price: initialItem?.price?.toString() || "",
              description: initialItem?.description || "",
              category: initialItem?.category || "",
              quantity: "1",
              IsLive: isEditMode ? initialItem?.IsLive || "0" : "1",
              // Initialize other fields
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddItem}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Item Name"
                  placeholderTextColor="#003f5c"
                  value={values.itemName}
                  onChangeText={handleChange("itemName")}
                />
                {touched.itemName && errors.itemName && (
                  <Text style={styles.errorText}>{errors.itemName}</Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.TextInput2}
                      placeholder="Enter Image URL1"
                      placeholderTextColor="#003f5c"
                      value={values.image}
                      onChangeText={handleChange("image")}
                    />
                    {touched.image && errors.image && (
                      <Text style={styles.errorText}>{errors.image}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.TextInput2}
                      placeholder="Enter Image URL2"
                      placeholderTextColor="#003f5c"
                      value={values.image1}
                      onChangeText={handleChange("image1")}
                    />
                    {touched.image1 && errors.image1 && (
                      <Text style={styles.errorText}>{errors.image1}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.TextInput2}
                      placeholder="Enter Image URL3"
                      placeholderTextColor="#003f5c"
                      value={values.image2}
                      onChangeText={handleChange("image2")}
                    />
                    {touched.image2 && errors.image2 && (
                      <Text style={styles.errorText}>{errors.image2}</Text>
                    )}
                  </View>
                </View>

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Price"
                  placeholderTextColor="#003f5c"
                  value={values.price}
                  onChangeText={handleChange("price")}
                  keyboardType="numeric"
                />
                {touched.price && errors.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Description"
                  placeholderTextColor="#003f5c"
                  multiline={true}
                  numberOfLines={2}
                  value={values.description}
                  onChangeText={handleChange("description")}
                />

                {touched.description && errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <View style={{ flexDirection: "row", width: "95%" }}>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.category}
                      onValueChange={handleChange("category")}
                    >
                      <Picker.Item label="---Select foodType----" value="" />
                      {categories.map((category) => (
                        <Picker.Item
                        key={category.catId} // Add a unique key prop here
                        label={category.label}
                        value={category.label}
                      />
                      ))}
                    </Picker>
                  </View>


                  <View style={styles.IsLive}>
                    <Text style={styles.IsLiveText}>In Stock:</Text>
                    <IsLiveCheckbox
                      isChecked={values.IsLive === "1"}
                      onPress={() => {
                        handleChange("IsLive")(
                          values.IsLive === "1" ? "0" : "1"
                        );
                        handleToggleIsLive();
                      }}
                    />
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    title={isEditMode ? "Edit Item" : "Add Item"}
                    onPress={handleSubmit}
                  />
                  <CancelButton title="Cancel" onPress={onClose} />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 10,
    backgroundColor: COLORS.white,
    width: "60%",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 690,
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  TextInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    // minHeight: 70,
    width: "95%",
  },
  TextInput2: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    // minHeight: 70,
    width: "98%",
  },
  picker: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    // minHeight: 70,
    width: "50%",
    height: 50,
    justifyContent: "center",
    marginRight: 50,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  errorText2: {
    color: "red",
    fontSize: 18,
    marginLeft: 20,
    alignSelf: "baseline",
  },
  closeButton: {
    alignSelf: "flex-end",
    top: -2,
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  IsLive: {
    flexDirection: "row",
    alignItems: "center",
  },
  IsLiveText: {
    marginRight: 20,
    fontSize: 18,
  },
});

export default AddItemModal;
