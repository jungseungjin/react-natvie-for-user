import React from 'react';
import {
  Animated,
  View,
  StyleSheet,
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
const styles = StyleSheet.create({
  view: {position: 'absolute', top: 0},
  animatedView: (background) => {
    return {
      width: Width_convert(375),
      height: StatusBarHeight,
      position: 'absolute',
      backgroundColor: background,
    };
  },
  animatedView2: (background) => {
    return {
      width: Width_convert(375),
      height: Height_convert(94) - StatusBarHeight,
      position: 'absolute',
      flexDirection: 'row',
      top: StatusBarHeight,
      alignItems: 'center',
      backgroundColor: background,
    };
  },
  animatedText: (centerText) => {
    return {
      fontFamily: Fonts?.NanumSqureRegular || null,
      fontSize: Font_normalize(16),
      fontWeight: '700',
      color: centerText,
      textAlign: 'center',
    };
  },
  touchView: {
    alignItems: 'flex-end',
    width: '30%',
  },
  touch: {
    marginRight: Width_convert(17),
    flexDirection: 'row',
    paddingLeft: Width_convert(10),
    paddingTop: Width_convert(10),
    paddingBottom: Width_convert(10),
    borderColor: 'red',
  },
  pickText: (props) => {
    return {
      marginTop: 'auto',
      marginBottom: -Height_convert(3),
      fontFamily: Fonts?.NanumSquareRegular || null,
      fontWeight: '700',
      fontSize: Font_normalize(8),
      color: props.Pick
        ? '#EA5152'
        : props.scrollValue > Width_convert(240) - 2 * StatusBarHeight
        ? '#000000'
        : '#FFFFFF',
    };
  },
});
const AnimatedHeader = (props) => {
  const insets = useSafeAreaInsets();

  const background = props.animatedValue.interpolate({
    inputRange: [100, Width_convert(240) - StatusBarHeight],
    outputRange: ['rgba( 255, 255, 255, 0)', 'rgba( 255, 255, 255, 1)'],
    extrapolate: 'clamp',
  });
  const centerText = props.animatedValue.interpolate({
    inputRange: [100, Width_convert(240) - StatusBarHeight],
    outputRange: ['rgba( 0, 0, 0, 0)', 'rgba( 0, 0, 0, 1)'],
    extrapolate: 'clamp',
  });
  return (
    <>
      <View style={styles.view}>
        <Animated.View style={styles.animatedView(background)}></Animated.View>
        <Animated.View style={styles.animatedView2(background)}>
          <View style={{width: '30%'}}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                props.navigation.goBack();
              }}>
              <GoBackWhite
                fill={
                  props.scrollValue > Width_convert(240) - 2 * StatusBarHeight
                    ? '#000000'
                    : '#FFFFFF'
                }
                style={{
                  marginLeft: Width_convert(22),
                }}></GoBackWhite>
            </TouchableOpacity>
          </View>
          <View style={{width: '40%', alignItems: 'center'}}>
            <Animated.Text style={styles.animatedText(centerText)}>
              {props.Title}
            </Animated.Text>
          </View>
          <View style={styles.touchView}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={styles.touch}
              onPress={() => {
                if (props.redux.login) {
                  console.log('로그인됨');
                  props.PickChangeValue();
                } else {
                  props.ShowModalChangeValue(true);
                }
                //찜한거에 추가하기빼기 -> 로그인이 되어있어야함
              }}>
              {props.Pick ? (
                <HeartRed></HeartRed>
              ) : (
                <HeartWhite
                  fill={
                    props.scrollValue > Width_convert(240) - 2 * StatusBarHeight
                      ? '#000000'
                      : '#FFFFFF'
                  }></HeartWhite>
              )}
              <Text style={styles.pickText(props)}>{props.Length}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  );
};
export default AnimatedHeader;
