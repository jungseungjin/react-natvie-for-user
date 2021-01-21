import React from 'react';
import {Platform, Dimensions} from 'react-native';
const windowHeight = () => {
  return Dimensions.get('window').height;
};
export default windowHeight();
