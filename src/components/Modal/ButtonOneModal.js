import React from 'react';
import Modal from 'react-native-modal';
import {SafeAreaView, View, Text} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ButtonOneModal = (props) => {
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
                style={[
                  {
                    marginLeft: Width_convert(18),
                    fontFamily: Fonts?.NanumGothicRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                  },
                  props.Title == '이미 가입된 중복 메일계정입니다' ||
                  props.Title == '회원님의 성함을 입력해주세요' ||
                  props.Title == '인터넷 연결을 확인해주세요'
                    ? {
                        marginLeft: 0,
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: Font_normalize(15),
                      }
                    : null,
                ]}>
                {props.Title}
              </Text>
            </View>
            {props.BottomText ? (
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.ShowModalChangeValue(false);
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(18),
                    fontWeight: '700',
                    color: '#000000',
                  },
                  props.Title == '이미 가입된 중복 메일계정입니다' ||
                  props.Title == '회원님의 성함을 입력해주세요' ||
                  props.Title == '인터넷 연결을 확인해주세요'
                    ? {
                        color: '#1976E3',
                        fontSize: Font_normalize(16),
                      }
                    : null,
                ]}>
                {props.CenterButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ButtonOneModal;
