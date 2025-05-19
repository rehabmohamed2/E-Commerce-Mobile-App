import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@rneui/themed";
import { Button } from "@rneui/base";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext"; // ✅ Use the custom hook
import { productAPI } from "../api"; // Make sure this path is correct

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const navigation = useNavigation();

  const { cartItems, addToCart } = useCart(); // ✅ Correct context usage

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await productAPI.getProductById(productId);
        setSelectedProduct(product);
      } catch (err) {
        setError("Error fetching product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (selectedProduct) {
      setIsProductInCart(
        cartItems.some((product) => product._id === selectedProduct._id) // ✅ Use _id
      );
    }
  }, [selectedProduct, cartItems]);

  if (loading) {
    return (
      <SafeAreaView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white" }}>
        <ImageBackground
          resizeMethod="resize"
          style={styles.image}
          source={{ uri: selectedProduct?.image }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color="black" style={{ margin: 10 }} />
          </Pressable>
        </ImageBackground>
        <View style={styles.main}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "column", width: Dimensions.get("window").width * 0.5 }}>
              <Text style={{ fontSize: 25, color: "rgba(0, 0, 0, 0.5)" }}>
                {selectedProduct?.brand}
              </Text>
              <Text style={{ fontSize: 35, marginBottom: 10 }}>{selectedProduct?.title}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30 }}>${selectedProduct?.price}</Text>
              <Button
                disabled={isProductInCart}
                onPress={() => {
                  addToCart(selectedProduct, 1);
                }}
                color="black"
                buttonStyle={{
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                {isProductInCart ? "Product in Cart" : "Add to Cart"}
              </Button>
            </View>
          </View>

          <Divider />
          <Text
            style={{
              fontSize: 15,
              color: "rgba(0, 0, 0, 0.5)",
              marginVertical: 10,
            }}
          >
            Description
          </Text>
          <Text style={{ fontSize: 20 }}>{selectedProduct?.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
  },
  image: {
    width: 393,
    height: 400,
    
  },
});
