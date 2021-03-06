/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import messaging from '@react-native-firebase/messaging';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import FirstNavigator from './src/navigations/first/firstNavigator.js';
import {Provider} from 'react-redux';
import initStore from './src/store';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
const store = initStore();

function App(props) {
  const [locationGranted, setLocationGranted] = React.useState(false);
  //알림에 대한 퍼미션 요청
  const handleNotificationPermission = async (Type) => {
    if (Type === 'ios') {
      const result = requestNotifications([
        'alert',
        'sound',
      ]).then(({status, settings}) => {});
    } else {
    }
  };
  //위치정보사용 퍼미션
  const handleLocationPermission = async (Type) => {
    if (Type === 'ios') {
      const res = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (res === RESULTS.GRANTED) {
        setLocationGranted(true);
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        res2 === RESULTS.GRANTED
          ? setLocationGranted(true)
          : setLocationGranted(false);
      }
    } else {
      const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (res === RESULTS.GRANTED) {
        setLocationGranted(true);
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        res2 === RESULTS.GRANTED
          ? setLocationGranted(true)
          : setLocationGranted(false);
      }
    }
  };
  //권한 확인 및 요청
  React.useEffect(() => {
    handleLocationPermission(Platform.OS);
    handleNotificationPermission(Platform.OS);
  }, []);

  React.useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {},
      onNotification: function (notification) {
        console.log(notification);
        const {data} = notification;

        //NavigationService.navigate('Screen', {notificationData: data});
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {},
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  //알림 받았을 때 처리
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //권한에 따라서 메시지 보여주고 말고해야됨?? 아니면 앱 켜져있을때는 알림을 어떻게 츠리하나
      checkNotifications().then(({status, settings}) => {
        console.log(status); //blocked
        if (status === 'granted') {
          if (Platform.OS === 'ios') {
            try {
              PushNotification.localNotification({
                title: remoteMessage.notification.title, // (optional)
                message: remoteMessage.notification.body, // (required)
              });
            } catch (err) {
              console.log(err);
            }
          } else {
            PushNotification.localNotification({
              /* Android Only Properties */
              largeIcon: 'ic_launcher_round',
              smallIcon: 'ic_launcher_round',
              bigLargeIcon: 'ic_launcher_round',
              channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
              title: remoteMessage.notification.title, // (optional)
              message: remoteMessage.notification.body, // (required)
            });
          }
        }
      });
    });
    return unsubscribe;
  }, []);
  React.useEffect(() => {
    PushNotification.createChannel({
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
    });
  }, []);
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  Text.defaultProps.color = '#000000';
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"></StatusBar>
        <FirstNavigator></FirstNavigator>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
