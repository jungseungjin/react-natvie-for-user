import React from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Menu from '../../../components/More/Menu/Menu.js';
import LoginModal from '../../../components/Modal/LoginModal.js';
import {useSelector} from 'react-redux';
const MoreScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [loginChk, setLoginChk] = React.useState(
    reduexState.loginDataCheck.login.login,
  );
  const LoginChk = () => {
    try {
      if (reduexState.loginDataCheck.login.login) {
      } else {
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    LoginChk();
  }, []);
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
          {reduexState.loginDataCheck.login.login ? (
            <Menu Title={'내정보'} navigation={props.navigation}></Menu>
          ) : (
            <Menu Title={'로그인하기'} navigation={props.navigation}></Menu>
          )}
          {/*리덕스에서 로그인 유무 구분해서 버튼 표시하기 */}
          <Menu
            Title={'후기관리'}
            navigation={props.navigation}
            loginChk={loginChk}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'최근 본 작업'}
            navigation={props.navigation}
            loginChk={loginChk}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'공지사항 및 이벤트'}
            navigation={props.navigation}
            loginChk={loginChk}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'고객센터'}
            navigation={props.navigation}
            loginChk={loginChk}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          <Menu
            Title={'설정'}
            navigation={props.navigation}
            loginChk={loginChk}
            ShowModalChangeValue={ShowModalChangeValue}></Menu>
          {/* <Menu
            Title={'투닝 가게 입점 문의'}
            navigation={props.navigation}></Menu> */}
        </View>
      </SafeAreaView>
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
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default MoreScreen;
