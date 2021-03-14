import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
import moment from 'moment';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const IdFindScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [idText, setIdText] = React.useState(props.route.params.idText);
  const [idRegdate, setIdRegdate] = React.useState(
    props.route.params.idRegdate,
  );
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {Platform.OS === 'android' && props.route.params.fromNav === 'home' ? (
        <View style={{height: StatusBarHeight}}></View>
      ) : null}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'아이디 찾기2'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: 'rgba(219, 219, 219, 0.35)',
        }}></View>
      <View
        style={{
          marginLeft: Width_convert(19),
          marginRight: Width_convert(19),
          marginTop: Height_convert(51),
          width: Width_convert(337),
          height: Width_convert(245),
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              fontFamily: Fonts?.NanumSquareExtraBold || null,
              fontSize: Font_normalize(19),
              color: '#000000',
            }}>
            아이디 찾기 인증 완료
          </Text>
        </View>
        <View style={{marginTop: Height_convert(22)}}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(16),
              color: '#000000',
            }}>
            회원님의 투닝 아이디입니다.
          </Text>
        </View>
        <View
          style={{
            borderRadius: Font_normalize(5),
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopColor: '#000000',
            borderBottomColor: '#000000',
            borderLeftColor: '#000000',
            borderRightColor: '#000000',
            marginTop: Height_convert(26),
            justifyContent: 'center',
            alignItems: 'center',
            width: Width_convert(337),
            height: Width_convert(143),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(24),
              color: '#000000',
            }}>
            {idText}
          </Text>
          <Text
            style={{
              marginTop: Height_convert(6),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(16),
              color: '#000000',
            }}>
            가입일 :{' '}
            {moment(idRegdate, 'YYYY-MM-DD HH:mm').format('YYYY/MM/DD')}
          </Text>
          <Text
            style={{
              marginTop: Height_convert(6),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(16),
              color: '#000000',
            }}>
            로그인 : 투닝
          </Text>
        </View>
        <View
          style={{
            marginTop: Height_convert(205),
            width: Width_convert(339),
            height: Height_convert(105),
            marginRight: Width_convert(18),
            marginLeft: Width_convert(18),
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('Login', {
                  fromNav: props.route.params.fromNav,
                });
              }}
              style={{
                width: Width_convert(337),
                height: Width_convert(46),
                backgroundColor: '#946AEF',
                borderRadius: Font_normalize(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(16),
                  color: '#FFFFFF',
                }}>
                로그인 하기
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('PasswordFind', {
                  fromNav: props.route.params.fromNav,
                });
              }}
              style={{
                width: Width_convert(337),
                height: Width_convert(46),
                marginTop: Height_convert(13),
                backgroundColor: '#CDCDCD',
                borderRadius: Font_normalize(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(16),
                  color: '#636363',
                }}>
                비밀번호 찾기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
export default IdFindScreen;
