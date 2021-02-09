import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {TextInput} from 'react-native-gesture-handler';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
import InputPhoneNumber from '../../../components/InputPhoneNumber.js';
import auth from '@react-native-firebase/auth';

const SignUpInformation = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [authButtonClick, setAuthButtonClick] = React.useState(false);
  const [authNumber, setAuthNumber] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const [next, setNext] = React.useState('');
  async function signInWithPhoneNumber(text) {
    //3분카운트 들어가야함
    try {
      var number = text.replace(/[^0-9]/g, '');
      console.log(number);
      const confirmation = await auth().signInWithPhoneNumber('+82' + number);
      console.log(confirmation);
      setConfirm(confirmation);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmCode(code) {
    try {
      await confirm.confirm(code);
      console.log(code + 'is valid');
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        Title={'회원가입1'}
        navigation={props.navigation}
        next={next}></Tabbar>
      <View
        style={{
          marginLeft: Width_convert(24),
          marginRight: Width_convert(24),
          marginTop: Height_convert(50),
          width: Width_convert(327),
          height: Width_convert(95),
        }}>
        <View
          style={[
            {
              borderBottomWidth: 1,
              width: Width_convert(327),
              height: Width_convert(35),
            },
            phoneNumber
              ? {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              : {
                  justifyContent: 'center',
                },
          ]}>
          <TextInput
            editable={authButtonClick ? false : true}
            placeholder="휴대폰번호"
            placeholderTextColor="#CCCCCC"
            value={phoneNumber}
            onChangeText={(value) => {
              if (value.length > 13) {
              } else {
                let newValue = InputPhoneNumber(value);
                setPhoneNumber(newValue);
              }
            }}
            placeholderStyle={{
              height: Width_convert(40),
              paddingLeft: Width_convert(10),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
              lineHeight: Font_normalize(14),
            }}
            style={{
              height: Width_convert(40),
              paddingLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
              lineHeight: Font_normalize(14),
            }}></TextInput>
          {phoneNumber && !authButtonClick ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPhoneNumber('');
                setNext('');
              }}
              style={{}}>
              <XButton style={{marginRight: Width_convert(3)}}></XButton>
            </TouchableOpacity>
          ) : null}
        </View>
        {/*인증번호받기 버튼, 버튼누르면 변경되는 뷰  */}
        {authButtonClick ? (
          <>
            <View
              style={{
                marginTop: Width_convert(28),
                width: Width_convert(327),
                height: Width_convert(44),
                borderBottomColor: '#000000',
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="인증번호를 입력해주세요"
                placeholderTextColor="#CCCCCC"
                value={authNumber}
                onChangeText={(value) => {
                  setAuthNumber(value);
                }}
                placeholderStyle={{
                  paddingLeft: Width_convert(10),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                  lineHeight: Font_normalize(14),
                }}
                style={{
                  height: Width_convert(40),
                  paddingLeft: Width_convert(5),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                  lineHeight: Font_normalize(14),
                }}></TextInput>
              <Text
                style={{
                  marginRight: Width_convert(3),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(12),
                  fontWeight: '400',
                  color: '#FF0000',
                }}>
                3:00
              </Text>
            </View>
            <View style={{marginTop: Height_convert(7)}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(12),
                  fontWeight: '400',
                  color: '#FF0000',
                }}>
                인증번호가 올바르지 않습니다
              </Text>
            </View>
            <View
              style={{
                marginTop: Height_convert(9),
                flexDirection: 'row',
                alignItems: 'center',
                width: Width_convert(188),
                marginLeft: Width_convert(188 - 24),
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(78),
                  height: Width_convert(32),
                  marginRight: Width_convert(8),
                  borderRadius: Font_normalize(3),
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightColor: '#B666DC',
                  borderLeftColor: '#B666DC',
                  borderTopColor: '#B666DC',
                  borderBottomColor: '#B666DC',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(8),
                    fontWeight: '400',
                    color: '#B666DC',
                  }}>
                  휴대폰 재인증
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(78),
                  height: Width_convert(32),
                  marginRight: Width_convert(23),
                  borderRadius: Font_normalize(3),
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightColor: '#2989E2',
                  borderLeftColor: '#2989E2',
                  borderTopColor: '#2989E2',
                  borderBottomColor: '#2989E2',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(8),
                    fontWeight: '400',
                    color: '#2989E2',
                  }}>
                  인증번호 다시받기
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={{
              marginTop: Width_convert(28),
              width: Width_convert(327),
              height: Width_convert(44),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setAuthButtonClick(true);
                //signInWithPhoneNumber(phoneNumber);
                setNext(false);
              }}
              style={[
                {
                  width: Width_convert(327),
                  height: Width_convert(44),
                  borderRadius: Font_normalize(5),
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                phoneNumber.length == 13
                  ? {
                      borderTopColor: '#2989E2',
                      borderBottomColor: '#2989E2',
                      borderRightColor: '#2989E2',
                      borderLeftColor: '#2989E2',
                    }
                  : {
                      borderTopColor: '#CCCCCC',
                      borderBottomColor: '#CCCCCC',
                      borderRightColor: '#CCCCCC',
                      borderLeftColor: '#CCCCCC',
                    },
              ]}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(16),
                  },
                  phoneNumber.length == 13
                    ? {
                        color: '#2989E2',
                      }
                    : {
                        color: '#CCCCCC',
                      },
                ]}>
                인증번호 받기
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/*인증번호받기 버튼, 버튼누르면 변경되는 뷰  */}
      </View>
    </SafeAreaView>
  );
};
export default SignUpInformation;
