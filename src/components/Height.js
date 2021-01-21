import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
const windowHeight = () => {
  if (Platform.OS === 'ios') {
    const status = getStatusBarHeight(true);
    if (isIphoneX()) {
      return Dimensions.get('window').height - status - getBottomSpace();
    } else {
      return Dimensions.get('window').height - status;
    }
  } else {
    return Dimensions.get('window').height;
  }
};
export default windowHeight();
