import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  Linking,
  Platform,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CallLogo from '../../../../assets/home/CallLogo.svg';
import KakaoTalkLogo from '../../../../assets/home/KakaoTalkLogo.svg';
import {useSelector} from 'react-redux';
import LoginModal from '../../../components/Modal/LoginModal.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const CustomerServiceScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const reduexState = useSelector((state) => state);
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'고객센터'} navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(1),
            borderTopWidth: 1,
            borderTopColor: '#DBDBDB',
          }}></View>
        <View
          style={{
            width: Width_convert(375),
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: Width_convert(375),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('FrequentlyQuestion');
              }}
              style={{
                marginTop: Height_convert(43),
                width: Width_convert(281),
                height: Height_convert(150),
                borderRadius: Font_normalize(10),
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Swagger || null,
                  fontSize: Font_normalize(48),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                자주 묻는 질문
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (reduexState.loginDataCheck.login.login == true) {
                  props.navigation.navigate('OneOnOne');
                } else {
                  setShowModal(true);
                }
              }}
              style={{
                marginTop: Height_convert(27),
                width: Width_convert(281),
                height: Height_convert(150),
                borderRadius: Font_normalize(10),
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Swagger || null,
                  fontSize: Font_normalize(48),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                1대1문의
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('Feedback');
              }}
              style={{
                marginTop: Height_convert(27),
                width: Width_convert(281),
                height: Height_convert(150),
                borderRadius: Font_normalize(10),
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(130),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.Swagger || null,
                    fontSize: Font_normalize(24),
                    fontWeight: '400',
                    color: '#000000',
                    textAlign: 'left',
                  }}>
                  투닝에게
                </Text>
              </View>
              <View
                style={{
                  width: Width_convert(157),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.Swagger || null,
                    fontSize: Font_normalize(48),
                    fontWeight: '400',
                    color: '#000000',
                  }}>
                  피드백주기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(375),
              alignItems: 'center',
              marginTop: Height_convert(36),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.Swagger || null,
                fontSize: Font_normalize(20),
                fontWeight: '400',
                color: '#000000',
              }}>
              투닝 고객센터
            </Text>
            <Text
              style={{
                marginTop: Height_convert(9),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#000000',
              }}>
              오전 9시 ~ 오후 6시
            </Text>
          </View>
          <View
            style={{
              marginTop: Height_convert(24),
              width: Width_convert(343),
              height: Height_convert(36),
              marginLeft: Width_convert(16),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (Platform.OS !== 'android') {
                  Linking.openURL(`telprompt:01027655361`);
                } else {
                  Linking.openURL(`tel:01027655361`);
                }
              }}
              style={{
                width: Width_convert(163),
                height: Height_convert(36),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(6),
                backgroundColor: '#D9C1ED',
                flexDirection: 'row',
              }}>
              <CallLogo
                fill={'#A1A1A1'}
                style={{marginRight: Width_convert(8)}}></CallLogo>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(11),
                  color: '#000000',
                }}>
                010-2765-5361
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                width: Width_convert(163),
                height: Height_convert(36),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(6),
                backgroundColor: '#FDDC3F',
                flexDirection: 'row',
              }}>
              <KakaoTalkLogo
                fill={'#A1A1A1'}
                width={Width_convert(20)}
                height={Width_convert(20)}
                style={{marginRight: Width_convert(8)}}></KakaoTalkLogo>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(11),
                  color: '#000000',
                }}>
                카카오톡 상담
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default CustomerServiceScreen;
