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
  BackHandler,
} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import GPS from '../../../../assets/home/gps.svg';
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
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
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
import Toast, {DURATION} from 'react-native-easy-toast';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import X from '../../../../assets/home/x_black.svg';
import XButton from '../../../../assets/home/x_button.svg';
import Place_check from '../../../../assets/home/place_check';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const InfoScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  //비밀번호수정
  const ChangePassword = () => {
    try {
      if (password.length === 0) {
        //비밀번호 변경시키지않음
        setPasswordChk('');
        return false;
      }
      let Pass = isPassword(password);
      if (Pass) {
        //비밀번호 변경됨
        setPasswordChk(true);
      } else {
        //빨간글씨
        setPasswordChk(false);
      }
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

  function isNickName(asValue) {
    var regExp = /^[가-힣|a-z|A-Z|0-9|]+$/;
    if (regExp.test(asValue) && asValue.length > 1 && asValue.length < 11) {
      return true;
    } else {
      return false;
    }
  }
  //마케팅정보수신동의수정
  const ChangeMarkettting = (type) => {
    try {
      if (reduxState.loginDataCheck.login.login == false) {
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let marketting;
          if (type == 'kakaotalk') {
            marketting = {
              kakaotalk: !reduxState.loginDataCheck.login.data.marketting
                .kakaotalk,
              mail: reduxState.loginDataCheck.login.data.marketting.mail,
              sms: reduxState.loginDataCheck.login.data.marketting.sms,
            };
          } else if (type == 'mail') {
            marketting = {
              kakaotalk:
                reduxState.loginDataCheck.login.data.marketting.kakaotalk,
              mail: !reduxState.loginDataCheck.login.data.marketting.mail,
              sms: reduxState.loginDataCheck.login.data.marketting.sms,
            };
          } else if (type == 'sms') {
            marketting = {
              kakaotalk:
                reduxState.loginDataCheck.login.data.marketting.kakaotalk,
              mail: reduxState.loginDataCheck.login.data.marketting.mail,
              sms: !reduxState.loginDataCheck.login.data.marketting.sms,
            };
          } else {
            return;
          }
          let url = Domain2 + 'setting/info/marketting';
          let data = {
            _id: reduxState.loginDataCheck.login.data._id,
            marketting: marketting,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            let prevData = reduxState.loginDataCheck.login.data;
            prevData.marketting = marketting;
            props.updateData(prevData); //디바이스정보라도 넣어줘야??
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reduxState = useSelector((state) => state);
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState('info');
  const PageChangeValue = (text) => setPage(text);
  const [saveDataClick, setSaveDataClick] = React.useState(0);
  const [brandList, setBrandList] = React.useState([]);
  const [category, setCategory] = React.useState('domestic');
  const CategoryChangeValue = (text) => setCategory(text);
  const [pickBrand, setPickBrand] = React.useState({}); //디비에서 가져온 브랜드값
  const PickBrandChangeValue = (object) => setPickBrand(object);
  const [pickModel, setPickModel] = React.useState({}); //디비에서 가져온 모델값
  const PickModelChangeValue = (object) => setPickModel(object);
  const [pickModelDetail, setPickModelDetail] = React.useState({}); //디비에서 가져온 상세모델값
  const PickModelDetailChangeValue = (object) => setPickModelDetail(object);

  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [nickname, setNickname] = React.useState(
    reduxState.loginDataCheck.login.data.iu_nickname,
  );
  //저장눌러서 뒷단 다녀오고 1이면 동일한닉네임 2는 닉네임 형식이 안맞음   2번은 미리 검사하자
  const [nicknameChk, setNicknameChk] = React.useState(0);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState({});
  const LocationChangeValue = (Object) => setLocation(Object);
  const [car, setCar] = React.useState(
    reduxState.loginDataCheck?.login?.data?.iu_car,
  );
  const [carModal, setCarModal] = React.useState(false);
  const CarModalChangeValue = (text) => setCarModal(text);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //차량데이터 추가 or 변경
  const AddCarData = () => {
    let prevData = car.slice();
    if (!pickBrand.brand || !pickModel.model || !pickModelDetail.model_detail) {
      setCarModal(true);
      return false;
    }
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

  const saveData = () => {
    //저장 눌러서 데이터 수정하기.
    //닉네임변경여부 확인, 닉네임 형식확인해서 틀리면 리턴하고 빨간줄,
    //휴대폰번호 변경여부 확인,
    //비밀번호 변경여부 확인
    //지역변경여부 확인
    //차량데이터 변경여부 확인
    //유저 이미지 변경여부 확인
    //해서 뒷단에서 변경
    // 변경실패 - 닉네임때문이면 닉네임안내문구나오기  이거말고는 통신상태 이외에는 없을듯??
    // 변경성공 -
    //  비밀번호가 변경되었으면 모달띄우고 로그아웃시키고 로그인화면으로 / 비밀번호가 변경되지 않았으면 뒤로가기에 정보변경안내토스트
    try {
      if (reduxState.loginDataCheck.login.login == false) {
        //로그아웃상태면 아무것도 하지 않음.
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //수정된 데이터를 구분해서 값 넣어주기
          let data = {
            //차량데이터는 초기값이 redux에 저장된 로그인데이터값이니 그대로 이용
            iu_car: car,
            _id: reduxState.loginDataCheck.login.data._id,
            userImage: userImage,
          };
          if (nickname.length > 0) {
            //닉네임에 값이 들어가있으면
            data.iu_nickname = nickname.trim();
            let chkNinkname = isNickName(nickname.trim());
            if (!chkNinkname) {
              setNicknameChk(2);
              return false;
            }
          } else {
            //값이 없으면 원래값
            data.iu_nickname = reduxState.loginDataCheck.login.data.iu_nickname.trim();
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
            data.location = reduxState.loginDataCheck.login.data.location;
          }
          if (confirmChk) {
            //휴대폰 인증이 된거면 변호 변경
            data.iu_phone = phoneNumber.trim();
          } else {
            //원래값
            data.iu_phone = reduxState.loginDataCheck.login.data.iu_phone.trim();
          }
          if (passwordChk === '') {
            //비밀번호 변경시키지않음
          } else if (passwordChk === true) {
            //비밀번호 변경됨
            let Pass = isPassword(password);
            if (Pass) {
              //비밀번호 변경됨
              data.password = password;
            } else {
              //빨간글씨
              setPasswordChk(false);
              return false;
            }
          } else if (passwordChk === false) {
            //비밀번호 변경할수없음 -> 비밀번호 변경시키지않음
          }

          let url = Domain2 + 'info/changedata';
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].status == 'ok' && data.password) {
            //모달창
            //비밀번호 변경 ->로그아웃, 모달창 띄우기 모달창에서 로그인으로 이동시키기
            await Keychain.resetGenericPassword();
            setPasswordChangeModal(true);
            props.updateIuCar([]);
            props.updateLocation({});
            props.update_id('');
            props.updateData({}); //디바이스정보라도 넣어줘야??
          } else if (result.data[0].status == 'ok') {
            //뒤로가서 토스트 해야됨
            //페이지 뒤로가서 토스트메시지 띄우기-> 리덕스 사용??
            props.updateIuCar(result.data[0].result.iu_car);
            props.updateLocation(result.data[0].result.location);
            props.updateData(result.data[0].result);
            props.route.params.toastRef.show('내정보가 저장되었습니다.', 1000);
            props.navigation.goBack();
            props.navigation.navigate('Home');
            //변경되었으니 리덕스에 값도 변경시키기
            //props.navigation.goBack();
            //props.navigation.navigate('Home');
            //showToast('내정보가 저장되었습니다.', 1000);
          } else if (
            result.data[0].status == 'no' &&
            result.data[0].message == '동일한 닉네임이 존재합니다.'
          ) {
            //ok
            setNicknameChk(1);
            return false;
          } else {
            let newClick = saveDataClick + 1;
            setSaveDataClick(newClick);
            forceUpdate();
          }
        } else {
          setIsLoadingAndModal(2);
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
    props.updateLoginStatus(false);
    props.navigation.goBack();
    props.navigation.navigate('Login2', {from: 'infoScreen'});
  };
  const [userImage, setUserImage] = React.useState(
    reduxState.loginDataCheck.login?.data?.review_user_iu_image || null,
  );

  React.useEffect(() => {
    //초기화
    props.navigation.addListener('focus', async () => {
      setPasswordChk('');
      setPassword('');
      setNicknameChk(0);
      setPhoneNumber('');
      setPhoneNumberChk(0);
      setAuthButtonClick(false);
      setConfirmChk('');
    });
  }, []);
  const [minutes, setMinutes] = React.useState(parseInt(0)); //시간초 타이머
  const [seconds, setSeconds] = React.useState(parseInt(0));
  const [visible, setVisible] = React.useState(false); //1분이내 재발송 안됨 메시지 출력여부
  const [phoneNumberChk, setPhoneNumberChk] = React.useState(0);
  const [authButtonClick, setAuthButtonClick] = React.useState(false); //인증번호받기 버튼을 눌렀는지 여부
  const [authNumber, setAuthNumber] = React.useState(''); //코드넘버
  const [confirm, setConfirm] = React.useState(null); //인증함수
  const [confirmChk, setConfirmChk] = React.useState(''); //인증함수를 거쳐서 인증이 되었는지 여부
  const [confirmChkM, setConfirmChkM] = React.useState(0);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const ConfirmModalChangeValue = (text) => setConfirmModal(text);
  const [confirmErrorModal, setConfirmErrorModal] = React.useState(false);
  const ConfirmErrorModalChangeValue = (text) => setConfirmErrorModal(text);
  //authButtonClick 가 ture면 재인증버튼 눌렀음 -> 재전송으로 문구 변경 -> ok
  //confirmChk가 true면 인증완료 false면 아직 인증안됨 confirmChk '' 면 인증확인 아직안했음
  //authNumber는 인증코드넘버
  //confirmChk === false &&
  const confirmCode = (code) => {
    try {
      if (seconds === 0 && minutes === 0) {
        //인증시간 초과
        setConfirmChk(false);
        setConfirmChkM(1);
      } else {
        //인증번호 확인
        if (code == smsCode) {
          setConfirmChk(true);
          setAuthButtonClick(false);
        } else {
          //인증번호 틀림
          setConfirmChk(false);
          setConfirmChkM(2);
        }
      }
    } catch (error) {
      console.log(error);
      setConfirmChk(false);
    }
  };
  const [smsCode, setSmsCode] = React.useState(0);
  const PhoneNumberChk = (Number) => {
    try {
      let url = Domain2 + 'info/phonechk';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.post(
            url,
            {
              _id: reduxState.loginDataCheck.login.data._id,
              Phone: Number,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (result.data[0].status == 'ok') {
            if (result.data[0].message == 'ok') {
              //인증번호받기로진행
              NaverSMSMessageSend(Number);
              setPhoneNumberChk(0);
              setConfirmChkM(0);
            } else {
              //결과에 따라서 이미 가입한 휴대폰번호입니다.
              setPhoneNumberChk(1);
            }
          } else {
            showToast('잠시 후에 다시 시도해주세요.', 1000);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const NaverSMSMessageSend = (Number) => {
    try {
      let timestamp = moment().valueOf();
      let random = parseInt(Math.random() * 899999 + 100000);
      let url = Domain2 + 'sendMessage';

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
          if (result.data[0].statusCode === '202') {
            //전송 성공 시간초 흐르기
            setSmsCode(random);
            setMinutes(parseInt(3));
            setSeconds(parseInt(0));
            setConfirmChk('');
            setAuthNumber('');
            setAuthButtonClick(true);
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
    }
  };
  React.useEffect(() => {
    if (saveDataClick > 0) {
      showToast('잠시 후 다시 시도해주세요.', 1000);
    }
  }, [saveDataClick]);
  React.useEffect(() => {
    const countdown = BackgroundTimer.setTimeout(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          setConfirmChkM(1);
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
      if (reduxState.loginDataCheck.login.login == false) {
        await Keychain.resetGenericPassword();
        props.updateIuCar([]);
        props.updateLocation({});
        props.update_id('');
        props.updateData(result.data[0].result); //디바이스정보라도 넣어줘야??
        props.navigation.goBack();
        props.navigation.navigate('Home');
        props.updateLoginStatus(false);
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'user/logout';
          let data = {
            getUniqueId: DeviceInfo.getUniqueId(),
            getDeviceId: DeviceInfo.getDeviceId(),
            getModel: DeviceInfo.getModel(),
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            await Keychain.resetGenericPassword();
            props.updateIuCar([]);
            props.updateLocation({});
            props.update_id('');
            props.updateData(result.data[0].result); //디바이스정보라도 넣어줘야??
            props.updateLoginStatus(false);
            props.navigation.goBack();
            props.navigation.navigate('Home');
          } else {
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  //위치정보를 눌렀을 때 1 퍼미션 확인  2 퍼미션 허용되면 gps켜져있는지 확인해서 위치 가져오기 // gps꺼져있으면 gps켜달라고 하기. 끝 3 퍼미션이 허용되지 않았으면 퍼미션 허용해달라고 하기
  //위치정보사용 퍼미션
  const handleLocationPermission = async (Type) => {
    if (reduxState.loginDataCheck.login.login == false) {
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
    if (reduxState.loginDataCheck.login.login == false) {
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
        } else if (error.message.includes('permission not granted')) {
          setShowModal(true);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getNaverLocagtion = async (position) => {
    try {
      if (reduxState.loginDataCheck.login.login == false) {
        return false;
      }
      setIsLoadingAndModal(1);
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
        setIsLoadingAndModal(0);
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
        setP0({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        setLocation(newData);
      } else {
        setIsLoadingAndModal(0);
        location.legalcode = '요청한 데이타의 결과가 없습니다.';
        setLocation(location);
        //네이버 맵에 없음
      }
    } catch (err) {
      setIsLoadingAndModal(3);
      console.log(err);
      alert(err);
    }
  };
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  const [searchText, setSearchText] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);
  const [searchOn, setSearchOn] = React.useState(false);
  const SearchAddr = async () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //setIsLoading(true);
          let result = await axios.get(
            'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' +
              searchText,
            {
              headers: {
                'X-NCP-APIGW-API-KEY-ID': '56kfacm95e',
                'X-NCP-APIGW-API-KEY':
                  'cyhAcOnJGtzyYZiQFDcOkWkJcsL5t0FAQ3bJldMR',
              },
            },
          );
          if (result.data.addresses) {
            setSearchList(result.data.addresses);
            Keyboard.dismiss();
          } else {
          }
          setSearchOn(true);
          //setIsLoading(false);
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
  };
  const [P0, setP0] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      {reduxState.loginDataCheck.login.login != true ? (
        <>
          <Tabbar
            Title={'내정보_fake'}
            // toastRef={toastRef}
            navigation={props.navigation}
            saveData={saveData}></Tabbar>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(812) - Height_convert(94 + 48),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              로그인이 필요합니다.
            </Text>
          </View>
        </>
      ) : page == 'info' ? (
        <>
          <Tabbar
            Title={'내정보'}
            // toastRef={toastRef}
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
                    <View
                      style={{
                        marginTop: -Width_convert(78),
                        width: Width_convert(78),
                        height: Width_convert(78),
                        borderRadius: Width_convert(78),
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <View
                        style={{
                          width: Width_convert(78),
                          height: Width_convert(56),
                        }}></View>
                      <View
                        style={{
                          backgroundColor: 'rgba(0.32,0.32,0.32,0.4)',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: Width_convert(78),
                          height: Width_convert(22),
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumGothicRegular || null,
                            fontSize: Font_normalize(11),
                            fontWeight: '700',
                            color: '#FFFFFF',
                          }}>
                          편집
                        </Text>
                      </View>
                    </View>
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
                          width: Width_convert(300),
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '700',
                          fontSize: Font_normalize(16),
                          color: '#000000',
                        }}>
                        {reduxState.loginDataCheck?.login?.data?.iu_name}
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
                        value={nickname}
                        onChangeText={(value) => {
                          setNickname(value);
                        }}
                        placeholderTextColor={'#CCCCCC'}
                        style={{
                          width: Width_convert(300),
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '700',
                          fontSize: Font_normalize(16),
                          color: '#000000',
                        }}></TextInput>
                    </View>
                  </View>
                  {nicknameChk === 1 || nicknameChk === 2 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: Width_convert(16),
                        marginRight: Width_convert(11),
                        width: Width_convert(375 - 27),
                        marginTop: -Width_convert(17),
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '700',
                          fontSize: Font_normalize(15),
                          color: '#FFFFFF',
                          marginRight: Width_convert(13),
                        }}>
                        닉네임
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '400',
                          fontSize: Font_normalize(9),
                          color: '#FF0202',
                        }}>
                        {nicknameChk === 1
                          ? '동일한 닉네임이 존재합니다'
                          : nicknameChk === 2
                          ? '한글/영문/숫자 2~10자, 띄어쓰기 불가'
                          : null}
                      </Text>
                    </View>
                  ) : null}
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
                      }}>
                      <Text
                        style={{
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
                          reduxState.loginDataCheck?.login?.data?.iu_phone
                        }
                        placeholderTextColor="#CCCCCC"
                        value={phoneNumber}
                        keyboardType={'number-pad'}
                        onChangeText={(value) => {
                          if (value.length > 13) {
                          } else {
                            let newValue = InputPhoneNumber(value);
                            setPhoneNumber(newValue);
                            setPhoneNumberChk(0);
                          }
                        }}
                        onSubmitEditing={() => {
                          if (phoneNumber.length == 13) {
                            if (confirmChk) {
                            } else {
                              if (minutes >= 2) {
                                setVisible(true);
                                setTimeout(() => setVisible(false), 2000);
                              } else {
                                PhoneNumberChk(phoneNumber);
                              }
                            }
                          } else {
                            showToast(
                              '휴대폰번호 11자리를 모두 입력해주세요.',
                              1000,
                            );
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
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        onPress={() => {
                          if (phoneNumber.length == 13) {
                            if (confirmChk) {
                            } else {
                              if (minutes >= 2) {
                                setVisible(true);
                                setTimeout(() => setVisible(false), 2000);
                              } else {
                                PhoneNumberChk(phoneNumber);
                              }
                            }
                          } else {
                            showToast(
                              '휴대폰번호 11자리를 모두 입력해주세요.',
                              1000,
                            );
                          }
                        }}
                        style={{
                          width: Width_convert(35),
                          height: Width_convert(20),
                          backgroundColor: '#C1C1C1',
                          borderRadius: Font_normalize(4),
                          alignItems: 'center',
                          marginRight: 0,
                          marginLeft: 'auto',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(10),
                            color: '#FFFFFF',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                          }}>
                          {authButtonClick ? '재전송' : '재인증'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/*이미 가입된 휴대폰번호입니다. phoneNumberChk시작*/}
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: Width_convert(16),
                        marginRight: Width_convert(11),
                        width: Width_convert(375 - 27),
                        marginTop: -Width_convert(17),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '700',
                          fontSize: Font_normalize(15),
                          color: '#FFFFFF',
                          marginRight: Width_convert(13),
                        }}>
                        휴대폰번호
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '400',
                          fontSize: Font_normalize(9),
                          color: '#FF0202',
                        }}>
                        {phoneNumberChk == 1
                          ? '이미 가입된 휴대폰번호입니다'
                          : null}
                      </Text>
                    </View>
                    {/*이미 가입된 휴대폰번호입니다. 끝*/}
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
                        }}>
                        <Text
                          style={{
                            width: Width_convert(83),
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(15),
                            marginRight: Width_convert(13),
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
                              setConfirmChkM(0);
                            }
                          }}
                          onSubmitEditing={() => {
                            if (confirmChk) {
                            } else {
                              if (authNumber.length == 6) {
                                confirmCode(authNumber);
                              }
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
                              marginRight: -Width_convert(10),
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 'auto',
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
                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                          onPress={() => {
                            if (confirmChk) {
                            } else {
                              confirmCode(authNumber);
                            }
                          }}
                          style={{
                            width: Width_convert(35),
                            height: Width_convert(20),
                            backgroundColor: '#C1C1C1',
                            borderRadius: Font_normalize(4),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 0,
                            marginLeft: 'auto',
                          }}>
                          <Text
                            style={{
                              fontFamily: Fonts?.NanumSqureRegular || null,
                              fontWeight: '700',
                              fontSize: Font_normalize(10),
                              color: '#FFFFFF',
                              textAlign: 'center',
                              textAlignVertical: 'center',
                            }}>
                            확인
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    {/*안증번호입력 빨간글씨 시작*/}
                    <View
                      style={{
                        marginTop: -Width_convert(17),
                        flexDirection: 'row',
                        marginLeft: Width_convert(16),
                        marginRight: Width_convert(11),
                        width: Width_convert(375 - 27),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          width: Width_convert(83),
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '700',
                          fontSize: Font_normalize(15),
                          marginRight: Width_convert(13),
                          color: '#FFFFFF',
                        }}>
                        인증번호입력
                      </Text>
                      <Text
                        style={{
                          marginTop: -Width_convert(5),
                          fontFamily: Fonts?.NanumSqureRegular || null,
                          fontWeight: '400',
                          fontSize: Font_normalize(9),
                          color: '#FF0202',
                        }}>
                        {visible == true
                          ? '인증번호는 1분간 재발송할 수 없습니다.'
                          : confirmChk === false &&
                            authNumber.length == 6 &&
                            confirmChkM == 2
                          ? '인증번호가 올바르지 않습니다.'
                          : confirmChk === false &&
                            minutes == 0 &&
                            seconds == 0 &&
                            confirmChkM == 1
                          ? '시간이 초과되었습니다 인증번호를 다시 받아주세요.'
                          : null}
                      </Text>
                    </View>
                    {/*인증번호입력 빨간글씨 끝*/}
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
                          reduxState.loginDataCheck?.login?.data?.location
                            ?.legalcode ||
                          null}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        onPress={() => {
                          if (handleLocationPermission(Platform.OS)) {
                            CurrentPosition(); //경위도 찍고
                          } else {
                            //권한설정해달라는 모달
                            setShowModal(true);
                          }
                        }}
                        style={{
                          width: Width_convert(35),
                          height: Width_convert(20),
                          backgroundColor: '#C1C1C1',
                          borderRadius: Font_normalize(4),
                          alignItems: 'center',
                          marginRight: 0,
                          marginLeft: 'auto',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(10),
                            color: '#FFFFFF',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                          }}>
                          재설정
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
                              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
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
                                  borderRadius: Font_normalize(4),
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
                                    fontSize: Font_normalize(10),
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
                              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                              onPress={() => {
                                setPage('carChange' + car.indexOf(item));
                              }}
                              style={{
                                marginRight: Width_convert(5),
                                width: Width_convert(35),
                                height: Width_convert(20),
                                backgroundColor: '#C1C1C1',
                                borderRadius: Font_normalize(4),
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: Fonts?.NanumSqureRegular || null,
                                  fontWeight: '700',
                                  fontSize: Font_normalize(10),
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
                                borderRadius: Font_normalize(4),
                                justifyContent: 'center',
                                marginRight: 0,
                                marginLeft: 'auto',
                              }}>
                              <Text
                                style={{
                                  fontFamily: Fonts?.NanumSqureRegular || null,
                                  fontWeight: '700',
                                  fontSize: Font_normalize(10),
                                  color: '#FFFFFF',
                                  textAlign: 'center',
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
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
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
                        {reduxState.loginDataCheck?.login?.data?.iu_id}
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
                          if (value.length === 0) {
                            //초기값 -> 비밀번호 변경시키지 않음
                            setPasswordChk('');
                          }
                          if (value.indexOf(' ') != -1) {
                            value = value.replace(/ /gi, '');
                          }
                          setPassword(value);
                        }}
                        onSubmitEditing={() => {
                          ChangePassword();
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
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        onPress={() => {
                          ChangePassword();
                        }}
                        style={{
                          width: Width_convert(35),
                          height: Width_convert(20),
                          backgroundColor: '#C1C1C1',
                          borderRadius: Font_normalize(4),
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 0,
                          marginLeft: 'auto',
                        }}>
                        <Text
                          style={{
                            padding: Width_convert(5),
                            fontFamily: Fonts?.NanumSqureRegular || null,
                            fontWeight: '700',
                            fontSize: Font_normalize(10),
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
                          flexDirection: 'row',
                          marginLeft: Width_convert(16),
                          marginRight: Width_convert(11),
                          width: Width_convert(375 - 27),
                          marginTop: -Width_convert(20),
                        }}>
                        <Text
                          style={{
                            width: Width_convert(56),
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
                          잘못된 비밀번호 형식입니다.
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
                      투닝에서 보내드리는 다양한 정보를 받으실 수 있습니다.
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
                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                          onPress={() => {
                            ChangeMarkettting('kakaotalk');
                          }}>
                          {reduxState.loginDataCheck?.login?.data?.marketting
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
                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                          onPress={() => {
                            ChangeMarkettting('mail');
                          }}>
                          {reduxState.loginDataCheck?.login?.data?.marketting
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
                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                          onPress={() => {
                            ChangeMarkettting('sms');
                          }}>
                          {reduxState.loginDataCheck?.login?.data?.marketting
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
                      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                      onPress={() => {
                        if (reduxState.loginDataCheck.login.login == true) {
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
                      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
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
      ) : page == 'mapSearch' ? (
        <>
          <View
            style={{
              height: Height_convert(88) - StatusBarHeight,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPage('info');
                setP0({
                  latitude: 0,
                  longitude: 0,
                });
              }}
              style={{
                marginLeft: Width_convert(22),
                marginRight: Width_convert(15),
                width: Width_convert(14),
                height: Height_convert(16),
              }}>
              <X></X>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Font_normalize(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                color: '#000000',
                paddingTop: 0,
                paddingBottom: 0,
              }}>
              주소검색
            </Text>
            <View
              activeOpacity={1}
              onPress={() => {}}
              style={{
                marginRight: Width_convert(22),
                width: Width_convert(20),
                height: Height_convert(20),
              }}></View>
          </View>
          <View
            style={{
              height: Height_convert(88) - StatusBarHeight,
              marginBottom: Height_convert(10),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <TextInput
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              keyboardType="default"
              value={searchText}
              onChangeText={(value) => {
                setSearchText(value);
              }}
              returnKeyType={'search'}
              onSubmitEditing={() => {
                if (searchText) {
                  SearchAddr();
                } else {
                  showToast('검색어를 입력해주세요.', 1000);
                }
              }}
              style={{
                width: Width_convert(280),
                height: Width_convert(34),
                fontSize: Font_normalize(16),
                marginLeft: Width_convert(22),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholderTextColor="#A1A1A1"
              placeholder={'읍 면 동으로 간편하게 검색해주세요'}
              //onKeyPress={this.handleKeyDown}
              // /handleKeyDown: function(e) {
              //   if(e.nativeEvent.key == "Enter"){
              //     dismissKeyboard();
              // }
            ></TextInput>
            {searchText ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSearchText('');
                }}
                style={{
                  height: Width_convert(34),
                  justifyContent: 'center',
                }}>
                <XButton
                  style={{
                    marginRight: Width_convert(10),
                  }}></XButton>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (searchText) {
                  SearchAddr();
                } else {
                  showToast('검색어를 입력해주세요.', 1000);
                }
              }}
              style={{
                marginRight: Width_convert(22),
              }}>
              <Search></Search>
            </TouchableOpacity>
          </View>
          {searchList.length == 0 ? (
            <View
              style={{
                // width: Width_convert(375),
                // height: Height_convert(642) + 2 * StatusBarHeight,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Swagger || null,
                  fontSize: Font_normalize(20),
                  color: '#B4B4B4',
                  textAlign: 'center',
                }}>
                {searchOn
                  ? '검색 결과가 없습니다 지역을 다시 검색해주세요.'
                  : '고객님이 튜닝작업 받기 원하시는 지역을 검색해주세요.'}
              </Text>
            </View>
          ) : (
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {searchList.map((item) => (
                <View
                  key={item.jibunAddress || item.roadAddress}
                  style={{
                    height: Height_convert(44),
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setP0({
                        longitude: parseFloat(item.x),
                        latitude: parseFloat(item.y),
                      });
                      setLocation({
                        legalcode: item.jibunAddress || item.roadAddress,
                        location: {
                          longitude: parseFloat(item.x),
                          latitude: parseFloat(item.y),
                        },
                      });

                      forceUpdate();
                      setPage('map');
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: Width_convert(15),
                    }}>
                    <Place_check
                      style={{marginRight: Width_convert(12)}}></Place_check>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(14),
                        fontWeight: '400',
                        color: '#000000',
                      }}>
                      {item.jibunAddress || item.roadAddress}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </>
      ) : page == 'map' ? (
        <>
          <View style={{width: '100%', height: '100%', position: 'absolute'}}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"></StatusBar>
            <NaverMapView
              style={{width: '100%', height: '100%', position: 'absolute'}}
              center={{
                latitude: P0.latitude,
                longitude: P0.longitude,

                zoom: 16,
              }}
              scaleBar={false}
              zoomControl={false}
              rotateGesturesEnabled={false}
              useTextureView={false}
              //onTouch={(e) => {}}
              onCameraChange={(e) => {
                if (Platform.OS === 'ios') {
                  getNaverLocagtion({
                    coords: {
                      latitude: parseFloat(e.latitude),
                      longitude: parseFloat(e.longitude),
                    },
                  });
                }
              }}
              onMapClick={(e) => {
                if (Platform.OS === 'android') {
                  getNaverLocagtion({
                    coords: {
                      latitude: parseFloat(e.latitude),
                      longitude: parseFloat(e.longitude),
                    },
                  });
                }
              }}>
              <Marker coordinate={P0} pinColor={'green'} onClick={() => {}} />
            </NaverMapView>
            <View
              style={{
                height: Height_convert(88) + StatusBarHeight,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setPage('mapSearch');
                  setP0({
                    latitude: 0,
                    longitude: 0,
                  });
                }}
                style={{
                  marginRight: Width_convert(25),
                  marginTop: Height_convert(4),
                  padding: Width_convert(5),
                  marginLeft: Width_convert(17),
                }}>
                <GoBack
                  style={{
                    width: Width_convert(14),
                    height: Height_convert(16),
                  }}
                  fill={'#000000'}></GoBack>
              </TouchableOpacity>
              {/* <TouchableOpacity
            activeOpacity={1}
            style={{}}
            onPress={() => {
              props.navigation.navigate('MapSearch');
            }}></TouchableOpacity> */}
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (handleLocationPermission(Platform.OS)) {
                  //위치정보 사용 ok 현재위치를 가져와야합니다. 어디서?? 네이버에서
                  CurrentPosition(); //경위도 찍고
                } else {
                  //위치정보 켜달라는 모달 띄우기
                  LocationModalChangeValue(true);
                }
              }}
              style={{
                zIndex: 9999,
                width: Width_convert(42),
                height: Width_convert(42),
                position: 'absolute',
                bottom: Width_convert(174),
                right: Width_convert(22),
                borderRadius: Width_convert(21),
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',

                shadowColor: '#000000', //그림자색
                shadowOpacity: 0.3, //그림자 투명도
                shadowOffset: {width: 2, height: 2}, //그림자 위치
                //ANDROID
                elevation: 5,
              }}>
              <GPS></GPS>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: Width_convert(174 - 65),
                width: Width_convert(375),
                height: Height_convert(65),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(339),
                  height: Height_convert(65),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: Font_normalize(3),
                  backgroundColor: '#FFFFFF',
                  marginTop: Height_convert(18),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(19),
                    fontWeight: '700',
                    color: '#946AEF',
                  }}>
                  {location?.legalcode}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: Width_convert(174 - 65 - 46 - 10),
                width: Width_convert(375),
                height: Height_convert(46),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setPage('info');
                  setP0({
                    latitude: 0,
                    longitude: 0,
                  });
                }}
                style={{
                  width: Width_convert(339),
                  height: Height_convert(46),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: Font_normalize(3),
                  backgroundColor: '#946AEF',
                  marginTop: Height_convert(18),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(16),
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}>
                  설정완료
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
            IsLoadingAndModalChangeValue={IsLoadingAndModalChangeValue}
            PickModelValue={pickModel}
            PickModelChangeValue={PickModelChangeValue}
            PickModelDetail={pickModelDetail}
            PickModelDetailChangeValue={
              PickModelDetailChangeValue
            }></CarSetting>
        </>
      )}

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
      {carModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={CarModalChangeValue}
          navigation={props.navigation}
          Title={'고객님의 차종을 선택해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {passwordChangeModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={PasswordChangeModalChangeValue}
          navigation={props.navigation}
          Title={
            '비밀번호가 변경되어 로그아웃 되었습니다.\n 로그인 페이지로 이동합니다.'
          }
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {confirmErrorModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={ConfirmErrorModalChangeValue}
          navigation={props.navigation}
          Title={'인증번호를 다시 입력해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {confirmModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={ConfirmModalChangeValue}
          navigation={props.navigation}
          Title={'본인인증이 완료되었습니다.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
      {locationModal ? (
        <AlertModal2
          type={1}
          P0={P0}
          Title={'지역 설정을 위해 위치서비스를 켜 주세요.'}
          navigation={props.navigation}
          LocationChangeValue={LocationChangeValue}
          PageChangeValue={PageChangeValue}
          ShowModalChangeValue={LocationModalChangeValue}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></AlertModal2>
      ) : null}
      {showModal ? (
        <AlertModal2
          type={2}
          P0={P0}
          LocationChangeValue={LocationChangeValue}
          PageChangeValue={PageChangeValue}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={
            '지역 설정 검색을 위해서 권한이 필요합니다. 권한을 허용하시겠습니까?'
          }
          //BottomText={'설정하러가기'}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></AlertModal2>
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
