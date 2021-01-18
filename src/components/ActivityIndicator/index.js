import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
const IsLoading = () => {
  return (
    <View style={styles.view}>
      <ActivityIndicator color="#999999" size="large"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default IsLoading;
