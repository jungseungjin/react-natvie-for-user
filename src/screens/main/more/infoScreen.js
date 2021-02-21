import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import PurplePlus from '../../../../assets/home/purple_plus.svg';
import WorkInformation from '../../../components/Home/Infomation/workInformation.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import IsLoading from '../../../components/ActivityIndicator';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';
const InfoScreen = (props) => {
  //저장으로 값이 변경되는거라면 state잡아서 넣어주고 시작해야함
  const reduexState = useSelector((state) => state);
  const insets = useSafeAreaInsets();
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const logout = async () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'user/logout';
          let data = {
            uniqueId: DeviceInfo.getUniqueId(),
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            await Keychain.resetGenericPassword();
            props.updateLoginStatus(false);
            props.updateIuCar([]);
            props.updateLocation({});
            props.update_id('');
            props.updateData(result.data[0].result); //디바이스정보라도 넣어줘야??
            props.navigation.navigate('More');
          } else {
          }
        } else {
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'내정보'} navigation={props.navigation}></Tabbar>

      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={30}>
        <DismissKeyboard>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flexGrow: 1,
              width: Width_convert(375),
            }}>
            <View
              style={{
                width: Width_convert(375),
              }}>
              <View
                style={{
                  width: Width_convert(375),
                  height: Width_convert(263 - 94 - 57),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{
                    width: Width_convert(78),
                    height: Width_convert(78),
                    borderRadius: Width_convert(78),
                  }}
                  source={{
                    uri:
                      reduexState.loginDataCheck.login.data
                        .review_user_iu_image,
                    //headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
              </View>
              {/*이름 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                  height: Width_convert(57),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    height: Width_convert(57),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    이름
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    {reduexState.loginDataCheck?.login?.data?.iu_name}
                  </Text>
                </View>
              </View>
              {/*이름 끝 */}
              {/*닉네임 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                  height: Width_convert(57),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    height: Width_convert(57),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    닉네임
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    {reduexState.loginDataCheck?.login?.data?.iu_nickname}
                  </Text>
                </View>
              </View>
              {/*닉네임 끝 */}
              {/*휴대폰번호 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                  height: Width_convert(57),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    height: Width_convert(57),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      width: Width_convert(70),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    휴대폰번호
                  </Text>
                  <TextInput
                    placeholder={
                      reduexState.loginDataCheck?.login?.data?.iu_phone
                    }
                    placeholderTextColor={'#A7A7A7'}
                    placeholderStyle={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#A7A7A7',
                    }}
                    style={{
                      width: Width_convert(230),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#A7A7A7',
                    }}></TextInput>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#C1C1C1',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        padding: Width_convert(5),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}>
                      재인증
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*휴대폰번호 끝 */}
              {/*지역 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                  height: Width_convert(57),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    height: Width_convert(57),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      width: Width_convert(28),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    지역
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(272),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    {
                      reduexState.loginDataCheck?.login?.data?.location
                        ?.legalcode
                    }
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#C1C1C1',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        padding: Width_convert(5),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}>
                      재인증
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*지역 끝 */}
              {/*차종 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                }}>
                {/**하나랑 두개 스타일 다름. */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    //height: Width_convert(57),//하나있을때
                    //두개부터는 height없애고
                    marginTop: Width_convert(21),

                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      width: Width_convert(28),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    차종
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(234),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    기아 스팅어, 2.0T, 17~19년형
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      props.navigation.navigate('InfoCar');
                    }}
                    style={{
                      marginRight: Width_convert(5),
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#C1C1C1',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                      }}>
                      변경
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#EF6666',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                      }}>
                      삭제
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Width_convert(12),
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      width: Width_convert(28),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#FFFFFF',
                      marginRight: Width_convert(13),
                    }}>
                    차종
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(234),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    기아 스팅어, 2.0T, 17~19년형
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      marginRight: Width_convert(5),
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#C1C1C1',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                      }}>
                      변경
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#EF6666',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                      }}>
                      삭제
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: Width_convert(21),
                    marginBottom: Width_convert(21),
                    width: Width_convert(375),
                    height: Height_convert(28),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                    <PurplePlus></PurplePlus>
                  </TouchableOpacity>
                </View>
              </View>
              {/*차종 끝 */}
              {/*아이디 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                  height: Width_convert(57),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    height: Width_convert(57),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    아이디
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    {reduexState.loginDataCheck?.login?.data?.iu_id}
                  </Text>
                </View>
              </View>
              {/*아이디 끝 */}
              {/*비밀번호 시작 */}
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  width: Width_convert(375),
                  height: Width_convert(57),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(16),
                    marginRight: Width_convert(11),
                    width: Width_convert(375 - 27),
                    height: Width_convert(57),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      width: Width_convert(56),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(15),
                      color: '#C4C4C4',
                      marginRight: Width_convert(13),
                    }}>
                    비밀번호
                  </Text>
                  <TextInput
                    placeholder="영문+숫자+특수문자 8~20자"
                    placeholderTextColor={'rgba(0, 0, 0, 0.2)'}
                    placeholderStyle={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(12),
                      color: 'rgba(0, 0, 0, 0.2)',
                    }}
                    style={{
                      width: Width_convert(244),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(12),
                      color: '#000000',
                    }}></TextInput>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      width: Width_convert(35),
                      height: Width_convert(20),
                      backgroundColor: '#C1C1C1',
                      borderRadius: Font_normalize(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        padding: Width_convert(5),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(9),
                        color: '#FFFFFF',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}>
                      변경
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*비밀번호 끝 */}
              {/*마케팅 정보 수신 동의 시작 */}
              <View style={{marginTop: Height_convert(19)}}>
                <Text
                  style={{
                    marginLeft: Width_convert(17),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
                    color: '#000000',
                  }}>
                  마케팅 정보 수신 동의
                </Text>
                <Text
                  style={{
                    marginLeft: Width_convert(17),
                    marginTop: Height_convert(8),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#000000',
                  }}>
                  튜닝의 순정에서 보내드리는 다양한 정보를 받으실 수 있습니다
                </Text>
                <View
                  style={{
                    width: Width_convert(375),
                    marginTop: Height_convert(11),
                  }}>
                  <View
                    style={{
                      marginTop: Height_convert(8),
                      marginLeft: Width_convert(17),
                      width: Width_convert(339),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>카카오톡 수신동의</Text>
                    {reduexState.loginDataCheck?.login?.data?.marketting
                      ?.kakaotalk ? (
                      <CheckedBox
                        width={Width_convert(14)}
                        height={Width_convert(14)}></CheckedBox>
                    ) : (
                      <CheckBox
                        width={Width_convert(14)}
                        height={Width_convert(14)}></CheckBox>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: Height_convert(8),
                      marginLeft: Width_convert(17),
                      width: Width_convert(339),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>메일 수신동의</Text>
                    {reduexState.loginDataCheck?.login?.data?.marketting
                      ?.mail ? (
                      <CheckedBox
                        width={Width_convert(14)}
                        height={Width_convert(14)}></CheckedBox>
                    ) : (
                      <CheckBox
                        width={Width_convert(14)}
                        height={Width_convert(14)}></CheckBox>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: Height_convert(8),
                      marginLeft: Width_convert(17),
                      width: Width_convert(339),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>SMS 수신동의</Text>
                    {reduexState.loginDataCheck?.login?.data?.marketting
                      ?.sms ? (
                      <CheckedBox
                        width={Width_convert(14)}
                        height={Width_convert(14)}></CheckedBox>
                    ) : (
                      <CheckBox
                        width={Width_convert(14)}
                        height={Width_convert(14)}></CheckBox>
                    )}
                  </View>
                </View>
              </View>
              {/*마케팅 정보 수신 동의 끝 */}
              {/**로그아웃 회원탈퇴버튼 시작 */}
              <View
                style={{
                  marginTop: Height_convert(26),
                  width: Width_convert(375),
                  height: Height_convert(50),
                  backgroundColor: '#F0F0F0',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (reduexState.loginDataCheck.login.login == true) {
                      logout();
                    } else {
                    }
                  }}
                  style={{
                    width: Width_convert(375) / 2,
                    height: Height_convert(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#797979',
                    }}>
                    로그아웃
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate('Withdrawal');
                  }}
                  style={{
                    width: Width_convert(375) / 2,
                    height: Height_convert(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#797979',
                    }}>
                    회원탈퇴
                  </Text>
                </TouchableOpacity>
              </View>
              {/**로그아웃 회원탈퇴버튼 끝 */}
            </View>

            {/*하단 버튼만큼의 공간 띄우기 시작 */}
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(insets.bottom),
                backgroundColor: '#F0F0F0',
              }}></View>
            {/*하단 버튼만큼의 공간 띄우기 끝 */}
          </ScrollView>
        </DismissKeyboard>
      </KeyboardAvoidingView>
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    login: {
      login: state.loginDataCheck.login.login,
      iu_car: state.loginDataCheck.login.iu_car,
      location: state.loginDataCheck.login.location,
      _id: state.loginDataCheck.login._id,
      data: state.loginDataCheck.login.data,
    },
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLoginStatus: (boo) => {
      dispatch(ActionCreator.loginDataCheckAction(boo));
    },
    updateIuCar: (Array) => {
      dispatch(ActionCreator.loginDataIuCarCheckAction(Array));
    },
    updateLocation: (Object) => {
      dispatch(ActionCreator.loginDataLocationCheckAction(Object));
    },
    update_id: (text) => {
      dispatch(ActionCreator.loginData_idCheckAction(text));
    },
    updateData: (Object) => {
      dispatch(ActionCreator.loginDataDataCheckAction(Object));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);
