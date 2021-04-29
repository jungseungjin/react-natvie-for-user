import React from 'react';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  View,
  Text,
  Linking,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';
import FastImage from 'react-native-fast-image';
import X from '../../../assets/home/x_black.svg';
const WorkConsultingModal = (props) => {
  function getSMSDivider() {
    return Platform.OS === 'ios' ? '&' : '?';
  }
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
        onRequestClose={() => {
          props.WorkConsultingModalChangeValue(false);
        }}
        backdropOpacity={0.3}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              width: Width_convert(331),
              backgroundColor: '#FFFFFF',
              borderRadius: Font_normalize(5),
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Width_convert(23),
              height: Width_convert(40),
            }}>
            <Text
              style={{
                marginLeft: Width_convert(133),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(18),
                color: '#000000',
              }}>
              작업 상담
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                props.WorkConsultingModalChangeValue(false);
              }}
              style={{
                marginLeft: 'auto',
                paddingTop: Width_convert(3),
                paddingRight: Width_convert(19),
              }}>
              <X fill="#000000"></X>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(263),
              marginLeft: Width_convert(34),
              marginRight: Width_convert(34),
              alignItems: 'center',
            }}>
            <View
              style={[
                {
                  width: Width_convert(263),
                  flexDirection: 'row',
                },
                Platform.OS == 'ios'
                  ? {}
                  : {
                      height: Height_convert(100),
                    },
              ]}>
              <Text
                style={{
                  lineHeight: Font_normalize(20),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                  }}>
                  명시된 작업비용을 기준으로{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                  }}>
                  {props.name} 고객님의 기존 차량트림, 차량상태(튜닝이력 여부
                  등)에 따라{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                  }}>
                  변동될 수 있으므로 꼭 사장님과 작업에 대한 상담을
                  진행해보세요.
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 20, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                props.WorkConsultingModalChangeValue(false);
                props.navigation.navigate('CostChangeScreen');
              }}
              style={[
                {
                  marginLeft: 'auto',
                },
                Platform.OS === 'ios' && {
                  marginTop: Height_convert(5),
                },
              ]}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(12),
                  color: '#53A9F8',
                  lineHeight: Font_normalize(16),
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#53A9F8',
                }}>
                작업비용 변동사례 보러가기
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: Width_convert(16),
              height: Width_convert(118),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                Linking.openURL(`tel:${props.storeNumber}`);
              }}
              style={{
                width: Width_convert(271),
                height: Width_convert(43),
                backgroundColor: '#946AEF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(5),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(14),
                  lineHeight: Font_normalize(16),
                  color: '#FFFFFF',
                }}>
                작업 및 예약상담 전화
              </Text>
            </TouchableOpacity>
            <View style={{height: Width_convert(9)}}></View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                let body = ''; //${getSMSDivider()}body=${body}
                Linking.openURL(`sms:${props.storeNumber}`);
              }}
              style={{
                width: Width_convert(271),
                height: Width_convert(43),
                backgroundColor: '#DCDCDC',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(5),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(14),
                  lineHeight: Font_normalize(16),
                  color: '#636363',
                }}>
                작업 및 예약상담 문자
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WorkConsultingModal;
