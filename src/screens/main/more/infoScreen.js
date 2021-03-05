import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
  checkNotifications,
} from 'react-native-permissions';
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
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import InputPhoneNumber from '../../../components/InputPhoneNumber.js';
import BackgroundTimer from 'react-native-background-timer';
import auth from '@react-native-firebase/auth';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import ImagePicker from 'react-native-image-crop-picker';
import key from '../../../../key/key.js';
import moment from 'moment';
import S3 from 'aws-sdk/clients/s3';
import fs from 'react-native-fs';
import base64_arraybuffer from 'base64-arraybuffer';
import {Braket} from 'aws-sdk';
const InfoScreen = (props) => {
  //저장으로 값이 변경되는거라면 state잡아서 넣어주고 시작해야함
  //저장을 해야 값이 변경됨.
  //닉네임은 변경된거 있으면 가지고들어가고
  //confirmChk -> 휴대폰번호 변경
  //지역도 변경된거 있음녀 가지고 들어가고
  //차량...

  //비밀번호수정
  const ChangePassword = () => {
    try {
      if (reduexState.loginDataCheck.login.login == false) {
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'signUp/passwordFind/passworkchange';
          let data = {
            _id: reduexState.loginDataCheck.login.data._id,
            password: password,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            await Keychain.resetGenericPassword();
            setPasswordChangeModal(true);
            props.updateLoginStatus(false);
            props.updateIuCar([]);
            props.updateLocation({});
            props.update_id('');
            props.updateData({}); //디바이스정보라도 넣어줘야??
          }
        } else {
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
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
  //마케팅정보수신동의수정
  const ChangeMarkettting = (type) => {
    try {
      if (reduexState.loginDataCheck.login.login == false) {
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let marketting;
          if (type == 'kakaotalk') {
            marketting = {
              kakaotalk: !reduexState.loginDataCheck.login.data.marketting
                .kakaotalk,
              mail: reduexState.loginDataCheck.login.data.marketting.mail,
              sms: reduexState.loginDataCheck.login.data.marketting.sms,
            };
          } else if (type == 'mail') {
            marketting = {
              kakaotalk:
                reduexState.loginDataCheck.login.data.marketting.kakaotalk,
              mail: !reduexState.loginDataCheck.login.data.marketting.mail,
              sms: reduexState.loginDataCheck.login.data.marketting.sms,
            };
          } else if (type == 'sms') {
            marketting = {
              kakaotalk:
                reduexState.loginDataCheck.login.data.marketting.kakaotalk,
              mail: reduexState.loginDataCheck.login.data.marketting.mail,
              sms: !reduexState.loginDataCheck.login.data.marketting.sms,
            };
          } else {
            return;
          }
          let url = Domain2 + 'setting/info/marketting';
          let data = {
            _id: reduexState.loginDataCheck.login.data._id,
            marketting: marketting,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            let prevData = reduexState.loginDataCheck.login.data;
            prevData.marketting = marketting;
            props.updateData(prevData); //디바이스정보라도 넣어줘야??
          }
        } else {
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reduexState = useSelector((state) => state);
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState('info');

  const [brandList, setBrandList] = React.useState([]);
  const [category, setCategory] = React.useState('domestic');
  const CategoryChangeValue = (text) => setCategory(text);
  const [pickBrand, setPickBrand] = React.useState({}); //디비에서 가져온 브랜드값
  const PickBrandChangeValue = (object) => setPickBrand(object);
  const [pickModel, setPickModel] = React.useState({}); //디비에서 가져온 모델값
  const PickModelChangeValue = (object) => setPickModel(object);
  const [pickModelDetail, setPickModelDetail] = React.useState({}); //디비에서 가져온 상세모델값
  const PickModelDetailChangeValue = (object) => setPickModelDetail(object);

  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [nickname, setNickname] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState({});
  const [car, setCar] = React.useState(
    reduexState.loginDataCheck?.login?.data?.iu_car,
  );
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const PageChangeValue = (text) => setPage(text);

  //차량데이터 추가 or 변경
  const AddCarData = () => {
    let prevData = car.slice();
    if (page == 'carAdd') {
      //차량정보 추가
      prevData.push({
        pickBrand: pickBrand,
        pickModel: pickModel,
        pickModelDetail: pickModelDetail,
      });
    } else if (page.indexOf('carChange') != -1) {
      //차량정보 변경
      let index = page.replace('carChange', '');
      prevData[index] = {
        pickBrand: pickBrand,
        pickModel: pickModel,
        pickModelDetail: pickModelDetail,
      };
    }
    setCar(prevData);
    setPickBrand({});
    setPickModel({});
    setPickModelDetail({});
    setPage('info');
  };
  //차량데이터 삭제
  const DeleteCarData = (index) => {
    try {
      let prevData = car.slice();
      prevData.splice(index, 1);
      setCar(prevData);
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  };
  //차량데이터 대표차량 변경
  const ChangeCarData = (index) => {
    let prevData = car.slice();
    let changeData1 = prevData[index]; //변경될데이터
    let changeData2 = prevData[0]; //변경될데이터
    prevData[0] = changeData1;
    prevData[index] = changeData2;
    setCar(prevData);
  };
  //변경된값 저장
  const saveData = () => {
    //저장 눌러서 데이터 수정하기.
    try {
      if (reduexState.loginDataCheck.login.login == false) {
        //로그아웃상태면 아무것도 하지 않음.
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //수정된 데이터를 구분해서 값 넣어주기
          let data = {
            //차량데이터는 초기값이 redux에 저장된 로그인데이터값이니 그대로 이용
            iu_car: car,
            _id: reduexState.loginDataCheck.login.data._id,
            userImage: userImage,
          };
          if (nickname.length > 0) {
            //닉네임에 값이 들어가있으면
            data.iu_nickname = nickname.trim();
          } else {
            //값이 없으면 원래값
            data.iu_nickname = reduexState.loginDataCheck.login.data.iu_nickname.trim();
          }
          if (location?.legalcode) {
            //지역에 값이 들어가 있으면
            if (location?.legalcode != '요청한 데이타의 결과가 없습니다.') {
              data.location = location;
            } else {
              return false;
            }
          } else {
            //값이 없으면 원래값
            data.location = reduexState.loginDataCheck.login.data.location;
          }
          if (confirmChk) {
            //휴대폰 인증이 되지 않았으면
            data.iu_phone = phoneNumber.trim();
          } else {
            //원래값
            data.iu_phone = reduexState.loginDataCheck.login.data.iu_phone.trim();
          }
          let url = Domain2 + 'info/changedata';
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            props.updateIuCar(result.data[0].result.iu_car);
            props.updateLocation(result.data[0].result.location);
            props.updateData(result.data[0].result);
            //변경되었으니 리덕스에 값도 변경시키기
            props.navigation.goBack();
            props.navigation.navigate('Home');
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

  const addImage = () => {
    try {
      ImagePicker.openPicker({
        height: 1280,
        compressImageMaxWidth: 1280,
        width: 960,
        compressImageMaxHeight: 960,
        multiple: false,
        //maxFiles: 4,
      })
        .then((images) => {
          uploadImageOnS3(images);
        })
        .catch((e) => {
          console.log('err pickWithCamera: ', e);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImageOnS3 = async (file) => {
    const s3bucket = new S3({
      accessKeyId: key.amazonID,
      secretAccessKey: key.amazonSECRET,
      Bucket: key.amazonBUCKET_NAME,
      signatureVersion: 'v4',
    });
    await s3bucket.createBucket(async () => {
      let contentType = 'image/jpeg';
      let contentDeposition =
        'User_image/' + moment().valueOf() + file.filename;
      let base64 = await fs.readFile(file.path, 'base64');
      let arrayBuffer = base64_arraybuffer.decode(base64);
      let params = {
        Bucket: key.amazonBUCKET_NAME,
        Key: contentDeposition,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      };
      await s3bucket.upload(params, (err, data) => {
        if (err) {
          console.log('error in callback');
        } else {
          setUserImage(data.Location);
          forceUpdate();
        }
      });
    });
  };
  const [password, setPassword] = React.useState('');
  const [passwordChk, setPasswordChk] = React.useState('');
  const [passwordChangeModal, setPasswordChangeModal] = React.useState(false);
  const PasswordChangeModalChangeValue = (text) => {
    setPasswordChangeModal(text);
    props.navigation.navigate('Login');
  };
  const [userImage, setUserImage] = React.useState(
    reduexState.loginDataCheck.login?.data?.review_user_iu_image || null,
  );

  const [minutes, setMinutes] = React.useState(parseInt(0)); //시간초 타이머
  const [seconds, setSeconds] = React.useState(parseInt(0));
  const [visible, setVisible] = React.useState(false); //1분이내 재발송 안됨 메시지 출력여부
  const [authButtonClick, setAuthButtonClick] = React.useState(false); //인증번호받기 버튼을 눌렀는지 여부
  const [authNumber, setAuthNumber] = React.useState(''); //코드넘버
  const [confirm, setConfirm] = React.useState(null); //인증함수
  const [confirmChk, setConfirmChk] = React.useState(false); //인증함수를 거쳐서 인증이 되었는지 여부

  const [confirmModal, setConfirmModal] = React.useState(false);
  const ConfirmModalChangeValue = (text) => setConfirmModal(text);
  const [confirmErrorModal, setConfirmErrorModal] = React.useState(false);
  const ConfirmErrorModalChangeValue = (text) => setConfirmErrorModal(text);
  async function signInWithPhoneNumber(text) {
    //3분카운트 들어가야함
    if (reduexState.loginDataCheck.login.login == false) {
      return false;
    }
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
      setConfirmModal(true);
    } catch (error) {
      setConfirmChk(false);
      setConfirmErrorModal(true);
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
  const logout = async () => {
    try {
      if (reduexState.loginDataCheck.login.login == false) {
        return false;
      }
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
  //위치정보를 눌렀을 때 1 퍼미션 확인  2 퍼미션 허용되면 gps켜져있는지 확인해서 위치 가져오기 // gps꺼져있으면 gps켜달라고 하기. 끝 3 퍼미션이 허용되지 않았으면 퍼미션 허용해달라고 하기
  //위치정보사용 퍼미션
  const handleLocationPermission = async (Type) => {
    if (reduexState.loginDataCheck.login.login == false) {
      return false;
    }
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
  //위치정보 가져오기(경위도, 네이버지도에서 주소까지)
  const CurrentPosition = () => {
    if (reduexState.loginDataCheck.login.login == false) {
      return false;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          location: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
        });
        getNaverLocagtion(position);
      },
      (error) => {
        console.log(error.code, error.message);
        if (error.message.indexOf('permission denied') != -1) {
          setLocationModal(true);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getNaverLocagtion = async (position) => {
    try {
      if (reduexState.loginDataCheck.login.login == false) {
        return false;
      }
      setIsLoading(true);
      // position.coords.longitude = 126.70528; //지워야함
      // position.coords.latitude = 37.45639; //지워야함
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
        let newData = {
          location: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
          legalcode:
            result.data.results[0].region.area1.name +
            ' ' +
            result.data.results[0].region.area2.name +
            ' ' +
            result.data.results[0].region.area3.name,
        };
        setLocation(newData);
      } else {
        setIsLoading(false);
        location.legalcode = '요청한 데이타의 결과가 없습니다.';
        setLocation(location);
        //네이버 맵에 없음
      }
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
      {page == 'info' ? (
        <>
          <Tabbar
            Title={'내정보'}
            navigation={props.navigation}
            saveData={saveData}></Tabbar>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
            }}
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
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      addImage();
                    }}
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
                        uri: userImage,
                        //headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </TouchableOpacity>
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
                      <TextInput
                        placeholder={
                          reduexState.loginDataCheck.login.data.iu_nickname
                        }
                        value={nickname}
                        onChangeText={(value) => {
                          setNickname(value);
                        }}
                        placeholderTextColor={'#000000'}
                        style={{
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '700',
                          fontSize: Font_normalize(16),
                          color: '#000000',
                        }}></TextInput>
                    </View>
                  </View>
                  {/*닉네임 끝 */}
                  {/*휴대폰번호 시작 */}
                  <View
                    style={{
                      borderBottomColor: '#EEEEEE',
                      borderBottomWidth: 1,
                      width: Width_convert(375),
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
                        editable={authButtonClick ? false : true}
                        placeholder={
                          reduexState.loginDataCheck?.login?.data?.iu_phone
                        }
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
                          color: '#000000',
                        }}></TextInput>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          if (phoneNumber.length == 13) {
                            signInWithPhoneNumber(phoneNumber);
                            setMinutes(parseInt(3));
                            setSeconds(parseInt(0));
                            setAuthButtonClick(true);
                          } else {
                            return false;
                          }
                        }}
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
                    {authButtonClick ? (
                      <View
                        style={{
                          marginTop: -Width_convert(25),
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
                            width: Width_convert(83),
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(15),
                            color: '#C4C4C4',
                          }}>
                          인증번호입력
                        </Text>
                        <TextInput
                          editable={confirmChk ? false : true}
                          keyboardType={'number-pad'}
                          value={authNumber}
                          onChangeText={(value) => {
                            if (value.length > 6) {
                            } else {
                              setAuthNumber(value);
                            }
                          }}
                          style={{
                            width: Width_convert(165),
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(16),
                            color: '#000000',
                          }}></TextInput>
                        <Text
                          style={[
                            {
                              width: Width_convert(30),
                              marginRight: Width_convert(16),
                              fontFamily: Fonts?.NanumSqureRegular || null,
                              fontWeight: '700',
                              fontSize: Font_normalize(11),
                              color: '#FF0000',
                            },
                            confirmChk
                              ? {
                                  color: '#FFFFFF',
                                }
                              : null,
                          ]}>
                          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            if (confirmChk) {
                            } else {
                              confirmCode(authNumber);
                            }
                          }}
                          style={{
                            width: Width_convert(56),
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
                            확인
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
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
                        {location.legalcode ||
                          reduexState.loginDataCheck?.login?.data?.location
                            ?.legalcode ||
                          null}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          if (handleLocationPermission(Platform.OS)) {
                            CurrentPosition(); //경위도 찍고
                          } else {
                            //퍼미션 허용해달라고 모달띄우기
                            setLocationModal(true);
                          }
                        }}
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
                    </View>
                    {car.length > 0
                      ? car.map((item) => (
                          <View
                            key={car.indexOf(item)}
                            style={{
                              flexDirection: 'row',
                              marginTop: Width_convert(12),
                              marginLeft: Width_convert(16),
                              marginRight: Width_convert(11),
                              width: Width_convert(375 - 27),
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {
                                if (car.indexOf(item) == 0) {
                                  //대표차량 안바꿈
                                } else {
                                  //대표차량 바꿈
                                  ChangeCarData(car.indexOf(item));
                                }
                              }}
                              style={[
                                {
                                  borderTopWidth: 1,
                                  borderBottomWidth: 1,
                                  borderRightWidth: 1,
                                  borderLeftWidth: 1,
                                  borderTopColor: '#C1C1C1',
                                  borderBottomColor: '#C1C1C1',
                                  borderRightColor: '#C1C1C1',
                                  borderLeftColor: '#C1C1C1',
                                  borderRadius: Font_normalize(2),
                                  marginRight: Width_convert(14),
                                },
                                car.indexOf(item) == 0
                                  ? {
                                      borderTopColor: '#946AEF',
                                      borderBottomColor: '#946AEF',
                                      borderRightColor: '#946AEF',
                                      borderLeftColor: '#946AEF',
                                    }
                                  : null,
                              ]}>
                              <Text
                                style={[
                                  {
                                    width: Width_convert(28),
                                    fontFamily:
                                      Fonts?.NanumSqureRegular || null,
                                    fontWeight: '700',
                                    fontSize: Font_normalize(9),
                                    color: '#C1C1C1',
                                    paddingTop: Width_convert(5),
                                    paddingBottom: Width_convert(5),
                                    paddingRight: Width_convert(5),
                                    paddingLeft: Width_convert(5),
                                    textAlign: 'center',
                                  },
                                  car.indexOf(item) == 0
                                    ? {
                                        color: '#946AEF',
                                      }
                                    : null,
                                ]}>
                                대표
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                width: Width_convert(234),
                                fontFamily: Fonts?.NanumSqureRegular || null,
                                fontWeight: '700',
                                fontSize: Font_normalize(16),
                                color: '#000000',
                              }}>
                              {item?.pickModelDetail?.brand +
                                ' ' +
                                item?.pickModelDetail?.model_detail}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {
                                setPage('carChange' + car.indexOf(item));
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
                              onPress={() => {
                                DeleteCarData(car.indexOf(item));
                              }}
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
                        ))
                      : null}
                    <View
                      style={{
                        marginTop: Width_convert(21),
                        marginBottom: Width_convert(21),
                        width: Width_convert(375),
                        height: Height_convert(28),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          setPage('carAdd');
                        }}>
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
                        onPress={() => {
                          if (passwordChk) {
                            ChangePassword();
                          } else {
                          }
                        }}
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
                    {passwordChk === false ? (
                      <View
                        style={{
                          marginLeft: Width_convert(16),
                          marginRight: Width_convert(11),
                          width: Width_convert(375 - 27),
                          flexDirection: 'row',
                          marginTop: -Width_convert(20),
                        }}>
                        <Text
                          style={{
                            width: Width_convert(58),
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(15),
                            color: '#FFFFFF',
                            marginRight: Width_convert(13),
                          }}>
                          비밀번호
                        </Text>
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '400',
                            fontSize: Font_normalize(9),
                            color: '#FF0202',
                          }}>
                          잘못된 비밀번호 형식입니다
                        </Text>
                      </View>
                    ) : null}
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
                      투닝에서 보내드리는 다양한 정보를 받으실 수 있습니다
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
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontSize: Font_normalize(12),
                            color: '#000000',
                            fontWeight: '400',
                          }}>
                          카카오톡 수신동의
                        </Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            ChangeMarkettting('kakaotalk');
                          }}>
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
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          marginTop: Height_convert(8),
                          marginLeft: Width_convert(17),
                          width: Width_convert(339),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontSize: Font_normalize(12),
                            color: '#000000',
                            fontWeight: '400',
                          }}>
                          메일 수신동의
                        </Text>

                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            ChangeMarkettting('mail');
                          }}>
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
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          marginTop: Height_convert(8),
                          marginLeft: Width_convert(17),
                          width: Width_convert(339),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontSize: Font_normalize(12),
                            color: '#000000',
                            fontWeight: '400',
                          }}>
                          SMS 수신동의
                        </Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            ChangeMarkettting('sms');
                          }}>
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
                        </TouchableOpacity>
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
        </>
      ) : (
        <>
          <Tabbar
            Title={'차량선택_info'}
            navigation={props.navigation}
            PageChangeValue={PageChangeValue}
            AddCarData={AddCarData}></Tabbar>
          <View style={{borderTopWidth: 1, borderTopColor: '#DBDBDB'}}></View>
          <CarSetting
            page={page}
            from={'info'}
            PageChangeValue={PageChangeValue}
            nowValue={category}
            CategoryChangeValue={CategoryChangeValue}
            PickBrandValue={pickBrand}
            PickBrandChangeValue={PickBrandChangeValue}
            IsLoadingChangeValue={IsLoadingChangeValue}
            PickModelValue={pickModel}
            PickModelChangeValue={PickModelChangeValue}
            PickModelDetail={pickModelDetail}
            PickModelDetailChangeValue={
              PickModelDetailChangeValue
            }></CarSetting>
        </>
      )}

      {passwordChangeModal ? (
        <ButtonOneModal
          ShowModalChangeValue={PasswordChangeModalChangeValue}
          navigation={props.navigation}
          Title={
            '비밀번호가 변경되어 로그아웃 되었습니다 \n로그인페이지로 이동합니다'
          }
          //BottomText={''}
          CenterButtonText={'확인'}></ButtonOneModal>
      ) : null}
      {confirmErrorModal ? (
        <ButtonOneModal
          ShowModalChangeValue={ConfirmErrorModalChangeValue}
          navigation={props.navigation}
          Title={'인증번호를 다시 입력해주세요'}
          //BottomText={''}
          CenterButtonText={'확인'}></ButtonOneModal>
      ) : null}
      {confirmModal ? (
        <ButtonOneModal
          ShowModalChangeValue={ConfirmModalChangeValue}
          navigation={props.navigation}
          Title={'본인인증이 완료되었습니다'}
          //BottomText={''}
          CenterButtonText={'확인'}></ButtonOneModal>
      ) : null}
      {locationModal ? (
        <ButtonTwoModal
          Title={'지역 설정을 위해 위치서비스를 켜 주세요'}
          navigation={props.navigation}
          ShowModalChangeValue={LocationModalChangeValue}
          LeftButtonTitle={'닫기'}
          RightButtonTitle={'설정'}></ButtonTwoModal>
      ) : null}
      {showModal ? (
        <ButtonTwoModal
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={
            '지역 설정을 위해 고객님의 권한이 필요합니다. 권한을 허용하시겠습니까?'
          }
          //BottomText={'설정하러가기'}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></ButtonTwoModal>
      ) : null}
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
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
