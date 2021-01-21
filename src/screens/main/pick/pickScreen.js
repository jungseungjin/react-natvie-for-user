import React from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
const HomeScreen = ({navigation, route}) => {
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <SafeAreaView></SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default HomeScreen;
