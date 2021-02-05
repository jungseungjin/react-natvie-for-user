import React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  NativeModules,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Height_convert from '../../Height_convert';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import GoBackWhite from '../../../../assets/home/goBackWhite.svg';
import HeartRed from '../../../../assets/home/HeartRed.svg';
import HeartWhite from '../../../../assets/home/HeartWhite.svg';
import StatusBarHeight from '../../StatusBarHeight';
const AnimatedHeader = ({navigation, animatedValue, scrollValue}) => {
  const insets = useSafeAreaInsets();

  const background = animatedValue.interpolate({
    inputRange: [100, Width_convert(240) - StatusBarHeight],
    outputRange: ['rgba( 255, 255, 255, 0)', 'rgba( 255, 255, 255, 1)'],
    extrapolate: 'clamp',
  });
  const centerText = animatedValue.interpolate({
    inputRange: [100, Width_convert(240) - StatusBarHeight],
    outputRange: ['rgba( 0, 0, 0, 0)', 'rgba( 0, 0, 0, 1)'],
    extrapolate: 'clamp',
  });
  return (
    <>
      <View style={{position: 'absolute', top: 0}}>
        <Animated.View
          style={{
            width: Width_convert(375),
            height: StatusBarHeight,
            position: 'absolute',
            backgroundColor: background,
          }}></Animated.View>
        <Animated.View
          style={{
            width: Width_convert(375),
            height: Height_convert(94) - StatusBarHeight,
            position: 'absolute',
            flexDirection: 'row',
            top: StatusBarHeight,
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
                  scrollValue > Width_convert(240) - 2 * StatusBarHeight
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
                  scrollValue > Width_convert(240) - 2 * StatusBarHeight
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
                  scrollValue > Width_convert(240) - 2 * StatusBarHeight
                    ? {color: '#000000'}
                    : {color: '#FFFFFF'},
                ]}>
                123
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  );
};
export default AnimatedHeader;
