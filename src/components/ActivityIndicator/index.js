import React from 'react';
import {ActivityIndicator, StyleSheet, View, StatusBar} from 'react-native';
const IsLoading = () => {
  return (
    <View style={styles.view}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'rgba(32, 32, 32, 0.3)'}></StatusBar>
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
    backgroundColor: 'rgba(32, 32, 32, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default IsLoading;
