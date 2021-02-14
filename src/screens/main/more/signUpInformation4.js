import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
import {TextInputMask} from 'react-native-masked-text';
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
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import Geolocation from 'react-native-geolocation-service';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import IsLoading from '../../../components/ActivityIndicator';
import DeviceInfo from 'react-native-device-info';
const SignUpInformation = (props) => {
  const [agree, setAgree] = React.useState(props.route.params.agree);
  //디바이스정보 확인하고 , 약관 동의한것 넘겨받아서 백엔드로 넘겨준다. 가입  디바이스에서 어떤정보를 받을지 확인 + 위치정보 더 가져오기
  //넘어가는 데이터 모두 태그 제거하자.
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
  const [name, setName] = React.useState(props?.route?.params?.name || null); //디비에서 가져온 상세모델값
  const [email, setEmail] = React.useState(props?.route?.params?.email || null); //디비에서 가져온 상세모델값

  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);

  const [nickName, setNickName] = React.useState('');
  const [nickNameChk, setNickNameChk] = React.useState(''); //유효성검사
  const [nickNameChk2, setNickNameChk2] = React.useState(''); //중복검사

  function isNickName(asValue) {
    var regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (regExp.test(asValue) && asValue.length > 1 && asValue.length < 9) {
      return true;
    } else {
      return false;
    }
  }
  const NicknameChk = async (text) => {
    try {
      let result;
      let url = Domain2 + 'signUp/nicknamechk';
      let data = {
        nickName: text,
      };
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //인터넷 연결이 확인되면 뒤에서 이메일 중복검사 진행
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setNickNameChk2(true);
          } else {
            setNickNameChk2(false);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  const [password, setPassword] = React.useState('');
  const [passwordChk, setPasswordChk] = React.useState('');
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
  const [birthDay, setBirthDay] = React.useState('');

  //위치정보사용 퍼미션
  const handleLocationPermission = async (Type) => {
    if (Type == 'ios') {
      const res = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (res === RESULTS.GRANTED) {
        return true;
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (res2 === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (res === RESULTS.GRANTED) {
        return true;
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (res2 === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  //보여주기용 주소
  const [locationView, setLocationView] = React.useState('');
  //경위도
  const [location, setLocation] = React.useState({longitude: '', latitude: ''});
  const [locationResult, setLocationResult] = React.useState([]);
  const [device, setDevice] = React.useState([]);

  React.useEffect(() => {
    let push_arr = [];
    push_arr.push({getUniqueId: DeviceInfo.getUniqueId()});
    push_arr.push({getDeviceId: DeviceInfo.getDeviceId()});
    push_arr.push({getModel: DeviceInfo.getModel()});
    setDevice(push_arr);
  }, []);
  //위치정보 가져오기(경위도, 네이버지도에서 주소까지)
  const CurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        getNaverLocagtion(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getNaverLocagtion = async (position) => {
    try {
      setIsLoading(true);
      position.coords.longitude = 126.70528; //지워야함
      position.coords.latitude = 37.45639; //지워야함
      let result = await axios.get(
        'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=' +
          position.coords.longitude +
          ',' +
          position.coords.latitude +
          '&orders=legalcode,admcode,addr,roadaddr&&output=json',
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': '56kfacm95e',
            'X-NCP-APIGW-API-KEY': 'cyhAcOnJGtzyYZiQFDcOkWkJcsL5t0FAQ3bJldMR',
          },
        },
      );
      //legalcode admcode addr roadaddr
      //법정동 행정동 지번주소 도로명주소
      if (result.data.status.message == 'done') {
        setIsLoading(false);
        setLocationResult(result.data.results);
        setLocationView(
          result.data.results[0].region.area1.name +
            ' ' +
            result.data.results[0].region.area2.name +
            ' ' +
            result.data.results[0].region.area3.name,
        );
      } else {
        setIsLoading(false);
        setLocationView('요청한 데이타의 결과가 없습니다.');
        //네이버 맵에 없음
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      alert(err);
    }
  };
  //회원가입 함수
  const SignUpBack = () => {
    try {
      let result;
      let url = Domain2 + 'signUp/complete';
      if (
        phoneNumber &&
        pickBrand &&
        pickModel &&
        pickModelDetail &&
        name &&
        email &&
        nickName &&
        password &&
        birthDay &&
        locationView
      ) {
        if (locationView == '요청한 데이타의 결과가 없습니다.') {
          alert('위치정보를 확인해 주세요');
          return false;
        }
      } else {
        alert('빈칸을 모두 입력해 주세요');
        return false;
      }
      let data = {
        phoneNumber: phoneNumber,
        pickBrand: pickBrand,
        pickModel: pickModel,
        pickModelDetail: pickModelDetail,
        name: name,
        email: email,
        nickName: nickName,
        password: password,
        birthDay: birthDay,
        locationView: locationView,
        location: location,
        agree: agree,
        locationResult: locationResult,
        device: device,
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
            props.navigation.navigate('SignUpComplete');
          } else {
            setIsLoading(false);
            //가입이 안됐어
            alert(result.data[0].message);
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        Title={'회원가입4'}
        SignUpBack={SignUpBack}
        navigation={props.navigation}
        phoneNumber={phoneNumber}
        pickBrand={pickBrand}
        pickModel={pickModel}
        pickModelDetail={pickModelDetail}
        name={name}
        email={email}
        nickName={nickName}
        password={password}
        birthDay={birthDay}
        locationView={locationView}
        location={location}
        nickNameChk={nickNameChk}
        nickNameChk2={nickNameChk2}
        passwordChk={passwordChk}></Tabbar>
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
                marginLeft: Width_convert(24),
                marginRight: Width_convert(24),
                marginTop: Height_convert(50),
                width: Width_convert(327),
              }}>
              {/*이름 */}
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
                  editable={false}
                  onChangeText={(value) => {}}
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
              {/*이름 */}
              {/*이메일 */}
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
                    underlineColorAndroid="transparent"
                    placeholder="이메일 주소를 입력해주세요"
                    placeholderTextColor="#CCCCCC"
                    value={email}
                    editable={false}
                    onChangeText={(value) => {}}
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
                  onPress={() => {}}
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
                      color: '#CCCCCC',
                    }}>
                    중복확인
                  </Text>
                </TouchableOpacity>
              </View>
              {/*이메일 */}
              {/**닉네임 */}
              <View
                style={{
                  width: Width_convert(327),
                  height: Width_convert(73),
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                  }}>
                  <TextInput
                    placeholder="닉네임_한글+영문+숫자 2~10자, 띄어쓰기 불가"
                    placeholderTextColor="#CCCCCC"
                    value={nickName}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => {
                      if (value.indexOf(' ') != -1) {
                        //공백제거
                        value = value.replace(/ /gi, '');
                      }
                      setNickName(value);
                      //유효성검사 확인
                      setNickNameChk(isNickName(value));
                      if (isNickName(value)) {
                        //닉네임 유효성검사를 통과하면 중복검사 진행
                        NicknameChk(value);
                      }
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
                      marginTop: Width_convert(35),
                      height: Width_convert(40),
                      paddingLeft: Width_convert(5),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '400',
                      color: '#000000',
                    }}></TextInput>
                </View>
                {nickNameChk === false || nickNameChk2 === false ? (
                  <Text
                    style={{
                      marginTop: Height_convert(7),
                      paddingLeft: Width_convert(5),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(11),
                      fontWeight: '400',
                      color: '#FF0000',
                    }}>
                    {nickNameChk === false
                      ? '닉네임을 정확히 입력해 주세요'
                      : nickNameChk2 === false
                      ? '동일한 닉네임이 존재합니다'
                      : null}
                  </Text>
                ) : null}
              </View>
              {/**비밀번호 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                }}>
                <View>
                  <TextInput
                    placeholder="비밀번호_영문+숫자+특수문자 8~20자"
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
                      setPasswordChk(isPassword(value));
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
                      marginTop: Width_convert(35),
                      height: Width_convert(40),
                      paddingLeft: Width_convert(5),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '400',
                      color: '#000000',
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
                    비밀번호 형식을 확인해주세요
                  </Text>
                ) : null}
              </View>
              {/**생년월일 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                  justifyContent: 'center',
                }}>
                <TextInputMask
                  placeholder="생년월일_1994.01.11"
                  placeholderTextColor="#CCCCCC"
                  type={'datetime'}
                  options={{
                    format: 'YYYY.MM.DD',
                  }}
                  value={birthDay}
                  onChangeText={(value) => {
                    setBirthDay(value);
                  }}
                  style={{
                    marginTop: Width_convert(35),
                    height: Width_convert(40),
                    paddingLeft: Width_convert(5),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(14),
                    fontWeight: '400',
                    color: '#000000',
                  }}
                />
              </View>
              {/*차종*/}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="차종"
                  placeholderTextColor="#CCCCCC"
                  editable={false}
                  value={
                    pickModelDetail?.brand == undefined
                      ? null
                      : pickModelDetail?.model_detail == undefined
                      ? pickModelDetail?.brand + ' ' + pickModelDetail?.model
                      : pickModelDetail?.brand +
                        ' ' +
                        pickModelDetail?.model_detail
                  }
                  onChangeText={(value) => {}}
                  placeholderStyle={{
                    marginTop: Width_convert(35),
                    paddingLeft: Width_convert(10),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(14),
                    fontWeight: '400',
                    color: '#000000',
                  }}
                  style={{
                    marginTop: Width_convert(35),
                    height: Width_convert(40),
                    paddingLeft: Width_convert(5),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(14),
                    fontWeight: '400',
                    color: '#000000',
                  }}></TextInput>
              </View>
              {/*지역 */}
              <View
                style={{
                  marginTop: Width_convert(35),
                  width: Width_convert(327),
                  height: Width_convert(73),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: Width_convert(285),
                    height: Width_convert(35),
                  }}>
                  <TextInput
                    placeholder="가게와의 거리를 알기 위한 지역설정이 필요해요"
                    placeholderTextColor="#CCCCCC"
                    editable={false}
                    value={locationView}
                    onChangeText={(value) => {}}
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
                  onPress={() => {}}
                  style={{
                    width: Width_convert(35),
                    height: Width_convert(35),
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomColor: '#CCCCCC',
                    borderTopColor: '#CCCCCC',
                    borderLeftColor: '#CCCCCC',
                    borderRightColor: '#CCCCCC',
                    borderRadius: Font_normalize(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Search></Search>
                </TouchableOpacity>
              </View>

              {/*지역설정버튼 */}
              <View
                style={{
                  marginTop: Width_convert(15),
                  width: Width_convert(327),
                  height: Width_convert(46),
                  borderRadius: Font_normalize(3),
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomColor: '#CCCCCC',
                  borderTopColor: '#CCCCCC',
                  borderLeftColor: '#CCCCCC',
                  borderRightColor: '#CCCCCC',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (handleLocationPermission(Platform.OS)) {
                      //위치정보 사용 ok 현재위치를 가져와야합니다. 어디서?? 네이버에서
                      CurrentPosition(); //경위도 찍고
                    } else {
                      //위치정보 켜달라는 모달 띄우기
                      setLocationModal(true);
                    }
                  }}
                  style={{}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    지역 설정하기
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: Width_convert(9),
                  marginBottom: Width_convert(50),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(9),
                    fontWeight: '400',
                    color: '#000000',
                  }}>
                  *지역 설정하기 버튼을 누르시면 자동으로 주소설정이 됩니다.
                </Text>
              </View>
            </View>
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
      {locationModal ? (
        <ButtonTwoModal
          Title={'지역 설정을 위해 위치서비스를 켜 주세요'}
          navigation={props.navigation}
          ShowModalChangeValue={LocationModalChangeValue}
          LeftButtonTitle={'닫기'}
          RightButtonTitle={'설정'}></ButtonTwoModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
    </SafeAreaView>
  );
};
export default SignUpInformation;
