import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import TabNavigator from '../tabNavigation/tabNavigation';
import LandingNavigator from '../stackNavigation/landingNavigation';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import RNSplashScreen from 'react-native-splash-screen';
enableScreens();
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
import {checkNotifications} from 'react-native-permissions';

import AlertModal1 from '../../components/Modal/AlertModal1.js';
import Domain from '../../../key/Domain.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as Keychain from 'react-native-keychain';
import {connect} from 'react-redux';
import ActionCreator from '../../actions';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import IsLoading from '../../components/ActivityIndicator';
import NetworkErrModal from '../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../components/Modal/NormalErrModal';
import Version from '../../../key/key.js';
import ServerModal from '../../components/Modal/ServerModal';
import VersionModal from '../../components/Modal/VersionModal';
import moment from 'moment';
import {SafeAreaView, Image, StatusBar} from 'react-native';

const FirstNavigator = (props) => {
  const [landingCheck, setLandingCheck] = React.useState(true);
  const [networkCheck, setNetworkCheck] = React.useState(true);
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [serverModalMessage, setServerModalMessage] = React.useState({});
  const setData = async (value) => {
    try {
      await AsyncStorage.setItem('landingCheck', value.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async function () {
    try {
      let value = await AsyncStorage.getItem('landingCheck');
      if (value == null) {
      } else {
        setLandingCheck(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const AutoLogin = async () => {
    try {
      let FCMToken = await messaging().hasPermission();
      if (FCMToken) {
        FCMToken = await messaging().getToken();
        await AsyncStorage.setItem('fcmToken', FCMToken);
      } else {
        FCMToken = await messaging().requestPermission();
      }
      await checkNotifications().then(({status, settings}) => {
        if (status === 'granted') {
        } else {
          FCMToken = '';
        }
      });
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        //로그인해서 리덕스에 정보 넣기,
        //로그인이 실패하면? 디바이스정보로 가져와보자
        let url = `${Domain}api/user/token`;
        let data = {};
        if (credentials.username && credentials.password) {
          data = {
            id: credentials.username,
            token: credentials.password,
            getuniqueid: DeviceInfo.getUniqueId(),
            getdeviceid: DeviceInfo.getDeviceId(),
            getmodel: DeviceInfo.getModel(),
            fcmtoken: FCMToken,
          };
        } else {
          url = `${Domain}api/user/device`;
          data = {
            getuniqueid: DeviceInfo.getUniqueId(),
            getdeviceid: DeviceInfo.getDeviceId(),
            getmodel: DeviceInfo.getModel(),
            fcmtoken: FCMToken,
          };
        }
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data.success === true) {
              if (data?.id) {
                //아이디로 로그인했으면
                await Keychain.setGenericPassword(
                  result.data.user._id,
                  result.data.user.accessToken,
                );
                props.updateLoginStatus(true);
                props.updateIuCar(result.data.user.car);
                props.updateLocation(result.data.user.location);
                props.update_id(result.data.user._id);
                props.updateData(result.data.user);
              } else {
                //디바이스로 로그인했으면
                console.log('디바이스로 로그인');
                await Keychain.resetGenericPassword();
                props.updateLoginStatus(false);
                props.updateData(result.data.result);
              }
            } else {
              //로그인이 안됐어
              //디바이스정보에 따른 알림값 물고있어야함
              await Keychain.resetGenericPassword();
              console.log('로그인안됨 그냥넘어가???????면 안될텐디');
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
            setIsLoadingAndModal(2);
          }
        });
        // setTimeout(() => {
        //   RNSplashScreen.hide();
        // }, 1000);
      } else {
        let url = `${Domain}api/user/device`;
        let data = {
          getuniqueid: DeviceInfo.getUniqueId(),
          getdeviceid: DeviceInfo.getDeviceId(),
          getmodel: DeviceInfo.getModel(),
          fcmtoken: FCMToken,
        };
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data.success === true) {
              //디바이스로 로그인
              await Keychain.resetGenericPassword();
              props.updateLoginStatus(false);
              props.updateData(result.data.result);
            } else {
              //로그인이 안됐어
              //디바이스로 로그인하는것도 실패
              setIsLoadingAndModal(3);
              await Keychain.resetGenericPassword();
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
            setIsLoadingAndModal(2);
          }
        });
        console.log(
          'No credentials stored 저장된 아이디 비밀번호 정보가 없으면 여기로나옴.',
        ); //저장된 정보가 없으면 여기로나옴. 디바이스아이디로 조회해서 알림값 물고있어라
        console.log(reduxState.loginDataCheck.login);
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    } finally {
      setIsLoadingAndModal(0);
      setTimeout(() => {
        RNSplashScreen.hide();
      }, 1000);
    }
  };

  const NetWorkCheck = () => {
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        setNetworkCheck(true);
        // setIsLoadingAndModal(2);
        // RNSplashScreen.hide();
      } else {
        setIsLoadingAndModal(2);
        RNSplashScreen.hide();
      }
    });
  };
  React.useEffect(() => {
    NetWorkCheck();
    if (networkCheck === false) return;
    setIsLoadingAndModal(1);
    getData();
    AutoLogin();
  }, [networkCheck]);
  React.useEffect(() => {
    setIsLoadingAndModal(1);
    if (reduxState.landingCheck.landingCheck == true) {
      setLandingCheck(true);
      setData(true);
    }
    setIsLoadingAndModal(0);
  }, [reduxState.landingCheck.landingCheck]);

  return (
    <>
      {networkCheck ? (
        <NavigationContainer>
          <TabNavigator></TabNavigator>
          {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
            <IsLoading></IsLoading>
          ) : isLoadingAndModal === 2 ? (
            <NetworkErrModal
              ShowModalChangeValue={
                IsLoadingAndModalChangeValue
              }></NetworkErrModal>
          ) : isLoadingAndModal === 3 ? (
            <NormalErrModal
              ShowModalChangeValue={
                IsLoadingAndModalChangeValue
              }></NormalErrModal>
          ) : isLoadingAndModal === 4 ? (
            <ServerModal
              ShowModalChangeValue={IsLoadingAndModalChangeValue}
              Title={serverModalMessage}></ServerModal>
          ) : isLoadingAndModal === 5 ? (
            <VersionModal
              ShowModalChangeValue={IsLoadingAndModalChangeValue}
              Title={serverModalMessage}></VersionModal>
          ) : null}
        </NavigationContainer>
      ) : (
        <>
          <StatusBar hidden={true}></StatusBar>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}>
            <Image
              style={{width: 248, height: 132}}
              resizeMode="contain"
              source={require('./../../../assets/home/icon.png')}></Image>
            {isLoadingAndModal === 2 && (
              <NetworkErrModal
                ShowModalChangeValue={
                  IsLoadingAndModalChangeValue
                }></NetworkErrModal>
            )}
          </SafeAreaView>
        </>
      )}
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(FirstNavigator);
