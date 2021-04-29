import React, {useRef, useState, useEffect, useCallback, memo} from 'react';
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
  RefreshControl,
  Platform,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Swiper from 'react-native-swiper';
import Width_convert from '../../../components/Width_convert';
import BraketUp from '../../../../assets/home/braket_up.svg';
import BraketDown from '../../../../assets/home/braket_down.svg';
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
import FastImage from 'react-native-fast-image';

const ButtonArray = [
  {
    Title: '드레스업',
    Type: 'workDetail',
    SubTitle: '내 차의 외장을 꾸미고 싶을 때',
  },
  {
    Title: '퍼포먼스',
    Type: 'workDetail',
    SubTitle: '내 차의 성능을 높이고 싶을 때',
  },
  {
    Title: '편의장치',
    Type: 'workDetail',
    SubTitle: '내 차의 풍부한 옵션이 필요할 때',
  },
  {
    Title: '캠핑카 튜닝',
    Type: 'workDetail',
    SubTitle: '캠핑을 위한 튜닝을 하고 싶을 때',
  },
];
const HomeScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [pickButtonTitle, setPickButtonTitle] = useState('');
  const PickButtonTitleChangeValue = (text) => setPickButtonTitle(text);
  const [topSliderImageList, setTopSliderImageList] = useState([]);
  const [ownersWorkVideoList, setOwnersWorkVideoList] = useState([]);
  const [recentWorkList, setRecentWorkList] = useState([]);
  const [showInformation, setShowInformation] = useState(false);
  const [asyncValue, setAsyncValue] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const scrollChange = useRef(0);
  const scrollRef = useRef();
  const handleClick = useCallback(() => {
    if (scrollChange.current === 0) {
      scrollChange.current = 1;
      return false;
    }
    scrollRef.current.scrollToEnd({
      animated: true,
    });
  }, [scrollChange.current]);
  //홈화면 상단 슬라이드 이미지, 사장님의 작업영상 가져오기
  const get_homeData = (type) => {
    try {
      let url =
        type === 1 ? `${Domain}api/home/get` : `${Domain}api/work/get/recent`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let new_str = '';
          let value = await AsyncStorage.getItem('recentWorkList');
          if (value === null) {
            if (type !== 1) return false;
            setRecentWorkList([]);
          } else if (value === asyncValue) {
            return false;
          } else {
            setAsyncValue(value);
            let new_data = value.split(',');
            let new_arr = [];
            for (var a = 0; a < 10; a++) {
              //10개만 나온다.
              if (new_data[a] == undefined) break;
              if (a == 0) {
                new_str = new_data[a];
              } else {
                new_str = new_str + ',' + new_data[a];
              }
            }
          }
          let result = await axios.get(url, {
            params: {
              workid: new_str,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            if (type === 1) {
              setTopSliderImageList(result.data.results[0]);
              setOwnersWorkVideoList(result.data.results[1]);
              setRecentWorkList(result.data.results[2]);
            } else {
              setRecentWorkList(result.data.result);
            }
          } else {
            setIsLoadingAndModal(3); //에러
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3); //에러
    } finally {
      setIsLoadingAndModal(0);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    get_homeData(1);
    setRefreshing(false);
  }, []);
  useEffect(() => {
    get_homeData(1);
    props.navigation.addListener('focus', () => {
      get_homeData();
    });
  }, []);

  const MakeButton = (element) => {
    return (
      <SettingButton
        Title={element.Title}
        Type={element.Type}
        SubTitle={element.SubTitle}
        ShowModalChangeValue={ShowModalChangeValue}
        PickButtonTitleChangeValue={PickButtonTitleChangeValue}
        navigation={props.navigation}></SettingButton>
    );
  };
  const CarLocation = (reduxState) => {
    const {iu_car, location} = reduxState.loginDataCheck.login;
    if (
      iu_car.length > 0 &&
      location.legalCode &&
      iu_car[0]?.pickModelDetail?.modelDetail != undefined
    ) {
      return `${iu_car[0]?.pickBrand?.brand} ${iu_car[0]?.pickModelDetail?.modelDetail} / ${location.legalCode}`;
    } else if (
      iu_car.length > 0 &&
      iu_car[0]?.pickModelDetail?.modelDetail != undefined
    ) {
      return `${iu_car[0]?.pickBrand?.brand} ${iu_car[0]?.pickModelDetail?.modelDetail} / 지역`;
    } else if (
      iu_car.length > 0 &&
      iu_car[0]?.pickModelDetail === 'all' &&
      location.legalCode
    ) {
      return `모든 차종 / ${location.legalCode}`;
    } else if (iu_car.length > 0 && iu_car[0]?.pickModelDetail === 'all') {
      return `모든 차종 / 지역`;
    } else if (location.legalCode) {
      return `차종 / ${location.legalCode}`;
    } else {
      return `차종 / 지역`;
    }
  };
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          alwaysBounceVertical={false}
          onContentSizeChange={() => handleClick()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Tabbar Title={'투닝'}></Tabbar>
          {/*상단 슬라이드 이미지 시작 */}
          <View style={styles.sliderView}>
            {topSliderImageList.length > 0 ? (
              <Swiper
                style={{
                  height: Height_convert(211),
                }}
                autoplay={true}
                loop
                autoplayTimeout={4.5}
                autoplayDirection
                index={0}
                removeClippedSubviews={false}
                dot={<Dot></Dot>}
                activeDot={<ActiveDot></ActiveDot>}>
                {topSliderImageList.map((item) => (
                  <TouchableOpacity
                    style={{
                      height: Height_convert(211),
                    }}
                    activeOpacity={1}
                    key={item._id}
                    onPress={() => {
                      //페이지 만들어서 슝슝
                      if (item.image.includes('banner1')) {
                        props.navigation.navigate('Banner1');
                      } else if (item.image.includes('banner2')) {
                        props.navigation.navigate('Banner2');
                      }
                    }}>
                    <SwiperImage from={'home'} image={item.image}></SwiperImage>
                  </TouchableOpacity>
                ))}
              </Swiper>
            ) : (
              defaultImage()
            )}
          </View>
          {/*상단 슬라이드 이미지 끝 */}
          {/*슬라이드 이미지 아래부터 튜닝샵검색까지 시작 */}
          <View style={styles.settingView}>
            {/*슬라이드 이미지 밑 설정버튼 차종/지역 시작 */}
            <View style={styles.settingViewBottomView}>
              <View style={styles.settingViewBottomNestedView}>
                <SettingButton
                  Title={'설정'}
                  Type={'car/location'}
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={CarLocation(reduxState)}
                  Type={'car'}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*슬라이드 이미지 밑 설정버튼 차종/지역 끝 */}
            {/*드레스업 퍼포먼스 버튼 시작 */}
            <View style={styles.buttonView}>
              <View style={styles.selectButtonView}>
                {MakeButton(ButtonArray[0])}
                {MakeButton(ButtonArray[1])}
              </View>
            </View>
            {/*드레스업 퍼포먼스 버튼 끝 */}
            {/*편의장치 캠핑카 튜닝 버튼 시작 */}
            <View style={styles.buttonView2}>
              <View style={styles.selectButtonView}>
                {MakeButton(ButtonArray[2])}
                {MakeButton(ButtonArray[3])}
              </View>
            </View>
            {/*편의장치 캠핑카 튜닝 버튼 끝 */}
            {/*튜닝부품 or 작업, 튜닝샵 검색 버튼 시작 */}
            <Search navigation={props.navigation} route={props.route}></Search>
            {/*튜닝부품 or 작업, 튜닝샵 검색 버튼 끝 */}
          </View>
          {/*슬라이드 이미지 아래부터 튜닝샵검색까지 끝 */}
          {/*사장님의 작업영상 시작 */}
          <View style={styles.videoView}>
            <View style={styles.sideButton}>
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
                {ownersWorkVideoList.length > 0 &&
                  ownersWorkVideoList.map((item) => (
                    <OwnersWork
                      key={item._id}
                      From={'home'}
                      item={item}
                      navigation={props.navigation}
                      Index={ownersWorkVideoList.indexOf(item)}></OwnersWork>
                  ))}
              </ScrollView>
            </View>
          </View>
          {/*사장님의 작업영상 끝 */}
          {/*최근 본 작업 시작 */}
          <View style={styles.recentView}>
            <View style={styles.sideButton}>
              <TabMore
                Title={'최근 본 작업'}
                navigation={props.navigation}></TabMore>
            </View>
            {recentWorkList.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.recentWorkListScroll}>
                {recentWorkList.map((item) => (
                  <RecentWork
                    key={item._id}
                    item={item}
                    Index={recentWorkList.indexOf(item)}
                    navigation={props.navigation}></RecentWork>
                ))}
              </ScrollView>
            ) : (
              recentDefault()
            )}
          </View>
          {/*최근 본 작업 끝 */}
          {/*투닝 정보 시작 */}
          <View
            style={[
              styles.tuuningInfoView,
              tuuningInfoStyle(showInformation, 'view'),
            ]}>
            <View
              style={[
                styles.tuuningInfoNestedView,
                tuuningInfoStyle(showInformation, 'nestedView'),
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{top: 10, bottom: 5, left: 10, right: 10}}
                onPress={() => setShowInformation(!showInformation)}
                style={styles.tuuningInfoNestedViewTouch}>
                <Text style={styles.tuuningInfoNestedViewText}>투닝</Text>
                {showInformation ? (
                  <BraketDown></BraketDown>
                ) : (
                  <BraketUp></BraketUp>
                )}
              </TouchableOpacity>
              {showInformation && (
                <BottomInformationOpen></BottomInformationOpen>
              )}
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
      {showModal && (
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
      )}
    </>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
    flex: 1,
  },
  sliderView: {
    height: Height_convert(211),
    backgroundColor: '#FFFFFF',
  },
  fastImage: {
    width: Width_convert(375),
    height: Width_convert(211),
  },
  settingView: {
    width: Width_convert(375),
    height: Height_convert(313),
    borderBottomColor: 'rgba(219,219,219,0.35)',
    borderBottomWidth: 1,
  },
  settingViewBottomView: {
    width: Width_convert(375),
    height: Height_convert(18),
    marginTop: Height_convert(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingViewBottomNestedView: {
    width: Width_convert(337),
    height: Height_convert(18),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonView: {
    width: Width_convert(375),
    height: Height_convert(74),
    marginTop: Height_convert(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView2: {
    width: Width_convert(375),
    height: Height_convert(74),
    marginTop: Height_convert(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonView: {
    width: Width_convert(337),
    height: Height_convert(74),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoView: {
    width: Width_convert(375),
    height: Height_convert(335),
    borderBottomColor: 'rgba(219,219,219,0.35)',
    borderBottomWidth: 1,
  },
  recentView: {
    width: Width_convert(375),
    height: Height_convert(285),
    borderBottomColor: 'rgba(219,219,219,0.35)',
    borderBottomWidth: 1,
  },
  sideButton: {
    marginTop: Height_convert(32),
    width: Width_convert(375),
    height: Height_convert(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentWorkListScroll: {
    width: Width_convert(375),
    height: Height_convert(185),
    marginTop: Height_convert(16),
  },
  recentViewDefault: {
    width: Width_convert(375),
    height: Height_convert(185),
    marginTop: Height_convert(16),
    marginLeft: Width_convert(19),
  },
  recentNestedViewDefault: {
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
  },
  recentNestedViewDefaultText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(10),
    fontWeight: '700',
    color: '#C0C0C0',
  },
  tuuningInfoView: {
    width: Width_convert(375),
    height: Height_convert(70),
    borderBottomColor: 'rgba(219,219,219,0.35)',
    borderBottomWidth: 1,
  },
  tuuningInfoNestedView: {
    marginLeft: Width_convert(12),
    marginTop: Height_convert(11),
    width: Width_convert(351),
    height: Height_convert(60),
  },
  tuuningInfoNestedViewTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tuuningInfoNestedViewText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(9),
    color: '#3F3F3F',
    marginRight: Width_convert(5),
  },
});
const tuuningInfoStyle = (showInformation, Type) => {
  if (Type === 'view') {
    return showInformation
      ? {
          height: Height_convert(155),
        }
      : {
          height: Height_convert(70),
        };
  }
  return showInformation
    ? {
        height: Height_convert(144),
      }
    : {
        height: Height_convert(60),
      };
};

const defaultImage = () => {
  return (
    <FastImage
      style={styles.fastImage}
      source={{
        uri:
          'https://motory.s3.ap-northeast-2.amazonaws.com/homeBanner/banner1.png',
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.stretch}></FastImage>
  );
};

const recentDefault = () => {
  return (
    <View style={styles.recentViewDefault}>
      <View style={styles.recentNestedViewDefault}>
        <Text style={styles.recentNestedViewDefaultText}>
          최근 본 작업이 없습니다.
        </Text>
      </View>
    </View>
  );
};
export default HomeScreen;
