import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { firebase } from "../firebase";
import { PrimaryButton, CancelButton } from "../components/Button";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import * as yup from "yup";

const AddCategoryModal = ({
  isVisible,
  onClose,
  onAddCategory,
  isEditMode,
  initialCategory,
}) => {
  const validationSchema = yup.object().shape({
    categoryId: yup.string().required("Category ID is required"),
    categoryName: yup.string().required("Category Name is required"),
    description: yup.string().required("Description is required"),
  });

  const addRef = firebase.firestore().collection("Categories");

  const handleAddCategory = (values, { resetForm }) => {
    const { categoryId, categoryName, description } = values;

    const data = {
      categoryId: categoryId,
      categoryName: categoryName,
      description: description,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    addRef
      .add(data)
      .then(() => {
        resetForm();
        onAddCategory();
        onClose();
      })
      .catch((error) => {
        alert(error);
      });
  };

  //update categories
  const handleUpdateCategory = (values, { resetForm }) => {
    const { categoryId, categoryName, description } = values;


    const docIdToUpdate = initialCategory.id;

    const data = {
      categoryId: categoryId,
      categoryName: categoryName,
      description: description,
    };

    addRef
      .doc(docIdToUpdate)
      .update(data)
      .then(() => {
        resetForm();
        onAddCategory();
        onClose();
        alert("Data Successfully Updated");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close-box" color={COLORS.primary} size={40} />
          </TouchableOpacity>
         
          <Text style={styles.modalTitle}>
            {isEditMode ? "Update Category" : "Add Category"}
          </Text>
          <Formik
            initialValues={
              isEditMode
                ? initialCategory
                : { categoryId: "", categoryName: "", description: "" }
            }
            validationSchema={validationSchema}
            onSubmit={isEditMode ? handleUpdateCategory : handleAddCategory}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Category ID"
                  placeholderTextColor="#003f5c"
                  value={values.categoryId}
                  onChangeText={handleChange("categoryId")}
                />
                {touched.categoryId && errors.categoryId && (
                  <Text style={styles.errorText}>{errors.categoryId}</Text>
                )}

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Category Name"
                  placeholderTextColor="#003f5c"
                  // value={categoryName}
                  //  onChangeText={(categoryName) => setCategoryName(categoryName)}
                  value={values.categoryName}
                  onChangeText={handleChange("categoryName")}
                />
                {touched.categoryName && errors.categoryName && (
                  <Text style={styles.errorText}>{errors.categoryName}</Text>
                )}

                <TextInput
                  style={styles.TextInput}
                  placeholder="Description"
                  //  value={description}
                  placeholderTextColor="#003f5c"
                  //  onChangeText={(text) => setDescription(text)}
                  multiline={true}
                  numberOfLines={4}
                  value={values.description}
                  onChangeText={handleChange("description")}
                />
                {touched.description && errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    title={isEditMode ? "Update Category" : "Add Category"}
                    onPress={handleSubmit}
                  />
                  <CancelButton title="Cancel" onPress={onClose} />
                </View>
              </>
            )}
          </Formik>
          {/* <Formik
            initialValues={{ categoryId: '', categoryName: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={handleAddCategory}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Category ID"
                  placeholderTextColor="#003f5c"
                  value={values.categoryId}
                  onChangeText={handleChange('categoryId')}
                />
                {touched.categoryId && errors.categoryId && (
                  <Text style={styles.errorText}>{errors.categoryId}</Text>
                )}

             <TextInput
              style={styles.TextInput}
              placeholder="Enter Category Name"
              placeholderTextColor="#003f5c"
             // value={categoryName}
            //  onChangeText={(categoryName) => setCategoryName(categoryName)}
              value={values.categoryName}
              onChangeText={handleChange('categoryName')}
            />
            {touched.categoryName && errors.categoryName && (
                  <Text style={styles.errorText}>{errors.categoryName}</Text>
                )}

            <TextInput
              style={styles.TextInput}
              placeholder="Description"
            //  value={description}
              placeholderTextColor="#003f5c"
            //  onChangeText={(text) => setDescription(text)}
              multiline={true}
              numberOfLines={4}
              value={values.description}
              onChangeText={handleChange('description')}
            />
            {touched.description && errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
               
                <View style={styles.buttonContainer}>
            <PrimaryButton title="Add Category" onPress={handleSubmit} />
            <CancelButton title="Cancel" onPress={onClose} />
          </View>
              </>
            )}
          </Formik> */}
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
    padding: 16,
    backgroundColor: COLORS.white,
    width: "60%",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
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
    padding: 15,
    marginVertical: 15,
    minHeight: 70,
    width: "95%",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  closeButton: {
    alignSelf: "flex-end",
    top: -12,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingbottom: 30,
  },
});

export default AddCategoryModal;
