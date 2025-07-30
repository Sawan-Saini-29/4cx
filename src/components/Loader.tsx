import { ActivityIndicator, Dimensions, View, StyleSheet } from "react-native";
import React from "react";

interface MyProps {
  loading: boolean;
}

export default function Loader({ loading }: MyProps) {
  if (!loading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator color="#FFFFFF" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999, // Ensures it overlays other components
  },
});
