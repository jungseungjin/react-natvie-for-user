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
  ScrollView,
  NativeModules,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Height_convert.js';
import {Fonts} from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {StatusBarManager} = NativeModules;
const convertStatusBar = StatusBar.currentHeight || 0;
if (Platform.OS === 'ios') {
  StatusBarManager.getHeight((response) => {});
} else {
  StatusBar.currentHeight;
}
const HomeScreen = ({navigation, route}) => {
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusBar, setStatusBar] = React.useState(0);

  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              height: Height_convert(94) - statusBar,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.Swagger || null,
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
