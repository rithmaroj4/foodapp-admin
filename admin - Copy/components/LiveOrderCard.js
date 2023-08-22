import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const LiveOrderCard = ({ orders , onDelete }) => {
  const {
    orderID,
    customer,
    items,
    orderStatus,
    totalPrice,
    tableNumber,
    orderingMethod,
  } = orders;

  return (
   
     <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Order Details</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.sectionForCs}>
          <Text style={styles.sectionHeader}>Order ID:</Text>
          <Text style={styles.sectionText}> {orderID} </Text>
        </View>

        <View style={styles.sectionForCs}>
          <Text style={styles.sectionHeader}>Customer Name:</Text>
          <Text style={styles.sectionText}> {customer.name}</Text>
        </View>

        <View style={styles.sectionForCs}>
          <Text style={styles.sectionHeader}>Customer Email:</Text>
          <Text style={styles.sectionText}> {customer.email}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {items.map((item, index) => (
          <View style={styles.section} key={index}>
            <Text style={styles.sectionHeader}>Item:</Text>
            <Text style={styles.sectionText}>{item.itemName
}</Text>
            <Text style={styles.sectionText}>Quantity: {item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.sectionForInfo}>
          <View style={styles.sectionForCs}>
            <Text style={styles.sectionHeader}>Order Status:</Text>
            <Text style={styles.sectionText}> {orderStatus}</Text>
          </View>

          <View style={styles.sectionForCs}>
            <Text style={styles.sectionHeader}>Ordering Method:</Text>
            <Text style={styles.sectionText}> {orderingMethod}</Text>
          </View>

          <View style={styles.sectionForCs}>
            <Text style={styles.sectionHeader}>Table Number:</Text>
            <Text style={styles.sectionText}> {tableNumber}</Text>
          </View>
        </View>

        <Text style={styles.totalPrice}>Total Price: Rs {totalPrice}</Text>

        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity
            onPress={onDelete} // Call the onDelete function passed as prop
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>


      </View>
      
    </View>
   
  );
};

export default LiveOrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    // backgroundColor: COLORS.lightBackground,
    width: 650,
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    elevation: 2,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    paddingBottom: 10,
    marginBottom: 10,
  },
  cardHeaderText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContent: {
    marginBottom: 15,
  },
  sectionForCs: {
    flexDirection: "row",
    marginBottom: 8,
  },

  sectionForInfo: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
    paddingTop: 10,
  },
  totalPrice: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  deleteButtonContainer: {
    alignItems: "flex-end",
  },
  deleteButton: {
    padding: 8,
  },
});
