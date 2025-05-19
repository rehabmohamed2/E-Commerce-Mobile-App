import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../context/AuthContext';
import { cartAPI } from '../api';

const LocationPickerScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const { onLocationPicked } = route.params; // Retrieve the onLocationPicked callback

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 30.0444, // Default Cairo coordinates
    longitude: 31.2357,
    address: 'Cairo', // Default address
  });

  useEffect(() => {
    if (user?.address) {
      setSelectedLocation({
        latitude: 30.0444, // User's address logic can be improved here
        longitude: 31.2357,
        address: user?.address || 'Cairo',
      });
    }
  }, [user]);

  const handleConfirmLocation = () => {
    const pickedLocation = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address: selectedLocation.address || 'Picked Location',
    };

    // Trigger the onLocationPicked callback to pass the location to CartScreen
    onLocationPicked(pickedLocation);
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      address: 'Custom Location', // Address can be fetched via reverse geocoding
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <Marker coordinate={selectedLocation} title="Selected Location" />
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#C0C0C0' }]}
          onPress={() => alert('Use Saved Address')}
        >
          <Text style={styles.buttonText}>Use Saved Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default LocationPickerScreen;
