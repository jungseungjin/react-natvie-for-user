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
import Domain2 from '../../../key/Domain2.js';
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

const FirstNavigator = (props) => {
  const [landingCheck, setLandingCheck] = React.useState(true);

  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const reduexState = useSelector((state) => state);
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
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        //로그인해서 리덕스에 정보 넣기,
        //로그인이 실패하면? 디바이스정보로 가져와보자
        let result;
        let url = `${Domain2}login`;
        let data = {};
        if (credentials.username && credentials.password) {
          data = {
            idText: credentials.username,
            passwordText: credentials.password,
          };
        } else {
          url = `${Domain2}deviceLogin`;
          data = {
            uniqueId: DeviceInfo.getUniqueId(),
          };
        }
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].status === 'ok') {
              if (data?.idText) {
                //아이디로 로그인했으면
                props.updateLoginStatus(true);
                props.updateIuCar(result.data[0].loginData.iu_car);
                props.updateLocation(result.data[0].loginData.location);
                props.update_id(result.data[0].loginData._id);
                props.updateData(result.data[0].loginData);
              } else {
                //디바이스로 로그인했으면
                props.updateLoginStatus(false);
                props.updateData(result.data[0].deviceData);
              }
            } else {
              //로그인이 안됐어
              await Keychain.resetGenericPassword();
              //alert(result.data[0].message);
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
            setIsLoadingAndModal(true);
          }
        });
        RNSplashScreen.hide();
      } else {
        let url = `${Domain2}deviceLogin`;
        let data = {
          uniqueId: DeviceInfo.getUniqueId(),
        };
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].status == 'ok') {
              props.updateLoginStatus(false);
              props.updateData(result.data[0].deviceData);
            } else {
              //로그인이 안됐어
              await Keychain.resetGenericPassword();
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
            setIsLoadingAndModal(true);
          }
        });
        console.log(
          'No credentials stored 저장된 아이디 비밀번호 정보가 없으면 여기로나옴.',
        ); //저장된 정보가 없으면 여기로나옴. 디바이스아이디로 조회해서 알림값 물고있어라
        console.log(reduexState.loginDataCheck.login);
        RNSplashScreen.hide();
      }
    } catch (error) {
      RNSplashScreen.hide();
      console.log("Keychain couldn't be accessed!", error);
    }
  };
  //토큰값 가져오기
  const handlePushToken = React.useCallback(async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        let TokenValue = await AsyncStorage.getItem('fcmToken');
        if (TokenValue) {
          if (fcmToken == TokenValue) {
            //저장된 토큰의 값이 같으니
            //TokenDB(fcmToken);
          } else {
            //토큰이 변경되었으니 저장한다.
            await AsyncStorage.setItem('fcmToken', fcmToken);
            TokenDB(fcmToken);
          }
        } else {
          //처음 한번 저장한다
          await AsyncStorage.setItem('fcmToken', fcmToken);
          TokenDB(fcmToken);
        }
      }
    } else {
      const authorizaed = await messaging().requestPermission();
    }
  }, []);
  const TokenDB = (fcmToken) => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'token';
          let push_arr = [];
          let alarm = false;
          push_arr.push({getUniqueId: DeviceInfo.getUniqueId()});
          push_arr.push({getDeviceId: DeviceInfo.getDeviceId()});
          push_arr.push({getModel: DeviceInfo.getModel()});
          alarm = await checkNotifications().then(({status, settings}) => {
            //console.log(status); //blocked
            if (status == 'granted') {
              return true;
            } else {
              return false;
            }
          });
          let data = {
            token: fcmToken,
            getDevice: push_arr,
            alarm: alarm,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            console.log(result.data[0]);
          } else {
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    setIsLoadingAndModal(1);
    getData();
    handlePushToken();
    AutoLogin();
    setIsLoadingAndModal(0);
  }, []);
  React.useEffect(() => {
    setIsLoadingAndModal(1);
    if (reduexState.landingCheck.landingCheck == true) {
      setLandingCheck(true);
      setData(true);
    }
    setIsLoadingAndModal(0);
  }, [reduexState.landingCheck.landingCheck]);

  // {landingCheck ? (      ) : (
  //   <LandingNavigator></LandingNavigator>
  // )}
  return (
    <NavigationContainer>
      <TabNavigator></TabNavigator>
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
    </NavigationContainer>
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
