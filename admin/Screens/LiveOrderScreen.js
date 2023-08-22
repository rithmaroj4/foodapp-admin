import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import LiveOrderCard from "../components/LiveOrderCard";
import { firebase, db } from "../firebase";
import { ref, onValue, off, remove } from "firebase/database";
import COLORS from "../constants/colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { CommonActions, useNavigation } from "@react-navigation/native";

const LiveOrderScreen = () => {
  const [orders, setOrders] = useState([]);

  const navigation=useNavigation(); 

  useEffect(() => {
    const startCountRef = ref(db, "Orders");

    const ordersListener = onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newOrders = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOrders(newOrders);
      } else {
        setOrders([]);
      }
    });

    return () => {
      off(ordersListener);
    };
  }, []);

 //update orderstaus 

  const handleUpdateOrderStatus = (orderID) => {
    const docIdToUpdate =  firebase.firestore().collection("Orders").doc(orderID); // Replace this with the actual document ID
    const updatedStatus = 'Done';

    try {
       docIdToUpdate
        .update({
          orderStatus: updatedStatus
        });

      //setOrderStatus(updatedStatus);
      console.log('Order status updated successfully');
    } catch (error) {
      alert('Error updating order status: ' + error);
    }
  };

  const handleOrderDelete = (orderId, OId) => {
    // Confirm with the user before deleting
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {

            handleUpdateOrderStatus(OId);
            // Delete order from Firebase database
            const orderRef = ref(db, `Orders/${orderId}`);
            remove(orderRef)
              .then(() => {
                // Order deleted successfully, update local state
                setOrders((prevOrders) =>
                  prevOrders.filter((order) => order.id !== orderId)
                );

              })
              .catch((error) => {
                console.error("Error deleting order:", error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleCountdownFinish = () => {
    //navigation.navigate('Intro');
    const resetAction = CommonActions.reset({
      index: 0, // index of the screen to navigate to
      routes: [{ name: "Login" }], // name of the first screen
    });

    navigation.dispatch(resetAction);
  };

  return (


    
    <View style={styles.container}>
      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin:20,
          paddingHorizontal:30
         
        }}
      >
      
        <Text style={styles.containerTitle}>Orders</Text>
       
        <TouchableOpacity
       
       onPress={()=> navigation.navigate("Login") }
     
      >
      <FontAwesome5 name="sign-out-alt" color={COLORS.primary} size={28} />
      </TouchableOpacity>
      </View>
      <View style={styles.seperator}></View>
     
<View style={styles.ordersContainer} >


     
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>No orders found.</Text>
        ) : (
          orders.map((order, index) => (
            <LiveOrderCard
              key={index}
              orders={order}
              onDelete={() => handleOrderDelete(order.id,order.orderID)}
            />
          ))
        )}
      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
  ordersContainer: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.white
  },
  
  containerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color:COLORS.primary
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  seperator: {
    width: "100%",
    height: 1,
    elevation: 20,
    shadowColor: COLORS.dark,
    backgroundColor: COLORS.white,
    marginBottom:20
  },
});

export default LiveOrderScreen;
