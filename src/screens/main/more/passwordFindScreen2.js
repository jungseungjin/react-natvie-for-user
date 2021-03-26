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
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const PasswordFindScreen2 = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [phoneNumber, setPhoneNumber] = React.useState(
    props.route.params.phoneNumber,
  );
  const [idText, setIdText] = React.useState(props.route.params.idText);
  const [password, setPassword] = React.useState('');
  const [passwordChk, setPasswordChk] = React.useState('');
  const [passwordRe, setPasswordRe] = React.useState('');
  const [passwordReChk, setPasswordReChk] = React.useState('');
  const [resultModal, setResultModal] = React.useState(false);
  const ResultModalChangeValue = (text) => setResultModal(text);
  function isPassword(asValue) {
    var check_num = /[0-9]/; // 숫자
    var check_eng = /[a-zA-Z]/; // 문자
    var check_spc = /[~!@#$%^&*()_+|<>?:{}'"-/;]/; // 특수문자
    if (
      check_num.test(asValue) &&
      check_eng.test(asValue) &&
      check_spc.test(asValue) &&
      asValue.length > 7 &&
      asValue.length < 21
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function PasswordChange() {
    try {
      let result;
      let url = Domain + 'signUp/passwordFind/passworkchange';
      let data = {
        phoneNumber: phoneNumber,
        idText: idText,
        password: password,
      };
      if (phoneNumber && idText && password && passwordChk && passwordReChk) {
      } else {
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          //인터넷 연결이 확인되면 뒤에서 이메일 중복검사 진행
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].status == 'ok') {
            setIsLoadingAndModal(0);
            props.navigation.navigate('Login', {
              fromNav: props.route.params.fromNav,
            });
          } else {
            setIsLoadingAndModal(0);
            //없어
            setResultModal(true);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      setIsLoadingAndModal(3);
      console.log(err);
      alert(err);
    }
  }
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
        Title={'비밀번호 찾기2'}
        navigation={props.navigation}
        PasswordChange={PasswordChange}
        passwordChk={passwordChk}
        passwordReChk={passwordReChk}></Tabbar>
      <View
        style={{
          marginLeft: Width_convert(24),
          marginRight: Width_convert(24),
          marginTop: Height_convert(50),
          width: Width_convert(327),
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#000000',
            width: Width_convert(327),
            height: Width_convert(35),
          }}>
          <View>
            <TextInput
              placeholder="비밀번호"
              placeholderTextColor="#CCCCCC"
              value={password}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(value) => {
                if (value.indexOf(' ') != -1) {
                  value = value.replace(/ /gi, '');
                }
                setPassword(value);
              }}
              onBlur={() => {
                setPasswordChk(isPassword(password));
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
                width: Width_convert(327),
                height: Width_convert(40),
                paddingLeft: Width_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
                lineHeight: Font_normalize(14),
              }}></TextInput>
          </View>
          {passwordChk === false ? (
            <Text
              style={{
                marginTop: Height_convert(7),
                paddingLeft: Width_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#FF0000',
              }}>
              영문/숫자/특수문자 8~20자
            </Text>
          ) : null}
        </View>

        {/**비밀번호 재입력 */}
        <View
          style={{
            borderBottomWidth: 1,
            width: Width_convert(327),
            height: Width_convert(73),
          }}>
          <View>
            <TextInput
              placeholder="비밀번호 재입력"
              placeholderTextColor="#CCCCCC"
              value={passwordRe}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(value) => {
                if (value.indexOf(' ') != -1) {
                  value = value.replace(/ /gi, '');
                }
                setPasswordRe(value);
              }}
              onBlur={() => {
                setPasswordReChk(isPassword(passwordRe));
                if (passwordRe != password) {
                  setPasswordReChk(false);
                }
              }}
              onSubmitEditing={() => {
                PasswordChange();
              }}
              placeholderStyle={{
                marginTop: Width_convert(35),
                paddingLeft: Width_convert(10),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
              }}
              style={{
                width: Width_convert(327),
                marginTop: Width_convert(35),
                height: Width_convert(40),
                paddingLeft: Width_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
              }}></TextInput>
            {passwordReChk === false ? (
              <Text
                style={{
                  marginTop: Height_convert(7),
                  paddingLeft: Width_convert(5),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(11),
                  fontWeight: '400',
                  color: '#FF0000',
                }}>
                비밀번호와 동일하게 입력해주세요
              </Text>
            ) : null}
          </View>
        </View>
      </View>
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
export default PasswordFindScreen2;
