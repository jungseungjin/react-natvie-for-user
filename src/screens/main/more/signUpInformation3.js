import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import IsLoading from '../../../components/ActivityIndicator';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
const SignUpInformation = (props) => {
  const [agree, setAgree] = React.useState(props.route.params.agree);
  const [phoneNumber, setPhoneNumber] = React.useState(
    props?.route?.params?.phoneNumber || null,
  );
  const [pickBrand, setPickBrand] = React.useState(
    props?.route?.params?.pickBrand || null,
  ); //디비에서 가져온 브랜드값
  const [pickModel, setPickModel] = React.useState(
    props?.route?.params?.pickModel || null,
  ); //디비에서 가져온 모델값
  const [pickModelDetail, setPickModelDetail] = React.useState(
    props?.route?.params?.pickModelDetail || null,
  ); //디비에서 가져온 상세모델값

  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [nameModal, setNameModal] = React.useState(false);
  const NameModalChangeValue = (text) => setNameModal(text);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailValid, setEmailValid] = React.useState('');
  const [emailChk, setEmailChk] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }
  const EmailChk = async (text) => {
    try {
      let result;
      let url = Domain2 + 'signUp/emailchk';
      let data = {
        name: name,
        email: email,
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
            setEmailChk(true);
          } else {
            setIsLoading(false);
            setShowModal(true);
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
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {Platform.OS === 'android' && props.route.params.fromNav === 'home' ? (
        <View style={{height: StatusBarHeight}}></View>
      ) : null}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        fromNav={
          Platform.OS === 'android' && props.route.params.fromNav === 'home'
            ? 'home'
            : null
        }
        Title={'회원가입3'}
        navigation={props.navigation}
        phoneNumber={phoneNumber}
        pickBrand={pickBrand}
        pickModel={pickModel}
        pickModelDetail={pickModelDetail}
        name={name}
        email={email}
        emailChk={emailChk}
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
          style={{
            borderBottomWidth: 1,
            width: Width_convert(327),
            height: Width_convert(35),
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="회원님의 성함을 적어주세요"
            placeholderTextColor="#CCCCCC"
            value={name}
            editable={emailChk ? false : true}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            onChangeText={(value) => {
              setName(value);
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
              width: Width_convert(200),
              height: Width_convert(40),
              paddingLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
            }}></TextInput>
        </View>

        <View
          style={{
            width: Width_convert(327),
            height: Width_convert(73),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              marginRight: Width_convert(13),
              width: Width_convert(243),
              height: Width_convert(44),
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
            }}>
            <TextInput
              placeholder="이메일 주소를 입력해주세요"
              placeholderTextColor="#CCCCCC"
              value={email}
              editable={emailChk ? false : true}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              keyboardType={'email-address'}
              onChangeText={(value) => {
                setEmail(value);
              }}
              onSubmitEditing={() => {
                if (isEmail(email)) {
                  //유효성검사 통과하면 다음 중복검사 진행
                  setEmailValid(isEmail(email));
                  if (!name) {
                    setNameModal(true);
                    //이름을 입력하지 않으면 이름을 입력하라는 모달 띄우기
                  } else {
                    EmailChk();
                    //중복검사 진행.
                  }
                } else {
                  //유효성검사 통과 못하면 하단의 글씨 2초동안 나오기
                  setEmailValid(isEmail(email));
                  setTimeout(() => setEmailValid(''), 2000);
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
                width: Width_convert(200),
                height: Width_convert(40),
                paddingLeft: Width_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
              }}></TextInput>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isEmail(email)) {
                //유효성검사 통과하면 다음 중복검사 진행
                setEmailValid(isEmail(email));
                if (!name) {
                  setNameModal(true);
                  //이름을 입력하지 않으면 이름을 입력하라는 모달 띄우기
                } else {
                  EmailChk();
                  //중복검사 진행.
                }
              } else {
                //유효성검사 통과 못하면 하단의 글씨 2초동안 나오기
                setEmailValid(isEmail(email));
                setTimeout(() => setEmailValid(''), 2000);
              }
            }}
            style={{
              width: Width_convert(71),
              height: Width_convert(29),
              borderRadius: Font_normalize(3),
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderRightColor: '#CCCCCC',
              borderLeftColor: '#CCCCCC',
              borderTopColor: '#CCCCCC',
              borderBottomColor: '#CCCCCC',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#000000',
              }}>
              중복확인
            </Text>
          </TouchableOpacity>
        </View>
        {emailValid === false ? (
          <View
            style={{
              marginTop: Height_convert(7),
              marginLeft: Width_convert(4),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#FF0000',
              }}>
              이메일 형식을 정확히 입력해주세요
            </Text>
          </View>
        ) : null}
      </View>
      {showModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={'이미 가입된 중복 메일계정입니다.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {nameModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={NameModalChangeValue}
          navigation={props.navigation}
          Title={'회원님의 성함을 입력해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {networkModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}

      {isLoading ? <IsLoading></IsLoading> : null}
    </SafeAreaView>
  );
};
export default SignUpInformation;
