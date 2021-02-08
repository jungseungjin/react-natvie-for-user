import React from 'react';
import Modal from 'react-native-modal';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';
import X from '../../../assets/home/x_black.svg';

const LoginModal = (props) => {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
              width: Width_convert(337),
              borderRadius: Font_normalize(3),
              backgroundColor: '#FFFFFF',
            },
            props.Title
              ? {
                  height: Width_convert(226),
                }
              : {
                  height: Width_convert(205),
                },
          ]}>
          {/* 로그인하기 , X버튼 */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: Width_convert(128),
              marginTop: Height_convert(16),
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
              onPress={() => {
                props.ShowModalChangeValue(false);
              }}
              style={{
                marginLeft: Width_convert(94),
                marginRight: Width_convert(20),
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
                    marginTop: Width_convert(42),
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
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
                  fontSize: Font_normalize(14),
                  color: '#FFFFFF',
                }}>
                로그인
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
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
                  fontSize: Font_normalize(14),
                  color: '#636363',
                }}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginModal;
