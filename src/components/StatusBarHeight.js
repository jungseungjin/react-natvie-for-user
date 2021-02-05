import React from 'react';
import {Platform, NativeModules, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {StatusBarManager} = NativeModules;
const StatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return StatusBarManager.HEIGHT;
  } else {
    return StatusBar.currentHeight;
  }
};
export default StatusBarHeight();
