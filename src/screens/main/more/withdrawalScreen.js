import React from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';

const Withdrawal = (props) => {
  //삭제하기 실행하면 로그아웃상태로 만들고 기기데이터로 뭘 줘야하나?
  const reduexState = useSelector((state) => state);
  const [withdrawalChk, setWithdrawalChk] = React.useState(false);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const sendData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'user/delete';
          let data = {
            _id: reduexState.loginDataCheck.login.data._id,
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
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'#FFFFFF'}></StatusBar>
        <Tabbar Title={'회원탈퇴'} navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            borderTopColor: '#DBDBDB',
            borderTopWidth: 1,
          }}></View>
        <View
          style={{
            width: Width_convert(341),
            marginLeft: Width_convert(22),
            marginRight: Width_convert(22),
            marginTop: Height_convert(18),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(19),
              fontWeight: '700',
              color: '#000000',
            }}>
            유의사항
          </Text>
          <Text
            style={{
              marginTop: Height_convert(4),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(10),
              fontWeight: '700',
              color: '#946AEF',
            }}>
            회원탈퇴 전에 꼭 확인해주세요
          </Text>

          <Text
            style={{
              marginTop: Height_convert(25),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(12),
              fontWeight: '700',
              color: '#000000',
            }}>
            회원탈퇴 시 동일한 아이디로 재가입, 복구가 불가능합니다.
          </Text>

          <Text
            style={{
              marginTop: Height_convert(40),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(12),
              fontWeight: '700',
              color: '#000000',
            }}>
            탈퇴한 계정의 정보는 모두 삭제됩니다.
          </Text>

          <Text
            style={{
              marginTop: Height_convert(40),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(12),
              fontWeight: '700',
              color: '#000000',
            }}>
            회원님께서 등록한 후기는 삭제되지 않으므로, 탈퇴 전 후기 삭제 하시기
            바랍니다.
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              setWithdrawalChk(!withdrawalChk);
            }}
            style={{
              marginTop: Height_convert(44),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {withdrawalChk ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Height_convert(19)}
                style={{marginRight: Width_convert(5)}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Height_convert(19)}
                style={{marginRight: Width_convert(5)}}></CheckBox>
            )}
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#535353',
              }}>
              투닝 계정을 삭제하겠습니다.
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => {
            if (withdrawalChk) {
              sendData();
            } else {
              //
            }
          }}
          style={[
            {
              marginLeft: Width_convert(18),
              marginTop: Height_convert(30),
              width: Width_convert(339),
              height: Width_convert(46),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Font_normalize(5),
            },
            withdrawalChk
              ? {backgroundColor: '#946AEF'}
              : {backgroundColor: '#EDEDED'},
          ]}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(16),
              color: '#FFFFFF',
            }}>
            계정 삭제하기
          </Text>
        </TouchableOpacity>

        {networkModal ? (
          <AlertModal1
            type={1}
            ShowModalChangeValue={NetworkModalChangeValue}
            navigation={props.navigation}
            Title={'인터넷 연결을 확인해주세요.'}
            //BottomText={''}
            CenterButtonText={'확인'}></AlertModal1>
        ) : null}
      </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
