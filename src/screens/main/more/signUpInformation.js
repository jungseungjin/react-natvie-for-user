import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Platform,
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
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';
import PurpleChk from '../../../../assets/home/purple_chk.svg';
const SignUpInformation = (props) => {
  const [agree, setAgree] = React.useState(props.route.params);
  const [phoneNumber, setPhoneNumber] = React.useState(''); //휴대폰번호
  const [authButtonClick, setAuthButtonClick] = React.useState(false); //인증번호받기 버튼을 눌렀는지 여부
  const [authNumber, setAuthNumber] = React.useState(''); //코드넘버
  const [confirm, setConfirm] = React.useState(null); //인증함수
  const [confirmChk, setConfirmChk] = React.useState(''); //인증함수를 거쳐서 인증이 되었는지 여부
  const [next, setNext] = React.useState(''); //다음버튼의 상태
  const [minutes, setMinutes] = React.useState(parseInt(0)); //시간초 타이머
  const [seconds, setSeconds] = React.useState(parseInt(0));
  const [visible, setVisible] = React.useState(false); //1분이내 재발송 안됨 메시지 출력여부
  async function signInWithPhoneNumber(text) {
    //3분카운트 들어가야함
    try {
      var number = text.replace(/[^0-9]/g, '');
      const confirmation = await auth().signInWithPhoneNumber('+82' + number);
      setConfirm(confirmation);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmCode(code) {
    try {
      await confirm.confirm(code);
      setConfirmChk(true);
      setNext(true);
    } catch (error) {
      setConfirmChk(false);
      setNext(false);
    }
  }
  React.useEffect(() => {
    const countdown = BackgroundTimer.setTimeout(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => BackgroundTimer.clearTimeout(countdown);
  }, [minutes, seconds]);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        Title={'회원가입1'}
        navigation={props.navigation}
        next={next}
        phoneNumber={phoneNumber}
        agree={agree}></Tabbar>
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
            keyboardType={'number-pad'}
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
                keyboardType={'number-pad'}
                value={authNumber}
                onChangeText={(value) => {
                  if (value.length == 6) {
                    confirmCode(value);
                  }
                  if (value.length > 6) {
                  } else {
                    setAuthNumber(value);
                  }
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
              {confirmChk === true && authNumber.length == 6 ? (
                <PurpleChk
                  width={Width_convert(12)}
                  height={Height_convert(9)}></PurpleChk>
              ) : (
                <Text
                  style={{
                    marginRight: Width_convert(3),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(12),
                    fontWeight: '400',
                    color: '#FF0000',
                  }}>
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              )}
            </View>
            <View style={{marginTop: Height_convert(7)}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(12),
                  fontWeight: '400',
                  color: '#FF0000',
                }}>
                {visible == true
                  ? '인증번호는 1분간 재발송할 수 없습니다'
                  : confirmChk === false && authNumber.length == 6
                  ? '인증번호가 올바르지 않습니다'
                  : confirmChk === false && minutes == 0 && seconds == 0
                  ? '시간이 초과되었습니다 인증번호를 다시 받아주세요'
                  : null}
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
                onPress={() => {
                  setPhoneNumber('');
                  setAuthButtonClick(false);
                  setAuthNumber('');
                  setConfirm(null);
                  setConfirmChk('');
                  setNext('');
                  setMinutes(parseInt(0));
                  setSeconds(parseInt(0));
                }}
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
                onPress={() => {
                  if (confirmChk === true) {
                    //인증번호 다시받기 비활성화
                  } else {
                    if (minutes >= 2) {
                      setVisible(true);
                      setTimeout(() => setVisible(false), 2000);
                    } else {
                      signInWithPhoneNumber(phoneNumber);
                      setConfirmChk('');
                      setAuthNumber('');
                      setMinutes(parseInt(3));
                      setSeconds(parseInt(0));
                    }
                    //인증번호 다시받기 활성화
                    //최근 인증번호 받은 시간과 비교하여 1분이내면 메시지 띄우기 ->몇초 있다가 사라져야한데, -> 시간초 카운트가 2분이상인지 아닌지 비교
                    //최근 인증번호 받은 시간이 1분 넘으면 코드지우고 시간초기화
                  }
                }}
                style={[
                  {
                    width: Width_convert(78),
                    height: Width_convert(32),
                    marginRight: Width_convert(23),
                    borderRadius: Font_normalize(3),
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  confirmChk === true
                    ? {
                        borderRightColor: '#CCCCCC',
                        borderLeftColor: '#CCCCCC',
                        borderTopColor: '#CCCCCC',
                        borderBottomColor: '#CCCCCC',
                      }
                    : {
                        borderRightColor: '#2989E2',
                        borderLeftColor: '#2989E2',
                        borderTopColor: '#2989E2',
                        borderBottomColor: '#2989E2',
                      },
                ]}>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(8),
                      fontWeight: '400',
                    },
                    confirmChk === true
                      ? {
                          color: '#CCCCCC',
                        }
                      : {
                          color: '#2989E2',
                        },
                  ]}>
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
                if (phoneNumber.length == 13) {
                  setAuthButtonClick(true);
                  setMinutes(parseInt(3));
                  setSeconds(parseInt(0));
                  signInWithPhoneNumber(phoneNumber);
                  setNext(false);
                }
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
