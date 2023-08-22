import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../firebase";
import { AddButton } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddItemModal from "../components/AddItemModal"; // Import your AddItemModal component
import COLORS from "../constants/colors";

const Items = () => {
  const { height, width } = Dimensions.get("window");
  const [items, setItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const [isEditModal, setIsEditModal] = useState(false);
  const [initialItem, setInitialItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const itemsRef = firebase.firestore().collection("Products");

  const fetchItems = async () => {
   // const snapshot = await itemsRef.orderBy("createdAt", "asc").get();
    const snapshot = await itemsRef.get();
    const itemsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(itemsData);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const performSearch = () => {
    const filteredItems = items.filter((item) => {
      const itemNameMatch = item.itemName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const priceMatch = item.price.toString().includes(searchQuery);
      const categoryMatch = item.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return itemNameMatch || priceMatch || categoryMatch;
    });
    setSearchResults(filteredItems);
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, items]);
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
          <Text style={styles.title}>Items</Text>
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
              onPress={performSearch}
            >
              <Icon name="magnify" color={COLORS.white} size={25} />
            </TouchableOpacity>
          </View>

          <AddButton title={"+ Add New"} onPress={toggleModal} />
        </View>
      </View>
      <View style={styles.seperator}></View>
      <ScrollView style={{ top: 30 }}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, styles.headerCell]}>Item Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>Category</Text>
            <Text style={[styles.cell, styles.headerCell]}>Price</Text>
            <Text style={[styles.cell, styles.headerCell]}>Image </Text>
            <Text style={[styles.descriptionCell, styles.headerCell]}>
              Description
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>In Stock </Text>
            <Text style={[styles.headerCell]}>Action</Text>
          </View>
          {searchResults.map((item) => (
            <View style={styles.row} key={item.id}>
              <Text style={styles.cell}>{item.itemName}</Text>
              <Text style={styles.cell}>{item.category}</Text>
              <Text style={styles.cell}>{item.price}</Text>
              <View style={styles.cell}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 70, height: 70 }}
                />
              </View>
              <Text style={styles.descriptionCell}>{item.description}</Text>
              <Text
                style={[
                  styles.cell,
                  { fontWeight:"bold",color: item.IsLive === "1" ? "green" : "red" },
                ]}
              >
                {item.IsLive === "1" ? "Yes" : "No"}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => {
                    setModalVisible(true);
                    setIsEditModal(true);
                    setInitialItem(item);
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
      <AddItemModal
        isVisible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          setIsEditModal(false);
          setInitialItem(null);
        }}
        onAddItem={fetchItems}
        isEditMode={isEditModal}
        initialItem={initialItem}
      />
    </SafeAreaView>
  );
};

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
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
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
  descriptionCell: {
    flex: 3,
    marginRight: 30,
  },

  editButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: COLORS.white,
  },
});

export default Items;
