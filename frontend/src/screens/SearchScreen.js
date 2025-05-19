import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { StatusBar } from "expo-status-bar";
import CartProduct from "../components/CartProduct";
import { useNavigation } from "@react-navigation/native";
import { productAPI } from "../api"; // ✅ import the API

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const results = await productAPI.productSearch(searchQuery);
        setSearchResults(results);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.main}>
        <SearchBox value={searchQuery} onChangeText={setSearchQuery} />
        {searchQuery === "" ? (
          <Text>Search to show products</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>{error}</Text>
        ) : searchResults.length === 0 ? (
          <Text>No products found</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResults}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CartProduct
                onPress={() =>
                  navigation.navigate("ProductDetailScreen", {
                    productId: item._id, // ✅ use _id not id
                  })
                }
                title={item.title}
                image={item.image}
                price={item.price}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  main: {
    height: "100%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
  },
});
