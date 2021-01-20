import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
} from 'react-native';
import IsLoading from '../../../components/ActivityIndicator';
import Home_active from '../../../../assets/nav/2222.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = ({navigation, route}) => {
  console.log(windowWidth);
  console.log(windowHeight);
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <SafeAreaView>
        <Text>gdgdg</Text>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default HomeScreen;
