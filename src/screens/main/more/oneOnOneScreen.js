import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import FrequentlyQuestionMenu from '../../../components/More/Menu/frequentlyQuestionMenu.js';
import BracketDown from '../../../../assets/home/braket_down.svg';
import BracketUp from '../../../../assets/home/braket_up.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import GoBack from '../../../../assets/home/goBack.svg';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import {useSelector} from 'react-redux';
import moment from 'moment';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const OneOnOne = (props) => {
  React.useEffect(
    () => props.navigation.addListener('focus', () => onRefresh()),
    [],
  );
  const reduxState = useSelector((state) => state);
  const [dataList, setDataList] = React.useState([]);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [chkTime, setChkTime] = React.useState(moment().valueOf());
  const [chkReload, setChkReload] = React.useState(0);
  const getData = () => {
    try {
      if (chkReload != 0) {
        if (parseInt(chkTime) > parseInt(moment().valueOf()) - 10000) {
          console.log('gsssdgd');
          return false;
        }
      }
      console.log('gdgd');
      setChkTime(moment().valueOf());
      setChkReload(parseInt(chkReload) + 1);
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'question_list';
          let result = await axios.get(url, {
            params: {
              _id: reduxState.loginDataCheck.login.data._id,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setDataList(result.data[0].result);
          } else {
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);
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
              문의내역
            </Text>
          </View>
          <View
            style={{
              width: Width_convert(90),
              backgroundColor: '#FFFFFF',
              marginRight: 0,
              marginLeft: 'auto',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('OneOnOneRegister');
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: Width_convert(22),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#946AEF',
                }}>
                문의작성
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*탑바 대체 끝 */}
        {/*문의 리스트 시작 */}
        <FlatList
          alwaysBounceVertical={false}
          style={{
            marginTop: Height_convert(20),
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          data={dataList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('OneOnOneView', {item: item});
              }}
              style={{
                width: Width_convert(375),
                borderBottomColor: '#EEEEEE',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  marginLeft: Width_convert(12),
                  marginRight: Width_convert(12),
                  width: Width_convert(375 - 24), //351
                  height: Height_convert(93),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: Width_convert(250)}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(16),
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      marginTop: Height_convert(10),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(10),
                      fontWeight: '400',
                      color: '#393939',
                    }}>
                    {moment(item.regDate).format('YYYY년 MM월 DD일')}
                  </Text>
                </View>
                <View style={{width: Width_convert(100)}}>
                  <Text
                    style={[
                      {
                        textAlign: 'right',
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(16),
                      },
                      item.status == 0
                        ? {
                            color: '#908E8E',
                          }
                        : item.status == 1
                        ? {
                            color: '#37A0DB',
                          }
                        : null,
                    ]}>
                    {item.status == 0
                      ? '답변예정'
                      : item.status == 1
                      ? '답변완료'
                      : null}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
        {/*문의 리스트 끝 */}
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

export default OneOnOne;
