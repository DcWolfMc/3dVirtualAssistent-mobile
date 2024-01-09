import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="absolute justify-center items-center inset-0 top-0 bottom-0 left-0 right-0 z-10">
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Loader;

// const styles = StyleSheet.create({
// container: {
// ...StyleSheet.absoluteFillObject,
// justifyContent: 'center',
// alignItems: 'center',
// },
// });
