import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {TextInput} from 'react-native-gesture-handler';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import BackgroundTimer from 'react-native-background-timer';
import PurpleChk from '../../../../assets/home/purple_chk.svg';
import InputPhoneNumber from '../../../components/InputPhoneNumber.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';
const IdFindScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState(''); //휴대폰번호
  const [authButtonClick, setAuthButtonClick] = React.useState(false); //인증번호받기 버튼을 눌렀는지 여부
  const [authNumber, setAuthNumber] = React.useState(''); //코드넘버
  const [confirm, setConfirm] = React.useState(null); //인증함수
  const [confirmChk, setConfirmChk] = React.useState(''); //인증함수를 거쳐서 인증이 되었는지 여부
  const [next, setNext] = React.useState(''); //다음버튼의 상태
  const [minutes, setMinutes] = React.useState(parseInt(0)); //시간초 타이머
  const [seconds, setSeconds] = React.useState(parseInt(0));
  const [visible, setVisible] = React.useState(false); //1분이내 재발송 안됨 메시지 출력여부
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [resultModal, setResultModal] = React.useState(false);
  const ResultModalChangeValue = (text) => setResultModal(text);

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
  async function idFindBack() {
    try {
      let url = `${Domain}api/user/find/id`;
      if (phoneNumber) {
      } else {
        alert('빈칸을 모두 입력해 주세요');
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          //인터넷 연결이 확인되면 뒤에서 이메일 중복검사 진행
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              phonenumber: phoneNumber,
            },
          });
          if (result.data.success === true && result.data.result !== null) {
            setIsLoadingAndModal(0);
            props.navigation.navigate('IdFindComplete', {
              idText: result.data.result.email,
              idRegdate: result.data.result.createdAt,
              fromNav: props.route.params.fromNav,
            });
          } else {
            setIsLoadingAndModal(3);
            //없어
            setResultModal(true);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      alert(err);
    }
  }
  const confirmCode = (code) => {
    try {
      if (seconds === 0 && minutes === 0) {
        //인증시간 초과
        setConfirmChk(false);
        setNext(false);
      } else {
        //인증번호 확인
        if (code == smsCode) {
          setConfirmChk(true);
          setNext(true);
        } else {
          //인증번호 틀림
          setConfirmChk(false);
          setNext(false);
        }
      }
    } catch (error) {
      console.log(error);
      setConfirmChk(false);
      setNext(false);
    }
  };
  const [smsCode, setSmsCode] = React.useState(0);
  const NaverSMSMessageSend = (Number) => {
    try {
      let timestamp = moment().valueOf();
      let random = parseInt(Math.random() * 899999 + 100000);
      let url = `${Domain}api/user/sendmessage`;

      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.post(
            url,
            {
              Number: Number,
              Random: random,
              timestamp: timestamp,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (result.data.success === true) {
            //전송 성공 시간초 흐르기
            setSmsCode(random);
            setMinutes(parseInt(3));
            setSeconds(parseInt(0));
            setConfirmChk('');
            setAuthNumber('');
            setAuthButtonClick(true);
            setNext(false);
          } else {
            //전송실패
            showToast(
              '인증번호 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
              1000,
            );
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };

  const debouncePhoneNumber = React.useCallback(
    _.debounce((Number) => NaverSMSMessageSend(Number), 2000, {
      leading: true,
      trailing: false,
    }),
    [],
  );
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {Platform.OS === 'android' && props.route.params.fromNav === 'home' ? (
        <View style={{height: StatusBarHeight}}></View>
      ) : null}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        left={'back'}
        Title={'아이디 찾기1'}
        navigation={props.navigation}
        next={next}
        phoneNumber={phoneNumber}
        idFindBack={idFindBack}></Tabbar>
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
            onSubmitEditing={() => {
              if (phoneNumber.length == 13) {
                debouncePhoneNumber(phoneNumber);
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
              marginTop: Height_convert(10),
              width: Width_convert(300),
              height: Width_convert(40),
              paddingLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
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
                onSubmitEditing={() => {
                  if (authNumber.length == 6) {
                    confirmCode(authNumber);
                  }
                }}
                placeholderStyle={{
                  paddingLeft: Width_convert(10),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                }}
                style={{
                  marginTop: Height_convert(10),
                  width: Width_convert(300),
                  height: Width_convert(40),
                  paddingLeft: Width_convert(5),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                }}></TextInput>
              {confirmChk === true && authNumber.length == 6 ? (
                <PurpleChk
                  style={{
                    marginTop: Height_convert(10),
                  }}
                  width={Width_convert(14)}
                  height={Height_convert(14)}></PurpleChk>
              ) : (
                <Text
                  style={{
                    marginTop: Height_convert(10),
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
                  ? '인증번호는 1분간 재발송할 수 없습니다.'
                  : confirmChk === false && authNumber.length == 6
                  ? '인증번호가 올바르지 않습니다.'
                  : confirmChk === false && minutes == 0 && seconds == 0
                  ? '시간이 초과되었습니다 인증번호를 다시 받아주세요.'
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
                    fontSize: Font_normalize(11),
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
                      debouncePhoneNumber(phoneNumber);
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
                      fontSize: Font_normalize(11),
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
                  인증번호 재전송
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
                  debouncePhoneNumber(phoneNumber);
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

      <Toast
        ref={(toast) => (toastRef = toast)}
        style={{
          backgroundColor: '#474747',
          paddingTop: Height_convert(16),
          paddingBottom: Height_convert(16),
          paddingRight: Width_convert(20),
          paddingLeft: Width_convert(20),
          borderRadius: Font_normalize(7),
        }}
        position="center"
        //opacity={0.8}
        textStyle={{color: '#FFFFFF'}}
      />
      {resultModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={ResultModalChangeValue}
          navigation={props.navigation}
          Title={'해당정보로 등록된 아이디가 없습니다.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
    </SafeAreaView>
  );
};
export default IdFindScreen;
