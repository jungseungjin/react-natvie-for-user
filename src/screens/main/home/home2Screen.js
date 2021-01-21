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
import {ScrollView} from 'react-native-gesture-handler';
import IsLoading from '../../../components/ActivityIndicator';
//import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Height_convert from '../../../components/Height_convert.js';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

// React.useEffect(() => {
//   const convertStatusBar = async () => {
//     let getValue;
//     if (Platform.OS === 'ios') {
//       await StatusBarManager.getHeight((response) => {
//         getValue = response.height;
//         console.log(getValue);
//         return getValue;
//       });
//       return getValue;
//     } else {
//       return StatusBar.currentHeight;
//     }
//   };
// }, []);
const HomeScreen = async ({navigation, route}) => {
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/ // - convertStatusBar() 4차이남
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              height: Height_convert(94),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                //fontFamily: Fonts.Swagger,
                fontSize: Font_normalize(24),
                color: 'black',
                textAlign: 'center',
              }}>
              투닝
            </Text>
          </View>
          <View style={{backgroundColor: '#ffffff'}}></View>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default HomeScreen;
