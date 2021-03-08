import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import BottomSignUpButton from '../../../components/More/SignUp/bottomSignUpButton.js';
import VirticalBar from '../../../../assets/home/vertical_bar.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import IsLoading from '../../../components/ActivityIndicator';
import Domain2 from '../../../../key/Domain2.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as Keychain from 'react-native-keychain';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import {prototype} from 'react-native/Libraries/Image/ImageBackground';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
const LoginScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const insets = useSafeAreaInsets();
  const [idText, setIdText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');
  const [messageShow, setMessageShow] = React.useState(false);
  const MessageShowChangeValue = () => {
    setMessageShow(true);
    setTimeout(function () {
      setMessageShow(false);
    }, 2000);
  };
  const LoginBack = () => {
    try {
      let result;
      let url = Domain2 + 'login';
      if (idText && passwordText) {
      } else {
        MessageShowChangeValue();
        return false;
      }
      let data = {
        idText: idText,
        passwordText: passwordText,
      };
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoading(true);
          //인터넷 연결이 확인되면 뒤에서 이메일 중복검사 진행
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].status == 'ok') {
            setIsLoading(false);
            await Keychain.setGenericPassword(idText, passwordText);
            props.updateLoginStatus(true);
            props.updateIuCar(result.data[0].loginData.iu_car);
            props.updateLocation(result.data[0].loginData.location);
            props.update_id(result.data[0].loginData._id);
            props.updateData(result.data[0].loginData);
            props.navigation.goBack();
          } else {
            setIsLoading(false);
            //로그인이 안됐어
            MessageShowChangeValue();
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      alert(err);
    }
  };
  return (
    <View>
      <DismissKeyboard>
        <SafeAreaView
          style={{
            backgroundColor: 'white',
            width: Width_convert(375),
            height: Height_convert(812),
          }}>
          {Platform.OS === 'android' &&
          props.route.params.fromNav === 'home' ? (
            <View style={{height: StatusBarHeight}}></View>
          ) : null}
          <StatusBar
            barStyle="dark-content"
            backgroundColor={'#FFFFFF'}></StatusBar>
          <View
            style={{
              height: Height_convert(170),
            }}>
            <Tabbar Title={'로그인'} navigation={props.navigation}></Tabbar>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(812),
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Width_convert(260),
                  height: Height_convert(64),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(24),
                    color: '#000000',
                    textAlign: 'right',
                    marginRight: Width_convert(4),
                    lineHeight: Font_normalize(27),
                  }}>
                  내가원하는튜닝부터{'\n'}투명한가격까지
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.Swagger || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(62),
                    color: '#000000',
                  }}>
                  투닝
                </Text>
              </View>
              <View
                style={{
                  marginTop: Height_convert(26),
                  width: Width_convert(273),
                  height: Height_convert(212),
                }}>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(45),
                  }}>
                  <TextInput
                    placeholder="아이디를 입력해주세요"
                    placeholderTextColor={'rgba(0,0,0,0.45)'}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    autoCorrect={false}
                    placeholderStyle={{
                      fontSize: Font_normalize(14),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}
                    onChangeText={(idText) => setIdText(idText)}
                    value={idText}
                    style={{
                      paddingLeft: Width_convert(9),
                      backgroundColor: 'rgba(196, 196, 196, 0.4)',
                      width: Width_convert(273),
                      height: Height_convert(45),
                      borderRadius: Font_normalize(4),
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontSize: Font_normalize(14),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}></TextInput>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(45),
                    marginTop: Height_convert(11),
                  }}>
                  <TextInput
                    placeholder="비밀번호를 입력해주세요"
                    placeholderTextColor={'rgba(0,0,0,0.45)'}
                    onChangeText={(value) => setPasswordText(value)}
                    autoCompleteType={'off'}
                    keyboardType="default"
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={passwordText}
                    placeholderStyle={{
                      fontSize: Font_normalize(14),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}
                    style={{
                      paddingLeft: Width_convert(9),
                      backgroundColor: 'rgba(196, 196, 196, 0.4)',
                      width: Width_convert(273),
                      height: Height_convert(45),
                      borderRadius: Font_normalize(4),
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontSize: Font_normalize(14),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}></TextInput>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(10),
                    marginTop: Height_convert(6),
                    marginBottom: Height_convert(6),
                  }}>
                  <Text
                    style={{
                      lineHeight: Font_normalize(10),
                      marginLeft: Width_convert(9),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                      color: '#FF0000',
                    }}>
                    {messageShow ? '아이디와 비밀번호를 확인해주세요' : null}
                  </Text>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(44),
                    marginTop: Height_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      LoginBack();
                    }}
                    style={{
                      width: Width_convert(273),
                      height: Height_convert(44),
                      backgroundColor: '#000000',
                      borderRadius: Font_normalize(7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: Font_normalize(16),
                        fontWeight: '700',
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        color: '#FFFFFF',
                      }}>
                      로그인
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(44),
                    marginTop: Height_convert(15),
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      props.navigation.navigate('IdFind', {
                        fromNav: props.route.params.fromNav,
                      });
                    }}
                    style={{
                      marginRight: Width_convert(5),
                      paddingTop: Height_convert(10),
                      paddingBottom: Height_convert(10),
                      paddingLeft: Width_convert(10),
                      paddingRight: Width_convert(10),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#9A9A9A',
                      }}>
                      아이디 찾기
                    </Text>
                  </TouchableOpacity>
                  <VirticalBar
                    style={{
                      marginRight: Width_convert(15),
                      marginTop: Height_convert(10),
                    }}></VirticalBar>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      paddingTop: Height_convert(10),
                      paddingBottom: Height_convert(10),
                      paddingRight: Width_convert(10),
                    }}
                    onPress={() => {
                      props.navigation.navigate('PasswordFind', {
                        fromNav: props.route.params.fromNav,
                      });
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#9A9A9A',
                      }}>
                      비밀번호 찾기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*하단 회원가입 안내 버튼 시작 */}
            <View style={{position: 'absolute', top: Height_convert(550)}}>
              <BottomSignUpButton
                navigation={props.navigation}></BottomSignUpButton>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(insets.bottom),
                }}></View>
            </View>
            {/*하단 회원가입 안내 버튼 끝 */}
            {/**ios 하단 indicator */}
          </View>
        </SafeAreaView>
      </DismissKeyboard>
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
