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
import { AddButton } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddStaffModal from "../components/AddStaffModal";
import CustomConfirmModal from "../components/CustomConfirmModal";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [initialStaff, setInitialStaff] = useState(null); // Use initialStaff instead of initialCategory
  const [isRemoveUserModal, setIsRemoveUserModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const staffRef = firebase.firestore().collection("Staff");

  const fetchStaff = async () => {
    try {
      const snapshot = await staffRef.orderBy("createdAt", "asc").get(); // Order by createdAt field in descending order
      const staffData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaff(staffData);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  useEffect(() => {
    fetchStaff(); // Fetch staff data
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const removeStaffMember = (id) => {
    staffRef
      .doc(id)
      .delete()
      .then(() => {
        setIsRemoveUserModal(false);
        console.log("Staff member deleted successfully");
        fetchStaff();
        
      })
      .catch((error) => {
        console.error("Error deleting staff member:", error);
      });
  };

  const confirmModal = (id) => {
    setIsRemoveUserModal(true);
    setSelectedStaffId(id); 
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
          <Text style={styles.title}>Staff</Text>
        </View>
        <AddButton title={"+ Add New"} onPress={toggleModal} />
      </View>
      <View style={styles.seperator}></View>
      <ScrollView style={{ top: 30 }}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, styles.headerCell]}>Staff ID</Text>
            <Text style={[styles.cell, styles.headerCell]}>Staff Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>Email</Text>
            <Text style={[styles.headerCell]}>Action</Text>
           
          </View>
          {staff.map((item) => (
            <View style={styles.row} key={item.id}>
              <Text style={styles.cell}>{item.staffId}</Text>
              <Text style={styles.cell}>{item.staffName}</Text>
              <Text style={styles.cell}>{item.email}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => {
                    setModalVisible(true);
                    setIsEditModal(true);
                    setInitialStaff(item);
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
                <View style={styles.seperator2}></View>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => confirmModal(item.id)} 
                >
                  <Icon
                    name="account-remove"
                    color={COLORS.dark}
                    size={25}
                    fontWeight={"bold"}
                  />
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: "500",
                    }}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
                <CustomConfirmModal
                  isVisible={isRemoveUserModal}
                  title="Remove User"
                  ConfirmText="Confirm"
                  CancelText="Cancel"
                  message="Are you sure you want to remove the user?"
                  onClose={() => setIsRemoveUserModal(false)}
                  onConfirm={() => {
                    removeStaffMember(item.id); 
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <AddStaffModal
        isVisible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          setIsEditModal(false);
          setInitialStaff(null); 
        }}
        onAddStaff={fetchStaff}
        isEditMode={isEditModal}
        initialStaff={initialStaff} 
      />
    </SafeAreaView>
  );
};

export default Staff;

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 1,
    elevation: 20,
    shadowColor: COLORS.dark,
    backgroundColor: COLORS.white,
  },
  seperator2: {
    height: 50,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: COLORS.gray,
    marginRight: 10,
    elevation: 20,
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
