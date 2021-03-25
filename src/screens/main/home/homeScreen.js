import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ShadowPropTypesIOS,
  Platform,
  RefreshControl,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Swiper from 'react-native-swiper';
import Width_convert from '../../../components/Width_convert';
import Star from '../../../../assets/home/star.svg';
import BraketUp from '../../../../assets/home/braket_up.svg';
import BraketDown from '../../../../assets/home/braket_down.svg';
import Vertical_bar from '../../../../assets/home/vertical_bar.svg';

import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Dot from '../../../components/Home/Swiper/dot.js';
import ActiveDot from '../../../components/Home/Swiper/activeDot.js';
import SwiperImage from '../../../components/Home/Swiper/swiperImage.js';
import SettingButton from '../../../components/Home/Setting/settingButton.js';
import BottomInformationOpen from '../../../components/Home/BottomInformation/bottomInformationOpen.js';
import BottomInformationDefault from '../../../components/Home/BottomInformation/bottomInformationDefault.js';
import TabMore from '../../../components/Home/TabMore/tabMore.js';
import OwnersWork from '../../../components/Home/horizontalScroll/ownersWork';
import RecentWork from '../../../components/Home/horizontalScroll/recentWork.js';
import Search from '../../../components/Home/Search/search.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const HomeScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [pickButtonTitle, setPickButtonTitle] = React.useState('');
  const PickButtonTitleChangeValue = (text) => setPickButtonTitle(text);
  const [topSliderImageList, setTopSliderImageList] = React.useState([]);
  const [ownersWorkVideoList, setOwnersWorkVideoList] = React.useState([]);
  const [recentWorkList, setRecentWorkList] = React.useState([]);
  const [showInformation, setShowInformation] = React.useState(false);
  const [scrollChange, setScrollChange] = React.useState(0);
  const scrollRef = useRef();
  const handleClick = () => {
    if (scrollChange === 0) {
      setScrollChange(1);
      return false;
    }
    scrollRef.current.scrollToEnd({
      animated: true,
    });
  };
  //홈화면 상단 슬라이드 이미지, 사장님의 작업영상 가져오기
  const get_homeData = () => {
    try {
      let result;
      let url = Domain + 'home';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setTopSliderImageList(result.data[0].SliderImageList);
            setOwnersWorkVideoList(result.data[0].RecommendVideoList);
          } else {
            console.log(result.data[0]);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingAndModal(0);
    }
  };
  //홈화면 최근 본 작업 데이터 가져오기
  const get_recentWorkList = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let value = await AsyncStorage.getItem('recentWorkList');

          if (value == null) {
            setRecentWorkList([]);
          } else {
            let new_data = value.split(',');
            let new_arr = [];
            let new_str = '';
            for (var a = 0; a < 6; a++) {
              //6개만 나온다.
              if (new_data[a] == undefined) {
                break;
              }
              if (a == 0) {
                new_str = new_data[a];
              } else {
                new_str = new_str + ',' + new_data[a];
              }
            }
            let result;
            let url = Domain + 'recentWorkList';
            if (new_str) {
              let result = await axios.get(url, {
                params: {
                  workid: new_str,
                },
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (result.data[0].message == 'ok') {
                setRecentWorkList(result.data[0].result);
              } else {
                setRecentWorkList([]);
              }
            } else {
              setRecentWorkList([]);
            }
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingAndModal(0);
    }
  };
  React.useEffect(() => {
    get_homeData();
    get_recentWorkList();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get_homeData();
    get_recentWorkList();
    setRefreshing(false);
  }, []);
  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      get_recentWorkList();
    });
  }, []);
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          alwaysBounceVertical={false}
          onContentSizeChange={() => {
            handleClick();
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Tabbar Title={'투닝'}></Tabbar>
          {/*상단 슬라이드 이미지 시작 */}
          <View
            style={{
              height: Height_convert(211),
              backgroundColor: '#FFFFFF',
            }}>
            {topSliderImageList.length > 0 ? (
              <Swiper
                style={{height: Height_convert(211)}}
                autoplay={true}
                autoplayTimeout={4.5}
                dot={<Dot></Dot>}
                activeDot={<ActiveDot></ActiveDot>}>
                {topSliderImageList.map((item) => (
                  <SwiperImage
                    key={item._id}
                    from={'home'}
                    image={item.url}></SwiperImage>
                ))}
              </Swiper>
            ) : (
              <IsLoading></IsLoading>
            )}
          </View>
          {/*상단 슬라이드 이미지 끝 */}
          {/*슬라이드 이미지 아래부터 튜닝샵검색까지 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(313),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            {/*슬라이드 이미지 밑 설정버튼 차종/지역 시작 */}
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(18),
                marginTop: Height_convert(32),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(18),
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <SettingButton
                  Title={'설정'}
                  Type={'car/location'}
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={
                    reduxState.loginDataCheck.login.iu_car.length > 0 &&
                    reduxState.loginDataCheck.login.location.legalcode &&
                    reduxState.loginDataCheck.login.iu_car[0]?.pickModelDetail
                      ?.model_detail != undefined
                      ? reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail?.brand +
                        ' ' +
                        reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail?.model_detail +
                        ' / ' +
                        reduxState.loginDataCheck.login.location.legalcode
                      : reduxState.loginDataCheck.login.iu_car.length > 0 &&
                        reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail?.model_detail != undefined
                      ? reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail?.brand +
                        ' ' +
                        reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail?.model_detail +
                        ' / 지역'
                      : reduxState.loginDataCheck.login.iu_car.length > 0 &&
                        reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail === 'all' &&
                        reduxState.loginDataCheck.login.location.legalcode
                      ? '모든 차종 / ' +
                        reduxState.loginDataCheck.login.location.legalcode
                      : reduxState.loginDataCheck.login.iu_car.length > 0 &&
                        reduxState.loginDataCheck.login.iu_car[0]
                          ?.pickModelDetail === 'all'
                      ? '모든 차종 / 지역'
                      : reduxState.loginDataCheck.login.location.legalcode
                      ? '차종 / ' +
                        reduxState.loginDataCheck.login.location.legalcode
                      : '차종 / 지역'
                  }
                  Type={'car'}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*슬라이드 이미지 밑 설정버튼 차종/지역 끝 */}
            {/*드레스업 퍼포먼스 버튼 시작 */}
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(74),
                marginTop: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(74),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <SettingButton
                  Title={'드레스업'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 외장을 꾸미고 싶을 때'}
                  ShowModalChangeValue={ShowModalChangeValue}
                  PickButtonTitleChangeValue={PickButtonTitleChangeValue}
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={'퍼포먼스'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 성능을 높이고 싶을 때'}
                  ShowModalChangeValue={ShowModalChangeValue}
                  PickButtonTitleChangeValue={PickButtonTitleChangeValue}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*드레스업 퍼포먼스 버튼 끝 */}
            {/*편의장치 캠핑카 튜닝 버튼 시작 */}
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(74),
                marginTop: Height_convert(12),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(74),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <SettingButton
                  Title={'편의장치'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 풍부한 옵션이 필요할 때'}
                  ShowModalChangeValue={ShowModalChangeValue}
                  PickButtonTitleChangeValue={PickButtonTitleChangeValue}
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={'캠핑카 튜닝'}
                  Type={'workDetail'}
                  SubTitle={'캠핑을 위한 튜닝을 하고 싶을 때'}
                  ShowModalChangeValue={ShowModalChangeValue}
                  PickButtonTitleChangeValue={PickButtonTitleChangeValue}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*편의장치 캠핑카 튜닝 버튼 끝 */}
            {/*튜닝부품 or 작업, 튜닝샵 검색 버튼 시작 */}
            <Search navigation={props.navigation} route={props.route}></Search>
            {/*튜닝부품 or 작업, 튜닝샵 검색 버튼 끝 */}
          </View>
          {/*슬라이드 이미지 아래부터 튜닝샵검색까지 끝 */}
          {/*사장님의 작업영상 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(335),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginTop: Height_convert(32),
                width: Width_convert(375),
                height: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TabMore
                Title={'사장님의 작업영상'}
                navigation={props.navigation}></TabMore>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: Height_convert(16),
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {ownersWorkVideoList.length > 0
                  ? ownersWorkVideoList.map((item) => (
                      <OwnersWork
                        key={item.url}
                        From={'home'}
                        item={item}
                        navigation={props.navigation}
                        Index={ownersWorkVideoList.indexOf(item)}></OwnersWork>
                    ))
                  : null}
              </ScrollView>
            </View>
          </View>
          {/*사장님의 작업영상 끝 */}
          {/*최근 본 작업 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(285),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginTop: Height_convert(32),
                width: Width_convert(375),
                height: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TabMore
                Title={'최근 본 작업'}
                navigation={props.navigation}></TabMore>
            </View>
            {recentWorkList.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  width: Width_convert(375),
                  height: Height_convert(185),
                  marginTop: Height_convert(16),
                }}>
                {recentWorkList.map((item) => (
                  <RecentWork
                    key={item.store_thumbnail[0]}
                    item={item}
                    Index={recentWorkList.indexOf(item)}
                    navigation={props.navigation}></RecentWork>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(185),
                  marginTop: Height_convert(16),
                  marginLeft: Width_convert(19),
                }}>
                <View
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(90),
                    borderRadius: Font_normalize(6),
                    borderColor: '#DBDBDB',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(10),
                      fontWeight: '700',
                      color: '#C0C0C0',
                    }}>
                    최근 본 작업이 없습니다.
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/*최근 본 작업 끝 */}
          {/*투닝 정보 시작 */}
          <View
            style={[
              {
                width: Width_convert(375),
                height: Height_convert(70),
                borderBottomColor: 'rgba(219,219,219,0.35)',
                borderBottomWidth: 1,
              },
              showInformation
                ? {
                    height: Height_convert(155),
                  }
                : {
                    height: Height_convert(70),
                  },
            ]}>
            <View
              style={[
                {
                  marginLeft: Width_convert(12),
                  marginTop: Height_convert(11),
                  width: Width_convert(351),
                  height: Height_convert(60),
                },
                showInformation
                  ? {
                      height: Height_convert(144),
                    }
                  : {
                      height: Height_convert(60),
                    },
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{top: 10, bottom: 5, left: 10, right: 10}}
                onPress={() => {
                  setShowInformation(!showInformation);
                  if (showInformation) {
                    //handleClick();
                  }
                }}
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#3F3F3F',
                    marginRight: Width_convert(5),
                  }}>
                  투닝
                </Text>
                {showInformation ? (
                  <BraketDown></BraketDown>
                ) : (
                  <BraketUp></BraketUp>
                )}
              </TouchableOpacity>
              {showInformation ? (
                <BottomInformationOpen></BottomInformationOpen>
              ) : null}
              <BottomInformationDefault
                navigation={props.navigation}></BottomInformationDefault>
            </View>
          </View>
          {/*투닝 정보 끝*/}
        </ScrollView>
      </SafeAreaView>

      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
      {showModal ? (
        <AlertModal2
          type={2}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          pickButtonTitle={pickButtonTitle}
          Title={
            '고객님의 차종과 지역을 설정하지 않은 경우에는 임의 작업이 검색됩니다.'
          }
          BottomText={'설정 하러가기'}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></AlertModal2>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({});
export default HomeScreen;
