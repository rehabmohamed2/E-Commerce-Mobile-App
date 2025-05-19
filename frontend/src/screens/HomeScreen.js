import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchBox from "../components/SearchBox";
import ProductCard from "../components/ProductCard";
import Heading from "../components/Heading";
import { useNavigation } from "@react-navigation/native";
import { productAPI } from "../api"; // Adjust the path according to your structure

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts();
        console.log(response);
        setProducts(response);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <Heading title="Loading..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Heading title={error} />
      </View>
    );
  }

  const electronicsProducts = products.filter(
    (product) => product.category === "Electronics"
  );
  const clothingProducts = products.filter(
    (product) => product.category === "Clothing"
  );

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.subMain}>
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <SearchBox onpress={() => navigation.navigate("SearchToDetails")} />
            {/* New Products */}
            <Heading title="New Products" />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={products}
              renderItem={({ item }) => (
                <ProductCard
                  onTap={() =>
                    navigation.navigate("ProductDetailScreen", {
                      productId: item._id,
                    })
                  }
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              )}
            />
            {/* Clothing */}
            <Heading title="Clothing" />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={clothingProducts}
              renderItem={({ item }) => (
                <ProductCard
                  onTap={() =>
                    navigation.navigate("ProductDetailScreen", {
                      productId: item._id,
                    })
                  }
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}

                />
              )}
            />
            {/* Electronics */}
            <Heading title="Electronics" />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={electronicsProducts}
              renderItem={({ item }) => (
                <ProductCard
                  onTap={() =>
                    navigation.navigate("ProductDetailScreen", {
                      productId: item._id,
                    })
                  }
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}

                />
              )}
            />
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  subMain: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
