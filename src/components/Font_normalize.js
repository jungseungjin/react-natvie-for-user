import React from 'react';
import {Platform, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';
import Width from './Width.js';
const scale = Width / 375;
const Font_normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};
Font_normalize.propTypes = {
  size: PropTypes.number.isRequired,
};
export default Font_normalize;
