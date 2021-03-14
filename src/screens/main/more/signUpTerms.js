import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const SignUpTerms = (props) => {
  const [termsText, setTermsText] = React.useState('');
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  React.useEffect(() => {
    try {
      let result;
      let url =
        Domain2 + 'signUp/terms?agreeNumber=' + props.route.params.agreeNumber;

      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //인터넷 연결이 확인되면 뒤에서 이메일 중복검사 진행
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].status == 'ok') {
            if (result.data[0].result?.agreeText) {
              setTermsText(result.data[0].result.agreeText);
            } else {
              setTermsText('아직없어용');
            }
          } else {
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {Platform.OS === 'android' && props.route.params.fromNav === 'home' ? (
        <View style={{height: StatusBarHeight}}></View>
      ) : null}
      <StatusBar
        barStyle={networkModal ? 'light-content' : 'dark-content'}
        backgroundColor={
          networkModal ? 'rgba(32, 32, 32, 0.3)' : '#FFFFFF'
        }></StatusBar>
      <Tabbar
        Title={
          props.route.params.agreeNumber == 1
            ? '투닝 이용약관'
            : props.route.params.agreeNumber == 3
            ? '개인정보 수집 및 이용'
            : props.route.params.agreeNumber == 4
            ? '위치기반 서비스 이용약관'
            : props.route.params.agreeNumber == 5
            ? '개인정보 제3자 제공 동의'
            : null
        }
        navigation={props.navigation}></Tabbar>
      <View
        style={{
          borderTopColor: 'rgba(219, 219, 219, 0.35);',
          borderTopWidth: 1,
        }}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: Width_convert(346), marginLeft: Width_convert(15)}}>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular,
            fontWeight: '400',
            fontSize: Font_normalize(14),
            color: '#000000',
          }}>
          {termsText}
        </Text>
      </ScrollView>

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
export default SignUpTerms;
