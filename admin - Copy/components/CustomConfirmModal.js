import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const CustomConfirmModal = ({ isVisible, onClose, onConfirm,message,title,ConfirmText,CancelText}) => {
  return (
    <Modal
      visible={isVisible}
     // animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.confirmModalContainer}>
        <View style={styles.confirmModal}>
          <Text style={styles.confirmModalTitle}>{title}</Text>
          <Text style={styles.confirmModalText}>
            {message}
          </Text>
          <View style={styles.confirmModalButtons}>

          <TouchableOpacity
              style={[styles.confirmModalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmModalButtonText}>{ConfirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmModalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>{CancelText}</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    confirmModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
      confirmModal: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        width: "50%",
      },
      confirmModalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
      },
      confirmModalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      confirmModalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      confirmModalButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
      },
      cancelButton: {
        backgroundColor: COLORS.white,
        borderColor:COLORS.primary,
        borderWidth:1

      },
      confirmButton: {
        backgroundColor: COLORS.primary,
      },
      confirmModalButtonText: {
        color:COLORS.white,
        fontSize: 16,
      },
      cancelButtonText: {
        color:COLORS.primary,
        fontSize: 16,
      },
});

export default CustomConfirmModal;
