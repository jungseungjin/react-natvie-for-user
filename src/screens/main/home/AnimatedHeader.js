import React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  NativeModules,
  StatusBar,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import GoBackWhite from '../../../../assets/home/goBackWhite.svg';
import HeartRed from '../../../../assets/home/HeartRed.svg';
import HeartWhite from '../../../../assets/home/HeartWhite.svg';
const {StatusBarManager} = NativeModules;
const AnimatedHeader = ({navigation, animatedValue, scrollValue}) => {
  const insets = useSafeAreaInsets();
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

  const background = animatedValue.interpolate({
    inputRange: [100, Width_convert(240) - statusBar],
    outputRange: ['rgba( 255, 255, 255, 0)', 'rgba( 255, 255, 255, 1)'],
    extrapolate: 'clamp',
  });
  const centerText = animatedValue.interpolate({
    inputRange: [100, Width_convert(240) - statusBar],
    outputRange: ['rgba( 0, 0, 0, 0)', 'rgba( 0, 0, 0, 1)'],
    extrapolate: 'clamp',
  });
  return (
    <>
      <Animated.View
        style={{
          width: Width_convert(375),
          height: statusBar,
          position: 'absolute',
          backgroundColor: background,
        }}></Animated.View>
      <Animated.View
        style={{
          width: Width_convert(375),
          height: Height_convert(94) - statusBar,
          position: 'absolute',
          flexDirection: 'row',
          top: statusBar,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: background,
        }}>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={{}}
            onPress={() => {
              navigation.goBack();
            }}>
            <GoBackWhite
              fill={
                scrollValue > Width_convert(240) - 2 * statusBar
                  ? '#000000'
                  : '#FFFFFF'
              }
              style={{
                marginLeft: Width_convert(22),
              }}></GoBackWhite>
          </TouchableOpacity>
        </View>
        <View>
          <Animated.Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(16),
              fontWeight: '700',
              color: centerText,
              textAlign: 'center',
            }}>
            MOTION튜닝
          </Animated.Text>
        </View>
        <View
          style={{
            marginRight: Width_convert(17),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
            }}
            onPress={() => {}}>
            <HeartWhite
              fill={
                scrollValue > Width_convert(240) - 2 * statusBar
                  ? '#000000'
                  : '#FFFFFF'
              }></HeartWhite>
            <Text
              style={[
                {
                  marginTop: 'auto',
                  marginBottom: 0,
                  fontFamily: Fonts?.NanumSquareRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(6),
                },
                scrollValue > Width_convert(240) - 2 * statusBar
                  ? {color: '#000000'}
                  : {color: '#FFFFFF'},
              ]}>
              123
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};
export default AnimatedHeader;
