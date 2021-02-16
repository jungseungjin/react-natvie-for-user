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
          style={[
            {
              width: Width_convert(295),
              height: Height_convert(164),
            },
          ]}>
          <View
            style={[
              {
                width: Width_convert(295),
                height: Height_convert(108),
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                borderBottomColor: '#DBDBDB',
                borderBottomWidth: 1,
              },
              props.Title == '지역 설정을 위해 위치서비스를 켜 주세요'
                ? {
                    borderTopLeftRadius: Font_normalize(15),
                    borderTopRightRadius: Font_normalize(15),
                  }
                : null,
            ]}>
            <View>
              <Text
                style={[
                  {
                    marginLeft: Width_convert(18),
                    fontFamily: Fonts?.NanumGothicRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                    lineHeight: Font_normalize(16),
                  },
                  props.Title == '지역 설정을 위해 위치서비스를 켜 주세요'
                    ? {
                        marginLeft: 0,
                        textAlign: 'center',
                      }
                    : null,
                ]}>
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
            style={[
              {
                width: Width_convert(295),
                height: Height_convert(56),
                backgroundColor: '#FFFFFF',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              },
              props.Title == '지역 설정을 위해 위치서비스를 켜 주세요'
                ? {
                    borderBottomLeftRadius: Font_normalize(15),
                    borderBottomRightRadius: Font_normalize(15),
                  }
                : null,
            ]}>
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
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(18),
                    fontWeight: '700',
                    color: '#000000',
                  },
                  props.Title == '지역 설정을 위해 위치서비스를 켜 주세요'
                    ? {
                        fontWeight: '400',
                        color: '#1976E3',
                      }
                    : null,
                ]}>
                {props.LeftButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (props.Title == '지역 설정을 위해 위치서비스를 켜 주세요') {
                  props.ShowModalChangeValue(false);
                  Linking.openSettings();
                } else if (
                  props.Title ==
                  '차종과 지역설정을 하지 않은 경우에는 임의의 작업이 검색됩니다.'
                ) {
                  props.ShowModalChangeValue(false);
                  props.navigation.navigate('Category', {
                    Title: props.pickButtonTitle,
                  });
                }
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Width_convert(295) / 2,
                height: Height_convert(56),
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(18),
                    fontWeight: '700',
                    color: '#000000',
                  },
                  props.Title == '지역 설정을 위해 위치서비스를 켜 주세요'
                    ? {
                        fontWeight: '400',
                        color: '#1976E3',
                      }
                    : null,
                ]}>
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
