import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  StatusBar,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SwiperImage from '../../../components/Home/Swiper/swiperImage';
import Dot from '../../../components/Home/Swiper/dot.js';
import ActiveDot from '../../../components/Home/Swiper/activeDot.js';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import GoBackWhite from '../../../../assets/home/goBackWhite.svg';
import HeartRed from '../../../../assets/home/HeartRed.svg';
import HeartWhite from '../../../../assets/home/HeartWhite.svg';
import VerticalBar from '../../../../assets/home/vertical_bar.svg';
import StoreSVG from '../../../../assets/home/Store.svg';
import LocationSVG from '../../../../assets/home/Location.svg';
import Star from '../../../../assets/home/star.svg';
import PurpleTag from '../../../../assets/home/purple_tag.svg';
import KakaoTalkLogo from '../../../../assets/home/KakaoTalkLogo.svg';
import CallLogo from '../../../../assets/home/CallLogo.svg';
import AnimatedHeader from '../../../components/Home/Animate/animatedHeader.js';
import WorkInformation from '../../../components/Home/Infomation/workInformation.js';
import StoreInformation from '../../../components/Home/Infomation/storeInformation.js';
import LaborInformation from '../../../components/Home/Infomation/laborInformation.js';
import BottomButton from '../../../components/Home/Bottom/bottomButton.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import LoginModal from '../../../components/Modal/LoginModal.js';
import WorkConsultingModal from '../../../components/Modal/WorkConsultingModal.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import moment from 'moment';
import _ from 'lodash';
import SetRecentList from '../../../components/setRecentList.js';
import ImageModal from '../../../components/Modal/ImageModal.js';
const WorkDetailScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const offset = useRef(new Animated.Value(0)).current;
  const [scrollValue, setScrollValue] = useState(0);
  const [workConsultingModal, setWorkConsultingModal] = useState(false);
  const WorkConsultingModalChangeValue = (text) => setWorkConsultingModal(text);
  const [showModal, setShowModal] = useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [page, setPage] = useState('work');
  const insets = useSafeAreaInsets();
  const scrollHorizontalRef = useRef();
  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / Width_convert(375),
    );
    if (newPage === 0) setPage('work');
    else setPage('store');
  };

  const PageChangeValue = (Number) => {
    scrollHorizontalRef.current?.scrollToIndex({
      animated: false,
      index: Number,
    });
  };
  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollTo({
      y: Width_convert(240 + 171) - Height_convert(94),
      animated: true,
    });
  };
  const ChangeScrollValue = (text) => setScrollValue(text);
  const debounceToStore = _.debounce(
    (type, item_id) => ToStore(type, item_id),
    2000,
    {
      leading: true,
      trailing: false,
    },
  );
  const ToStore = (type, item_id) => {
    try {
      let url = `${Domain}api/store/get/one`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              userid: reduxState?.loginDataCheck?.login?._id,
              storeid: item_id,
            },
          });
          if (result.data.success === true) {
            SetRecentList('store', result.data.results[1]._id);
            props.navigation.navigate('StoreDetail', {
              item: result.data.results[1],
              pick: result.data.results[0],
            });
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  const [toastShow, setToastShow] = useState(0);
  useEffect(() => {
    if (toastShow === 1) {
      showToast('찜한 작업에 추가', 1000);
    } else if (toastShow != 0) {
      showToast('찜이 해제되었습니다.', 1000);
    }
  }, [toastShow]);
  const debouncePickChangeValue = _.debounce(
    (Number) => PickChangeValue(),
    3000,
    {
      leading: true,
      trailing: false,
    },
  );
  const PickChangeValue = () => {
    try {
      let type = myPick ? 'delete' : 'save';
      let url = `${Domain}api/work/pick/${type}`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          let result = await axios.post(url, {
            workid: props.route.params.item._id,
            userid: reduxState?.loginDataCheck?.login?._id,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            if (type === 'delete') {
              setPickCount((prevState) => {
                return (prevState -= 1);
              });
              setMyPick(null);
              setToastShow(2);
            } else {
              setPickCount((prevState) => {
                return (prevState += 1);
              });
              setMyPick(true);
              setToastShow(1);
            }
            setIsLoadingAndModal(0);
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  /*
  기본으로 있음  여기에 데이터 추가로 불러와서 사용하기  
  id
Image
Name
Store
Grade
Price
reviewCount
phoneNumber
  */
  const [pickCount, setPickCount] = useState(0);
  const [workData, setWorkData] = useState({});
  //작업아이디값, 평점,이미지,작업정보,경위도,작업이름, 찜한갯수,가격,리뷰갯수,가게위치 카카오톡 전화번호,가게아이디값, 작업소요시간
  const [myPick, setMyPick] = useState(''); //null이면 픽안함 아이디값들어오면 픽함
  const [storeData, setStoreData] = useState({}); //가게아이디값, 사업자정보, 오픈시간, 휴무일, 가게멤버
  const getData = () => {
    try {
      let url = `${Domain}api/work/get/one`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          let result = await axios.get(url, {
            params: {
              workid: props.route.params.item._id,
              userid: reduxState?.loginDataCheck?.login?._id,
              storeid: props.route.params.item.storeId,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            setWorkData(result.data.results[0]);
            setPickCount(result.data.results[0].pickCount);
            setMyPick(result.data.results[1]);
            setStoreData(result.data.results[2]);
            setIsLoadingAndModal(0);
          } else {
            setWorkData({});
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [visible, setIsVisible] = React.useState(false);
  const [visibleIndex, setVisibleIndex] = React.useState(0);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
      }
    });
    props.navigation.addListener('blur', () => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(false);
      }
    });
  }, [props.navigation]);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <View style={{backgroundColor: '#FFFFFF'}}>
        {scrollValue > Width_convert(240) - 2 * StatusBarHeight ? (
          <StatusBar
            //translucent
            backgroundColor={'transparent'}
            barStyle="dark-content"
          />
        ) : (
          <StatusBar
            //translucent
            backgroundColor="transparent"
            barStyle="light-content" //dark-content
          />
        )}
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          scrollEventThrottle={16}
          stickyHeaderIndices={[3]}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {
              useNativeDriver: false,
              listener: (event) => {
                ChangeScrollValue(event.nativeEvent.contentOffset.y);
              },
            },
          )}>
          {/*상단슬라이더부터 가격까지 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(240),
            }}>
            {/*상단 슬라이더 시작 */}
            <Swiper
              style={{height: Width_convert(240)}}
              autoplay={false}
              dot={<Dot></Dot>}
              activeDot={<ActiveDot></ActiveDot>}>
              {props.route.params.item.image.map((item, index) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    width: Width_convert(375),
                    height: Width_convert(240),
                  }}
                  key={item}
                  activeOpacity={1}
                  onPress={() => {
                    setIsVisible(true);
                    setVisibleIndex(index);
                  }}>
                  <SwiperImage
                    from={'work'}
                    image={item}
                    key={item}></SwiperImage>
                </TouchableOpacity>
              ))}
            </Swiper>
          </View>
          {/*상단 슬라이더 끝 */}
          {/*작업 이름부터 가격까지 시작 */}
          <View
            style={{
              zIndex: 2,
              width: Width_convert(375),
              height: Width_convert(171),
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginTop: Height_convert(13),
                marginLeft: Width_convert(19),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(18),
                  fontWeight: '700',
                  color: '#000000',
                }}>
                {props.route.params.item.name}
              </Text>
            </View>
            <View
              style={{
                marginTop: Height_convert(13),
                marginLeft: Width_convert(19),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    if (storeData._id) {
                      debounceToStore('store', storeData._id);
                    } else {
                      setIsLoadingAndModal(3);
                    }
                  }}>
                  <Text
                    style={{
                      marginRight: Width_convert(5),
                      fontFamily: Fonts?.NanumSqureRegular,
                      fontWeight: '400',
                      color: '#000000',
                      fontSize: Font_normalize(12),
                    }}>
                    {props.route.params.item.store.name}
                  </Text>
                </TouchableOpacity>
                <VerticalBar
                  style={{marginRight: Width_convert(5)}}></VerticalBar>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    if (storeData._id) {
                      debounceToStore('store', storeData._id);
                    } else {
                      setIsLoadingAndModal(3);
                    }
                  }}>
                  <StoreSVG></StoreSVG>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: Height_convert(6),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                  onPress={() => {
                    if (workData.location) {
                      props.navigation.navigate('StoreLocation', {
                        item: workData.location,
                        title: workData.store.name,
                      });
                    } else {
                      setIsLoadingAndModal(3);
                    }
                  }}>
                  <Text
                    style={{
                      marginRight: Width_convert(5),
                      fontFamily: Fonts?.NanumSqureRegular,
                      fontWeight: '400',
                      color: '#000000',
                      fontSize: Font_normalize(12),
                    }}>
                    {props.route.params.item.store.address}
                  </Text>
                </TouchableOpacity>
                <VerticalBar
                  style={{marginRight: Width_convert(5)}}></VerticalBar>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    if (workData.location) {
                      props.navigation.navigate('StoreLocation', {
                        item: workData.location,
                        title: workData.store.name,
                      });
                    } else {
                      setIsLoadingAndModal(3);
                    }
                  }}>
                  <LocationSVG></LocationSVG>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: Height_convert(8),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Star
                    width={Width_convert(13)}
                    height={Width_convert(13)}
                    style={{
                      marginRight: Width_convert(2),
                    }}></Star>
                </View>
                <Text
                  style={{
                    marginRight: Width_convert(10),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(14),
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                  {props.route.params.item.grade}
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    //뒤에서 가져올거야 ->ㅈㅏㄱ업아이디값넘겨서 리뷰가져오기
                    props.navigation.navigate('ReviewView', {
                      item: props.route.params.item,
                      type: 'work',
                    });
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      marginRight: Width_convert(3),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(14),
                      color: '#9B6FAB',
                    }}>
                    후기{' '}
                    {props.route.params.item.reviewCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                  <PurpleTag></PurpleTag>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: Height_convert(17),
                marginLeft: Width_convert(19),
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(10),
                    fontWeight: '700',
                    color: '#59A3D9',
                  }}>
                  {/*//뒤에서 가져올거야 */}
                  작업소요{' '}
                  {workData?.workTime &&
                    moment(workData?.workTime, 'HH:mm').format('HH시간 mm분')}
                </Text>
              </View>
              <View style={{marginTop: Height_convert(4)}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(18),
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                  {props.route.params.item.price === 0
                    ? '업체문의'
                    : props.route.params.item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
                </Text>
              </View>
            </View>
          </View>
          {/*작업 이름부터 가격까지 끝 */}
          {/*상단슬라이더부터 가격까지 끝 */}
          <View
            style={[
              {
                zIndex: 0,
              },
              scrollValue >= Width_convert(240 + 171) - Height_convert(94)
                ? {
                    marginTop: -Height_convert(94),
                  }
                : {
                    marginTop: 0,
                  },
            ]}></View>
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 시작 */}
          <View>
            <View
              style={[
                {
                  zIndex: 1,
                },
                scrollValue >= Width_convert(240 + 171) - Height_convert(94)
                  ? {
                      height: Height_convert(94),
                    }
                  : {
                      height: 0,
                    },
              ]}></View>
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(48),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }}>
              <TouchableOpacity
                //key={item.value}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                activeOpacity={1}
                onPress={() => {
                  handleClick();
                  setPage('work');
                  PageChangeValue(0);
                }}
                style={[
                  {
                    width: Width_convert(375 / 2),
                    height: Width_convert(48),
                    borderBottomWidth: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  page == 'work'
                    ? {
                        borderBottomColor: '#000000',
                      }
                    : {
                        borderBottomColor: '#AAAAAA',
                      },
                ]}>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumSquareRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                    },
                    page == 'work'
                      ? {
                          color: '#000000',
                        }
                      : {
                          color: '#AAAAAA',
                        },
                  ]}>
                  작업설명
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                //key={item.value}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                activeOpacity={1}
                onPress={() => {
                  handleClick();
                  setPage('store');
                  PageChangeValue(1);
                }}
                style={[
                  {
                    width: Width_convert(375 / 2),
                    height: Width_convert(48),
                    borderBottomWidth: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  page == 'store'
                    ? {
                        borderBottomColor: '#000000',
                      }
                    : {
                        borderBottomColor: '#AAAAAA',
                      },
                ]}>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumSquareRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                    },
                    page == 'store'
                      ? {
                          color: '#000000',
                        }
                      : {
                          color: '#AAAAAA',
                        },
                  ]}>
                  사장님 가게소개
                </Text>
              </TouchableOpacity>
              {/*<TouchableOpacity
                //key={item.value}
                activeOpacity={1}
                onPress={() => {
                  handleClick();
                  setPage('labor');
                }}
                style={[
                  {
                    width: Width_convert(375 / 3),
                    height: Width_convert(48),
                    borderBottomWidth: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  page == 'labor'
                    ? {
                        borderBottomColor: '#000000',
                      }
                    : {
                        borderBottomColor: '#AAAAAA',
                      },
                ]}>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumSquareRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                    },
                    page == 'labor'
                      ? {
                          color: '#000000',
                        }
                      : {
                          color: '#AAAAAA',
                        },
                  ]}>
                  우리가게공임표
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 끝 */}
          {/*//뒤에서 가져올거야 */}
          <FlatList
            ref={scrollHorizontalRef}
            style={{
              height: '100%',
              width: '100%',
            }}
            data={[
              {id: '1', item: workData?.information},
              {id: '2', item: storeData},
            ]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            getItemLayout={(data, index) => ({
              length: Width_convert(375),
              offset: Width_convert(375) * index,
              index,
            })}
            onScroll={onScroll}
            keyExtractor={(item) => String(item.id)}
            renderItem={(item, index) => {
              return (
                <>
                  {item.item.id === '1' ? (
                    <WorkInformation item={item.item.item}></WorkInformation>
                  ) : (
                    <StoreInformation item={item.item.item}></StoreInformation>
                  )}
                </>
              );
            }}
            initialScrollIndex={0}></FlatList>
          {/*작업설명 -> HTML로 불러오기 */}
          {/*하단 버튼만큼의 공간 띄우기 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(55) + Height_convert(insets.bottom),
            }}></View>
          {/*하단 버튼만큼의 공간 띄우기 끝 */}
        </ScrollView>
        {/*//뒤에서 가져올거야 */}
        <AnimatedHeader
          Length={pickCount}
          Pick={myPick ? true : false}
          PickChangeValue={debouncePickChangeValue}
          page={'work'}
          ShowModalChangeValue={ShowModalChangeValue}
          redux={reduxState.loginDataCheck.login}
          Title={props.route.params.item.store.name}
          navigation={props.navigation}
          animatedValue={offset}
          scrollValue={scrollValue}></AnimatedHeader>
        {/*하단 카카오채팅 전화예약버튼 시작*/}

        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        <BottomButton
          Messenger={props.route.params.item.store.kakaoTalk}
          WorkConsultingModalChangeValue={
            WorkConsultingModalChangeValue
          }></BottomButton>
        {/*하단 카카오채팅 전화예약버튼 끝*/}
      </View>
      <Toast
        ref={(toast) => (toastRef = toast)}
        style={{
          backgroundColor: '#474747',
          paddingTop: Height_convert(16),
          paddingBottom: Height_convert(16),
          paddingRight: Width_convert(20),
          paddingLeft: Width_convert(20),
          borderRadius: Font_normalize(7),
        }}
        position="center"
        //opacity={0.8}
        textStyle={{color: '#FFFFFF'}}
      />
      {workConsultingModal ? (
        <WorkConsultingModal
          storeNumber={workData?.store.phoneNumber}
          WorkConsultingModalChangeValue={WorkConsultingModalChangeValue}
          name={reduxState.loginDataCheck.login?.data?.name || null}
          navigation={props.navigation}></WorkConsultingModal>
      ) : null}
      {showModal ? (
        <LoginModal
          fromNav={'home'}
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
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
      <ImageModal
        visible={visible}
        setIsVisible={setIsVisible}
        visibleIndex={visibleIndex}
        imageUrls={props.route.params.item.image}></ImageModal>
    </>
  );
};
export default WorkDetailScreen;
