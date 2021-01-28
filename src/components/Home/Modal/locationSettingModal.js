import React from 'react';
import Modal from 'react-native-modal';
import {SafeAreaView, View, Text} from 'react-native';
import Width_convert from '../../Width_convert.js';
import Height_convert from '../../Height_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LocationSettingModal = () => {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        //isVisible Props에 State 값을 물려주어 On/off control
        isVisible={false}
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
          style={{
            width: Width_convert(295),
            height: Height_convert(164),
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: Width_convert(295),
              height: Height_convert(108),
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              borderBottomColor: '#DBDBDB',
              borderBottomWidth: 1,
            }}>
            <View>
              <Text
                style={{
                  marginLeft: Width_convert(18),
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(14),
                  color: '#000000',
                }}>
                '홈화면 > 설정' 에서 지역설정을 해주셔야 {'\n'}가까운 순 필터
                사용이 가능합니다.{' '}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#946AEF',
                marginTop: Height_convert(6),
                marginLeft: Width_convert(18),
                marginRight: 'auto',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontSize: Font_normalize(12),
                  fontWeight: '400',
                  color: '#946AEF',
                }}>
                설정 하러가기
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(295),
              height: Height_convert(56),
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                alert('gd');
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(18),
                  fontWeight: '700',
                  color: '#000000',
                }}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LocationSettingModal;
