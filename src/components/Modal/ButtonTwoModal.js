import React from 'react';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';

const ButtonTwoModal = (props) => {
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
                  lineHeight: Font_normalize(16),
                }}>
                {props.Title}
              </Text>
            </View>
            {props.BottomText ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  Linking.openSettings();
                }}
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
                  {props.BottomText}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              width: Width_convert(295),
              height: Height_convert(56),
              backgroundColor: '#FFFFFF',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.ShowModalChangeValue(false);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                width: Width_convert(295) / 2,
                height: Height_convert(56),
                borderRightColor: '#DBDBDB',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(18),
                  fontWeight: '700',
                  color: '#000000',
                }}>
                {props.LeftButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                alert('gd');
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Width_convert(295) / 2,
                height: Height_convert(56),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(18),
                  fontWeight: '700',
                  color: '#000000',
                }}>
                {props.RightButtonTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ButtonTwoModal;
