import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { firebase } from "../firebase";
import { PrimaryButton, CancelButton } from "../components/Button";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as yup from "yup";

const AddStaffModal = ({
  isVisible,
  onClose,
  onAddStaff,
  isEditMode,
  initialStaff,
}) => {
  const validationSchema = yup.object().shape({
    staffName: yup.string().required("Staff Name is required"),
    staffId: yup.string().required("Staff ID is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    userLevel: yup.string().required("User Level is required"),
  });

  const staffRef = firebase.firestore().collection("Staff");

  const handleAddStaff = (values, { resetForm }) => {
    const { staffName, staffId, email, password } = values;

    const data = {
      staffName: staffName,
      staffId: staffId,
      email: email,
      password: password,
      userLevel: values.userLevel,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    staffRef
      .add(data)
      .then(() => {
        resetForm();
        onAddStaff();
        onClose();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleUpdateStaff = (values, { resetForm }) => {
    const { staffName, staffId, email, password } = values;

    const docIdToUpdate = initialStaff.id;

    const data = {
      staffName: staffName,
      staffId: staffId,
      email: email,
      password: password,
    };

    staffRef
      .doc(docIdToUpdate)
      .update(data)
      .then(() => {
        resetForm();
        onAddStaff();
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
            {isEditMode ? "Update Staff" : "Add Staff"}
          </Text>
          <Formik
            initialValues={
              isEditMode
                ? initialStaff
                : { staffName: "", staffId: "", email: "", password: "",userLevel: "", }
            }
            validationSchema={validationSchema}
            onSubmit={isEditMode ? handleUpdateStaff : handleAddStaff}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
              

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Staff ID"
                  placeholderTextColor="#003f5c"
                  value={values.staffId}
                  onChangeText={handleChange("staffId")}
                />
                {touched.staffId && errors.staffId && (
                  <Text style={styles.errorText}>{errors.staffId}</Text>
                )}

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Staff Name"
                  placeholderTextColor="#003f5c"
                  value={values.staffName}
                  onChangeText={handleChange("staffName")}
                />
                {touched.staffName && errors.staffName && (
                  <Text style={styles.errorText}>{errors.staffName}</Text>
                )}

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Email"
                  placeholderTextColor="#003f5c"
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter Password"
                  placeholderTextColor="#003f5c"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

               <View style={styles.pickerContainer}>
                 
                  <Picker
                    style={styles.picker}
                    selectedValue={values.userLevel}
                    onValueChange={handleChange("userLevel")}
                  >
                    <Picker.Item label="Select User Level" value="" />
                    <Picker.Item label="Admin" value="admin" />
                    <Picker.Item label="Staff" value="staff" />
                  
                  </Picker>
                </View>
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    title={isEditMode ? "Update Staff" : "Add Staff"}
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
    padding: 14,
    backgroundColor: COLORS.white,
    width: "60%",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    maxHeight:690
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
  //  minHeight: 70,
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
    top: -2,
    position:"absolute"
  },
  buttonContainer: {
    flexDirection: "row",
    paddingBottom: 30,
  },
  pickerContainer: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    padding: 15,
    marginVertical: 15,
    // minHeight: 70,
    width: "95%",
    height: 50,
    justifyContent: "center",
   
  },
  pickerItemLabel: {
    fontSize: 18, 
    color: "#003f5c", 
  },
});

export default AddStaffModal;
