import { StyleSheet, Text, View, ScrollView, SafeAreaView ,TextInput,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const OrderScreen = () => {
  const [orders, setOrders] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");

  const ordersRef = firebase.firestore().collection("Orders"); 

  const fetchOrders = async () => {
    try {
      const snapshot = await ordersRef.orderBy("orderedAt", "asc").get();
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 // search order

 useEffect(() => {
  if (searchQuery === "") {
    fetchOrders(); 
    return;
  }

  // Filter the orders based on search query
  const filteredOrders = orders.filter((order) => {
    const orderStatusMatch = order.orderStatus.toLowerCase().includes(searchQuery.toLowerCase());
    const customerNameMatch = order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const customerEmailMatch = order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const itemNameMatch = order.items.some(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()));
    const orderingMethodMatch = order.orderingMethod.toLowerCase().includes(searchQuery.toLowerCase());
    const orderIdMatch = order.id.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      orderStatusMatch ||
      customerNameMatch ||
      customerEmailMatch ||
      itemNameMatch ||
      orderingMethodMatch ||
      orderIdMatch
    );
  });

  // Sort the filtered orders based on orderingMethod
  const sortedOrders = filteredOrders.slice().sort((a, b) => {
    return a.orderingMethod.localeCompare(b.orderingMethod);
  });

  setOrders(sortedOrders);
}, [searchQuery]);

  

  return (
    <SafeAreaView style={styles.container}>
            <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
          top:20
        }}
      >
        <View style={styles.titleView}>
          <Text style={styles.title}>Orders</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.searchBar}>
            <TextInput
              placeholder="....Search here...."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.searchButton}
             
            >
              <Icon name="magnify" color={COLORS.white} size={25} />
            </TouchableOpacity>
          </View>

         
        </View>
      </View>
      <View style={styles.seperator}></View>
      <ScrollView style={{ top: 30 }}>
        {/* Orders Table */}
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.cell2, styles.headerCell]}>Order ID</Text>
            <Text style={[styles.cell2, styles.headerCell]}>
              Customer Details
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>
              Ordering Method
            </Text>
            <Text style={[styles.cell2, styles.headerCell]}>Items</Text>
            <Text style={[styles.cell, styles.headerCell]}>Total </Text>
            <Text style={[styles.cell, styles.headerCell]}>Order Status</Text>
          </View>
          {orders.map((order) => (
            <View style={styles.row} key={order.id}>
              <Text style={styles.cell2}>{order.id}</Text>
              <View style={{ flexDirection: "column", flex: 2 }}>
                <Text style={styles.cell}>{order.customer.name}</Text>
                <Text style={styles.cell}>{order.customer.email}</Text>
                <Text style={styles.cell}>{order.customer.phone}</Text>
              </View>
              <Text style={styles.cell}>{order.orderingMethod}</Text>

              <View style={{ flexDirection: "column", flex: 2 }}>
                {order.items.map((item) => (
                  <Text key={item.id} style={styles.itemText}>
                    {`${item.itemName} x${item.quantity}`}
                  </Text>
                ))}
              </View>

              <Text style={styles.cell}>Rs.{order.totalPrice}.00</Text>
              <Text
                style={[
                  styles.cell,
                  { fontWeight:"bold",color: order.orderStatus === "Pending" ? "red" : "green" },
                ]}
              >
                {order.orderStatus}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  seperator: {
    width: "100%",
    height: 1,
    elevation: 20,
    shadowColor: COLORS.dark,
    backgroundColor: COLORS.white,
    top:20
  },
  title: {
    fontSize: 35,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  titleView: {
    marginLeft: 40,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    // flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginRight: 10,
    width: 300,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
    marginRight: 20,
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
  cell2:{
    flex: 2,
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
