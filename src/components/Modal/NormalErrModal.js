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

const NormalErrModal = (props) => {
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
          onRequestClose={() => {
            props.ShowModalChangeValue(0);
          }}
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
                height: Width_convert(185),
              },
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
              ]}>
              <View>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                      width: Width_convert(289),
                      textAlign: 'center',
                      lineHeight: Font_normalize(20),
                    },
                  ]}>
                  {
                    '일시적인 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.'
                  }
                </Text>
              </View>
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
                props.ShowModalChangeValue(0);
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
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default NormalErrModal;
