import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Menu from '../../../components/More/Menu/Menu.js';
import LoginModal from '../../../components/Modal/LoginModal.js';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import Toast, {DURATION} from 'react-native-easy-toast';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const MoreScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const [toastRef, setToastRef] = React.useState();
  const showToast = (text, time) => {
    if (toastRef === null) {
      console.log('gggg');
    } else {
      toastRef.show(text, time, () => {
        // something you want to do at close
      });
    }
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(812),
            borderBottomWidth: 1,
          }}>
          <Tabbar Title={'더보기'}></Tabbar>
          {reduxState.loginDataCheck.login.login ? (
            <Menu
              Title={'내정보'}
              navigation={props.navigation}
              toastRef={toastRef}></Menu>
          ) : (
            <Menu Title={'로그인하기'} navigation={props.navigation}></Menu>
          )}
          {/*리덕스에서 로그인 유무 구분해서 버튼 표시하기 */}
          <Menu
            Title={'후기관리'}
            navigation={props.navigation}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'최근 본 작업'}
            navigation={props.navigation}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'공지사항 및 이벤트'}
            navigation={props.navigation}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'고객센터'}
            navigation={props.navigation}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'설정'}
            navigation={props.navigation}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          {/* <Menu
            Title={'투닝 가게 입점 문의'}
            navigation={props.navigation}></Menu> */}
        </View>
        <Toast
          ref={(toast) => {
            setToastRef(toast);
          }}
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
        {showModal ? (
          <LoginModal
            ShowModalChangeValue={ShowModalChangeValue}
            navigation={props.navigation}
            //Title={'우리가게공임표를 확인하려면 로그인이 필요합니다.'}
            //BottomText={'설정하러가기'}
            //LeftButtonTitle={'아니오'}
            //RightButtonTitle={'네'}
          ></LoginModal>
        ) : null}
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
        ) : null}
      </SafeAreaView>
    </>
  );
};
export default MoreScreen;
