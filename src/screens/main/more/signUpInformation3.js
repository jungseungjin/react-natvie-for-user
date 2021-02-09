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
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';

const SignUpInformation = (props) => {
  //이메일 입력하면 emailValid를 유효성검사로 넘김.(중복확인눌렀을 때??)
  //중복확인을 눌렀을 때 emailValid가 true여야 아래 진행.  emailValid가 false면 하단에 빨간글씨 나오고 return.
  //이름이랑 메일 뒷단으로 넘겨서 중복확인 시키고 중복이면 showModal을 true로 emailChk는 false
  //중복이 아니면 showModal을 false emailChk는 true로
  // emailChk는 true로 되면 이름,이메일 변경불가능하게 바꾸고 다음버튼 활성화. 다음버튼에서 폰번호 차량정보 이름 이메일 모두 가지고 다음으로
  console.log(props);
  const [phoneNumber, setPhoneNumber] = React.useState(
    props?.route?.params?.phoneNumber,
  );
  const [pickBrand, setPickBrand] = React.useState(
    props?.route?.params?.pickBrand,
  ); //디비에서 가져온 브랜드값
  const [pickModel, setPickModel] = React.useState(
    props?.route?.params?.pickModel,
  ); //디비에서 가져온 모델값
  const [pickModelDetail, setPickModelDetail] = React.useState(
    props?.route?.params?.pickModelDetail,
  ); //디비에서 가져온 상세모델값

  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailValid, setEmailValid] = React.useState('');
  const [emailChk, setEmailChk] = React.useState(false);
  const [showModal, setShowModel] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModel(text);
  function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        Title={'회원가입3'}
        navigation={props.navigation}
        emailChk={emailChk}></Tabbar>
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
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              keyboardType={'email-address'}
              onChangeText={(value) => {
                setEmail(value);
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
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isEmail(email)) {
                setEmailValid(isEmail(email));
                if (!name) {
                } else {
                }
              } else {
                setEmailValid(isEmail(email));
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
        <ButtonOneModal
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={'이미 가입된 중복 메일계정입니다'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
    </SafeAreaView>
  );
};
export default SignUpInformation;
