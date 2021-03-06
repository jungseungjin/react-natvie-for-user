import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FrequentlyQuestionMenu from '../../../components/More/Menu/frequentlyQuestionMenu.js';
import BracketDown from '../../../../assets/home/braket_down.svg';
import BracketUp from '../../../../assets/home/braket_up.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import GoBack from '../../../../assets/home/goBack.svg';
import Enter from '../../../../assets/home/Enter.svg';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import {useSelector} from 'react-redux';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const OneOnOneView = (props) => {
  moment.locale('ko');
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const reduxState = useSelector((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const DeleteQuestion = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = `${Domain}api/customer/delete/question`;
          let data = {
            writer: reduxState.loginDataCheck.login.data._id,
            _id: props.route.params.item._id,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            props.navigation.navigate('OneOnOne');
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          left={'back'}
          Title={'문의확인'}
          navigation={props.navigation}
          item={props.route.params.item}
          ShowModalChangeValue={ShowModalChangeValue}></Tabbar>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: Height_convert(20),
          }}>
          <View style={{width: Width_convert(375), backgroundColor: '#F5F5F5'}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#A8A8A8',
              }}>
              <View
                style={{
                  marginLeft: Width_convert(17),
                  marginRight: Width_convert(17),
                  width: Width_convert(375 - 34),
                  height: Width_convert(42),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(14),
                    lineHeight: Font_normalize(16),
                    color: '#000000',
                  }}>
                  {props.route.params.item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(8),
                    lineHeight: Font_normalize(10),
                    color: '#9F9F9F',
                  }}>
                  {moment(props.route.params.item.createdAt).format(
                    'YYYY년 MM월 DD일',
                  )}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#A8A8A8',
                minHeight: Height_convert(116),
              }}>
              <View
                style={{
                  marginLeft: Width_convert(17),
                  marginRight: Width_convert(17),
                  width: Width_convert(375 - 34),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginTop: Height_convert(15),
                    marginBottom: Height_convert(15),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(13),
                    color: '#000000',
                  }}>
                  {props.route.params.item.contents}
                </Text>
              </View>
            </View>

            <View
              style={[
                {
                  minHeight: Height_convert(110),
                },
                props.route.params.item.status == 0
                  ? {
                      minHeight: Height_convert(50),
                    }
                  : null,
              ]}>
              <View
                style={[
                  {
                    marginTop: Height_convert(15),
                    marginBottom: Height_convert(15),
                    marginLeft: Width_convert(17),
                    marginRight: Width_convert(17),
                    width: Width_convert(375 - 34),
                  },
                  props.route.params.item.status == 0
                    ? {marginBottom: 0}
                    : null,
                ]}>
                <View
                  style={{
                    height: Height_convert(20),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Enter></Enter>
                  <View
                    style={{
                      width: Width_convert(375 - 34 - 11),
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: Height_convert(5),
                      marginLeft: Width_convert(11),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(11),
                        fontWeight: '700',
                        color: '#37A0DB',
                      }}>
                      {props.route.params.item.status == 0
                        ? '답변 예정'
                        : '답변 투닝 담당자'}
                    </Text>
                    <Text
                      style={{
                        marginRight: Width_convert(17),
                        textAlign: 'right',
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(8),
                        fontWeight: '400',
                        color: '#9F9F9F',
                      }}>
                      {props.route.params.item.status == 0
                        ? ''
                        : moment(props.route.params.item.replyDate).format(
                            'YYYY년 MM월 DD일',
                          )}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    {
                      width: Width_convert(375 - 34 - 11 - 11),
                      marginLeft: Width_convert(17 + 11),
                      marginTop: Height_convert(15),
                      marginBottom: Height_convert(15),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(13),
                      color: '#000000',
                    },
                    props.route.params.item.status == 0
                      ? {marginBottom: 0}
                      : null,
                  ]}>
                  {props.route.params.item.status == 0
                    ? ''
                    : props.route.params.item.reply}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {showModal ? (
          <AlertModal2
            type={1}
            ShowModalChangeValue={ShowModalChangeValue}
            DeleteQuestion={DeleteQuestion}
            navigation={props.navigation}
            Title={'문의를 삭제하시겠습니까?'}
            LeftButtonTitle={'취소'}
            RightButtonTitle={'확인'}></AlertModal2>
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

export default OneOnOneView;
