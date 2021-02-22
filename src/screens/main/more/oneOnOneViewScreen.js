import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
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
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import {useSelector} from 'react-redux';
const OneOnOneView = (props) => {
  const reduexState = useSelector((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const DeleteQuestion = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'question/delete';
          let data = {
            _id: reduexState.loginDataCheck.login.data._id,
            question_id: props.route.params.item._id,
            title: props.route.params.item.title,
            contents: props.route.params.item.contents,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            props.navigation.navigate('OneOnOne');
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        {/* <Tabbar Title={'문의내역'} navigation={props.navigation}></Tabbar> */}
        {/*탑바 대체 시작 */}
        <View
          style={{
            height: Height_convert(94) - StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: Width_convert(90),
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <GoBack
              fill={'#000000'}
              style={{marginLeft: Width_convert(22)}}></GoBack>
          </TouchableOpacity>
          <View
            style={{
              width: Width_convert(195),
            }}>
            <Text
              style={{
                marginRight: Width_convert(7),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: 'black',
                textAlign: 'center',
              }}>
              문의확인
            </Text>
          </View>
          <View
            style={{
              width: Width_convert(90),
              backgroundColor: '#FFFFFF',
              marginRight: 0,
              marginLeft: 'auto',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (props.route.params.item.status == 0) {
                  props.navigation.navigate('OneOnOneRevise', {
                    item: props.route.params.item,
                  });
                }
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: Width_convert(12),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#63BEDB',
                }}>
                {props.route.params.item.status == 0 ? '수정' : null}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (props.route.params.item.status == 0) {
                  setShowModal(true);
                }
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: Width_convert(22),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#FF0000',
                }}>
                {props.route.params.item.status == 0 ? '삭제' : null}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*탑바 대체 끝 */}
        <ScrollView
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
                    color: '#000000',
                  }}>
                  {props.route.params.item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(8),
                    color: '#9F9F9F',
                  }}>
                  {moment(props.route.params.item.redDate).format(
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
          <ButtonTwoModal
            ShowModalChangeValue={ShowModalChangeValue}
            DeleteQuestion={DeleteQuestion}
            navigation={props.navigation}
            Title={'문의를 삭제하시겠습니까?'}
            LeftButtonTitle={'취소'}
            RightButtonTitle={'확인'}></ButtonTwoModal>
        ) : null}
        {networkModal ? (
          <ButtonOneModal
            ShowModalChangeValue={NetworkModalChangeValue}
            navigation={props.navigation}
            Title={'인터넷 연결을 확인해주세요'}
            //BottomText={''}
            CenterButtonText={'닫기'}></ButtonOneModal>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default OneOnOneView;
