import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import TabNavigator from '../tabNavigation/tabNavigation';
import LandingNavigator from '../stackNavigation/landingNavigation';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import IsLoading from '../../components/ActivityIndicator';
import RNSplashScreen from 'react-native-splash-screen';
enableScreens();
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

import ButtonOneModal from '../../components/Modal/ButtonOneModal.js';
import Domain2 from '../../../key/Domain2.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as Keychain from 'react-native-keychain';
import {connect} from 'react-redux';
import ActionCreator from '../../actions';
const FirstNavigator = (props) => {
  const [landingCheck, setLandingCheck] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
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
        //로그인이 실패하면? 아무것도 하지마.
        let result;
        let url = Domain2 + 'login';
        if (credentials.username && credentials.password) {
        } else {
          RNSplashScreen.hide();
          return false;
        }
        let data = {
          idText: credentials.username,
          passwordText: credentials.password,
        };
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            //인터넷 연결이 확인되면 뒤에서 이메일 중복검사 진행
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].status == 'ok') {
              props.updateLoginStatus(true);
              props.updateIuCar(result.data[0].loginData.iu_car);
              props.updateLocation(result.data[0].loginData.location);
              props.update_id(result.data[0].loginData._id);
            } else {
              //로그인이 안됐어
              //alert(result.data[0].message);
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요

            setIsLoading(false);
            setNetworkModal(true);
          }
        });
        RNSplashScreen.hide();
      } else {
        RNSplashScreen.hide();
        console.log(
          'No credentials stored 저장된 아이디 비밀번호 정보가 없으면 여기로나옴.',
        ); //저장된 정보가 없으면 여기로나옴.
      }
    } catch (error) {
      RNSplashScreen.hide();
      console.log("Keychain couldn't be accessed!", error);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getData();
    AutoLogin();
    setIsLoading(false);
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    if (reduexState.landingCheck.landingCheck == true) {
      setLandingCheck(true);
      setData(true);
    }
    setIsLoading(false);
  }, [reduexState.landingCheck.landingCheck]);

  // {landingCheck ? (      ) : (
  //   <LandingNavigator></LandingNavigator>
  // )}
  return (
    <NavigationContainer>
      <TabNavigator></TabNavigator>
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstNavigator);
