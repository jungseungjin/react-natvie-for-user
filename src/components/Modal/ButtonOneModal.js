import React from 'react';
import Modal from 'react-native-modal';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';

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
          style={[
            {
              width: Width_convert(295),
              height: Height_convert(164),
              backgroundColor: '#FFFFFF',
            },
            props.Title ==
            '투닝에게 피드백을 해주셔서 감사합니다.\n\n사장님들과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다.'
              ? {height: Height_convert(164 + 70)}
              : null,
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
              props.Title.indexOf('14세미만') != -1
                ? {
                    height: Height_convert(178),
                  }
                : props.Title ==
                  '투닝에게 피드백을 해주셔서 감사합니다.\n\n사장님들과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다.'
                ? {
                    height: Height_convert(178),
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
                  },
                  props.Title == '차량과 지역을 모두 선택해주세요' ||
                  props.Title == '해당정보로 등록된 아이디가 없습니다' ||
                  props.Title == '이미 가입된 중복 메일계정입니다' ||
                  props.Title == '회원님의 성함을 입력해주세요' ||
                  props.Title == '내용을 10자 이상 입력해주세요' ||
                  props.Title == '인터넷 연결을 확인해주세요' ||
                  props.Title == '인증번호를 다시 입력해주세요' ||
                  props.Title == '본인인증이 완료되었습니다' ||
                  props.Title == '평점을 평가해주세요' ||
                  props.Title == '후기 내용을 입력해주세요'
                    ? {
                        marginLeft: 0,
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: Font_normalize(15),
                      }
                    : props.Title ==
                        '투닝에게 피드백을 해주셔서 감사합니다.\n\n사장님들과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다.' ||
                      props.Title ==
                        '비밀번호가 변경되어 로그아웃 되었습니다 \n로그인페이지로 이동합니다'
                    ? {
                        marginLeft: Width_convert(10),
                        marginRight: Width_convert(10),
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: Font_normalize(15),
                      }
                    : props.Title.indexOf('14세미만') != -1
                    ? {
                        marginRight: Width_convert(18),
                      }
                    : null,
                ]}>
                {props.Title}
              </Text>
            </View>
            {props.BottomText ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
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
                if (
                  props.Title ==
                  '투닝에게 피드백을 해주셔서 감사합니다.\n\n사장님들과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다.'
                ) {
                  props.ShowModalChangeValue(false);
                  props.navigation.goBack();
                } else {
                  props.ShowModalChangeValue(false);
                }
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(18),
                    fontWeight: '700',
                    color: '#000000',
                  },
                  props.Title == '차량과 지역을 모두 선택해주세요' ||
                  props.Title == '해당정보로 등록된 아이디가 없습니다' ||
                  props.Title == '이미 가입된 중복 메일계정입니다' ||
                  props.Title == '회원님의 성함을 입력해주세요' ||
                  props.Title == '인터넷 연결을 확인해주세요' ||
                  props.Title == '내용을 10자 이상 입력해주세요' ||
                  props.Title == '인증번호를 다시 입력해주세요' ||
                  props.Title == '본인인증이 완료되었습니다' ||
                  props.Title == '평점을 평가해주세요' ||
                  props.Title == '후기 내용을 입력해주세요' ||
                  props.Title ==
                    '투닝에게 피드백을 해주셔서 감사합니다.\n\n사장님들과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다.' ||
                  props.Title ==
                    '비밀번호가 변경되어 로그아웃 되었습니다 \n로그인페이지로 이동합니다' ||
                  props.Title.indexOf('14세미만') != -1
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
