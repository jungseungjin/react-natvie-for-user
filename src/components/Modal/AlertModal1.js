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

const AlertModal1 = (props) => {
  return (
    <>
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              {
                width: Width_convert(331),
              },
              props.type === 1 || props.type === '1-1'
                ? {
                    height: Width_convert(158),
                  }
                : props.type === 2
                ? {
                    height: Width_convert(231),
                  }
                : props.type === 3
                ? {
                    height: Width_convert(185),
                  }
                : {},
            ]}>
            <View
              style={[
                {
                  borderTopRightRadius: Font_normalize(7),
                  borderTopLeftRadius: Font_normalize(7),
                  width: Width_convert(331),
                  height: Width_convert(102),
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#DBDBDB',
                  borderBottomWidth: 1,
                },
                props.type === 1
                  ? {
                      height: Width_convert(102),
                    }
                  : props.type === 2
                  ? {
                      height: Width_convert(175),
                    }
                  : {},
              ]}>
              <View>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    },
                    props.type === 1
                      ? {
                          textAlign: 'center',
                        }
                      : props.type === 2 || props.type === 3
                      ? {
                          width: Width_convert(289),
                        }
                      : props.type === '1-1'
                      ? {
                          width: Width_convert(289),
                        }
                      : {},
                  ]}>
                  {props.Title}
                </Text>
              </View>
              {props.BottomText ? (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (
                      props.Title ===
                      "'홈화면 > 설정' 에서 지역설정을 해주셔야만 가까운 순 필터 사용이 가능합니다."
                    ) {
                      props.ShowModalChangeValue(false);
                      props.navigation.navigate('Setting');
                    } else {
                      props.ShowModalChangeValue(false);
                      props.navigation.navigate('Setting');
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#946AEF',
                    marginTop: Height_convert(14),
                    marginRight: Width_convert(27),
                    marginLeft: 'auto',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '400',
                      color: '#946AEF',
                    }}>
                    {props.BottomText}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                borderBottomRightRadius: Font_normalize(7),
                borderBottomLeftRadius: Font_normalize(7),
                width: Width_convert(331),
                height: Width_convert(56),
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
              }}
              onPress={() => {
                if (
                  props.Title ==
                  '투닝에게 피드백을 해주셔서 감사합니다.\n\n여러분과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다!'
                ) {
                  props.ShowModalChangeValue(false);
                  props.navigation.goBack();
                } else if (
                  props.Title ==
                  '비밀번호가 변경되어 로그아웃 되었습니다.\n 로그인 페이지로 이동합니다.'
                ) {
                  props.ShowModalChangeValue(false);
                  props.navigation.navigate('Login');
                } else {
                  props.ShowModalChangeValue(false);
                }
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(16),
                    fontWeight: '700',
                    color: '#53A9F8',
                  },
                ]}>
                {props.CenterButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default AlertModal1;
