import React from 'react';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';
import X from '../../../assets/home/x_black.svg';

const LoginModal = (props) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(32, 32, 32, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'rgba(32, 32, 32, 0.5)'}></StatusBar>
      <Modal
        //isVisible Props에 State 값을 물려주어 On/off control
        isVisible={true}
        //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        backdropColor={'#202020'}
        backdropOpacity={0.3}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              width: Width_convert(331),
              borderRadius: Font_normalize(7),
              backgroundColor: '#FFFFFF',
            },
            props.Title
              ? {
                  height: Width_convert(226),
                }
              : {
                  height: Width_convert(185),
                },
          ]}>
          {/* 로그인하기글씨 , X버튼 */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: Width_convert(125),
              marginTop: Height_convert(24),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(18),
                fontWeight: '700',
                color: '#000000',
              }}>
              로그인하기
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                props.ShowModalChangeValue(false);
              }}
              style={{
                marginLeft: Width_convert(84),
                marginRight: Width_convert(30),
                paddingTop: 20,
                paddingRight: 30,
                marginTop: -20,
              }}>
              <X
                fill={'#000000'}
                width={Width_convert(14)}
                height={Width_convert(14)}></X>
            </TouchableOpacity>
          </View>
          {props.Title ? (
            <View
              style={{
                marginTop: Width_convert(25),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(13),
                  color: '#000000',
                }}>
                {props.Title}
              </Text>
            </View>
          ) : null}
          <View
            style={[
              {
                alignItems: 'center',
              },
              props.Title
                ? {
                    marginTop: Width_convert(28),
                  }
                : {
                    marginTop: Width_convert(24),
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.ShowModalChangeValue(false);
                if (props.fromNav) {
                  props.navigation.navigate('Login', {fromNav: 'home'});
                } else {
                  props.navigation.navigate('Login');
                }
              }}
              style={{
                width: Width_convert(271),
                height: Width_convert(43),
                borderRadius: Font_normalize(5),
                backgroundColor: '#946AEF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(16),
                  color: '#FFFFFF',
                }}>
                로그인
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.ShowModalChangeValue(false);
                if (props.fromNav) {
                  props.navigation.navigate('SignUp', {fromNav: 'home'});
                } else {
                  props.navigation.navigate('SignUp');
                }
              }}
              style={{
                marginTop: Width_convert(9),
                width: Width_convert(271),
                height: Width_convert(43),
                borderRadius: Font_normalize(5),
                backgroundColor: '#DCDCDC',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(16),
                  color: '#636363',
                }}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginModal;
