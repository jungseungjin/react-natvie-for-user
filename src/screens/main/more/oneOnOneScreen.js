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
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
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
import Domain from '../../../../key/Domain.js';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';
const OneOnOne = (props) => {
  moment.locale('ko');
  React.useEffect(
    () =>
      props.navigation.addListener('focus', () => {
        getData(), setBackendPage(1);
      }),
    [],
  );
  const reduxState = useSelector((state) => state);
  const [dataList, setDataList] = React.useState([]);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [chkTime, setChkTime] = React.useState(moment().valueOf());
  const [chkReload, setChkReload] = React.useState(0);

  const throttleGetData = _.throttle((Number) => getData(true), 300, {
    leading: true,
    trailing: false,
  });
  const [backendPage, setBackendPage] = React.useState(1);
  const getData = (Page) => {
    try {
      let page;
      if (Page) page = backendPage;
      if (chkReload != 0) {
        if (parseInt(chkTime) > parseInt(moment().valueOf()) - 10000) {
          return false;
        }
      }
      setChkTime(moment().valueOf());
      setChkReload(parseInt(chkReload) + 1);
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = `${Domain}api/customer/get/question`;
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              writer: reduxState.loginDataCheck.login.data._id,
              page: page,
            },
          });
          if (result.data.success === true) {
            if (Page && result.data.result.length > 0) {
              setDataList([...dataList, ...result.data.result]);
              setBackendPage((prevState) => {
                return (prevState += 1);
              });
            } else {
              setDataList(result.data.result);
            }
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
        <Tabbar
          left={'back'}
          Title={'문의내역'}
          navigation={props.navigation}></Tabbar>
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
          onEndReached={throttleGetData}
          onEndReachedThreshold={10}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item._id + index}
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
                    {moment(item.createdAt).format('YYYY년 MM월 DD일')}
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
