import React from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SettingOn from '../../../../assets/home/setting_on.svg';
import SettingOff from '../../../../assets/home/setting_off.svg';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import {checkNotifications} from 'react-native-permissions';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import DeviceInfo from 'react-native-device-info';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import Version from '../../../../key/key.js';
const Setting = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [notificationPermission, setNotificationPermission] = React.useState(
    false,
  );
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [notice, setNotice] = React.useState(false);
  const [review, setReview] = React.useState(false);
  const [permissionModal, setPermissionModal] = React.useState(false);
  const PermissionModalChangeValue = (text) => setPermissionModal(text);

  const chkPermission = () => {
    try {
      checkNotifications().then(({status, settings}) => {
        //console.log(status); //blocked
        if (status == 'granted') {
          setNotificationPermission(true);
        } else {
          setNotificationPermission(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getData = () => {
    try {
      if (reduexState.loginDataCheck.login?.data?.alarm) {
        setNotice(reduexState.loginDataCheck.login.data.alarm?.notice);
        setReview(reduexState.loginDataCheck.login.data.alarm?.review);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dataChange = (type, typeState) => {
    try {
      chkPermission();
      let data = {
        review: review,
        notice: notice,
        chat: true,
      };
      checkNotifications().then(({status, settings}) => {
        //console.log(status); //blocked
        if (status == 'granted') {
          let url = Domain2 + 'setting/more';
          NetInfo.addEventListener(async (state) => {
            if (state.isConnected) {
              let prevData = reduexState.loginDataCheck.login.data;
              console.log(reduexState.loginDataCheck);
              if (type == 'review') {
                setReview(!typeState);
                data.review = !typeState;
                prevData.alarm.review = !typeState;
              } else if (type == 'notice') {
                setNotice(!typeState);
                data.notice = !typeState;
                prevData.alarm.notice = !typeState;
              }
              if (reduexState.loginDataCheck.login.login == true) {
                //로그인된상태 -> 로그인정보로 조회해서 설정값 가져오기
                data._id = reduexState.loginDataCheck.login._id;
                data.login = true;
              } else {
                //로그인 안된상태 -> 디바이스정보로 조회해서 설정값 가져오기
                data._id = DeviceInfo.getUniqueId();
                data.login = false;
              }
              let result = await axios.post(url, data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (result.data[0].message == 'ok') {
                props.updateData(prevData);
              } else {
              }
            } else {
              //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
              setIsLoadingAndModal(2);
            }
          });
        } else {
          PermissionModalChangeValue(true);
          return false;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    chkPermission();
    getData();
  }, []);
  //현재버전과 DB상의 버전을 비교해서 최신으로 안내

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'설정'} navigation={props.navigation}></Tabbar>
      <View style={{width: Width_convert(375), marginTop: Height_convert(20)}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              if (review && notificationPermission) {
                //알림 켜진상태
                //알림 끄기
                dataChange('review', review);
              } else {
                //알림 꺼진상태
                dataChange('review', review);
              }
            }}
            style={{
              width: Width_convert(314),
              height: Width_convert(64),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: Width_convert(30),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              내게시물 댓글 알림
            </Text>
            {review && notificationPermission ? (
              <SettingOn></SettingOn>
            ) : (
              <SettingOff></SettingOff>
            )}
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              if (notice && notificationPermission) {
                //알림 켜진상태
                //알림 끄기
                dataChange('notice', notice);
              } else {
                dataChange('notice', notice);
                //알림 꺼진상태
              }
            }}
            style={{
              width: Width_convert(314),
              height: Width_convert(64),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: Width_convert(30),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              공지사항 알림
            </Text>
            {notice && notificationPermission ? (
              <SettingOn></SettingOn>
            ) : (
              <SettingOff></SettingOff>
            )}
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(314),
              height: Width_convert(64),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: Width_convert(30),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              현재 버전
            </Text>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              {Version.version}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {permissionModal ? (
        <AlertModal2
          type={2}
          ShowModalChangeValue={PermissionModalChangeValue}
          navigation={props.navigation}
          Title={
            '알림을 받기 위한 알림권한 설정이 필요합니다. 권한을 허용하시겠습니까?'
          }
          //BottomText={''}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}
          CenterButtonText={'닫기'}></AlertModal2>
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
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
