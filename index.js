/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().getInitialNotification().then(this.handleSelected);
handleSelected = async (remoteMessage) => {
  const notification = JSON.parse(remoteMessage.data.message);
  console.log(notification);
  switch (notification.type) {
    case 1:
      navigation.navigate('screen1', {
        data: notification.data,
      });
      break;
    case 2:
      navigation.navigate('screen2', {
        data: notification.data,
      });
      break;
  }
};
AppRegistry.registerComponent(appName, () => App);
