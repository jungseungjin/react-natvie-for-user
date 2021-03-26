import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import moment from 'moment';
import 'moment/locale/ko';
const SignUpTerms2 = (props) => {
  moment.locale('ko');
  const [termsText, setTermsText] = React.useState({agreeText: ''});
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  React.useEffect(() => {
    try {
      let result;
      let url =
        Domain + 'signUp/terms?agreeNumber=' + props.route.params.agreeNumber;

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
              setTermsText({
                agreeText: result.data[0].result.agreeText,
                regDate: result.data[0].result.regDate,
              });
            } else {
              setTermsText({agreeText: ''});
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
    }
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {Platform.OS === 'android' && props.route.params.fromNav === 'home' ? (
        <View style={{height: StatusBarHeight}}></View>
      ) : null}
      <StatusBar
        barStyle={isLoadingAndModal == 2 ? 'light-content' : 'dark-content'}
        backgroundColor={
          isLoadingAndModal == 2 ? 'rgba(32, 32, 32, 0.3)' : '#FFFFFF'
        }></StatusBar>
      <Tabbar
        left={'back'}
        Title={'개인정보 취급방침'}
        navigation={props.navigation}></Tabbar>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: Width_convert(375)}}>
        <View
          style={{
            height: Height_convert(48),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={[
              {
                marginLeft: Width_convert(25),
                width: Width_convert(350),
                height: Height_convert(48),
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={[
                {
                  fontFamily: Fonts?.NanumSquareExtraBold || null,
                  fontSize: Font_normalize(17),
                  color: '#000000',
                },
              ]}>
              개인정보 취급방침
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginRight: Width_convert(25),
            marginLeft: Width_convert(25),
            marginTop: Width_convert(5),
            width: Width_convert(324),
            height: Height_convert(33),
            backgroundColor: '#ECECEC',
            borderRadius: Font_normalize(3),
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginLeft: Width_convert(11),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              color: '#000000',
              fontSize: Font_normalize(13),
            }}>
            시행일
          </Text>
          <Text
            style={{
              marginLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              color: '#000000',
              fontSize: Font_normalize(13),
            }}>
            :
          </Text>
          <Text
            style={{
              marginLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '300',
              color: '#000000',
              fontSize: Font_normalize(13),
            }}>
            {moment(termsText.regDate).format('YYYY년 MM월 DD일')}
          </Text>
        </View>
        <Text
          style={{
            marginTop: Width_convert(23),
            marginLeft: Width_convert(10),
            marginRight: Width_convert(10),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '300',
            color: '#000000',
            fontSize: Font_normalize(13),
          }}>
          {termsText.agreeText}
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
export default SignUpTerms2;
