import React from 'react';
import LottieView from 'lottie-react-native';

import {StyleSheet, View, StatusBar} from 'react-native';
const IsLoading = () => {
  return (
    <View style={styles.view}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'rgba(32, 32, 32, 0.3)'}></StatusBar>
      <LottieView
        source={require('../../../assets/gif/transform_car.json')}
        autoPlay
        loop></LottieView>
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
