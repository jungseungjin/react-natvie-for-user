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
import WorkMenu from '../../../../assets/home/work_menu.svg';
import {useSelector} from 'react-redux';
import AnimatedHeader from '../../../components/Home/Animate/animatedHeader.js';
import StoreInformation from '../../../components/Home/Infomation/storeInformation.js';
import StoreInformation2 from '../../../components/Home/Infomation/storeInformation2.js';
import BottomButton from '../../../components/Home/Bottom/bottomButton.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import LoginModal from '../../../components/Modal/LoginModal.js';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import WorkConsultingModal from '../../../components/Modal/WorkConsultingModal.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';

const StoreDetailScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const [workConsultingModal, setWorkConsultingModal] = useState(false);
  const WorkConsultingModalChangeValue = (text) => setWorkConsultingModal(text);
  const offset = useRef(new Animated.Value(0)).current;
  const [scrollValue, setScrollValue] = useState(0);
  const [page, setPage] = useState('store');
  const insets = useSafeAreaInsets();
  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollTo({
      y: Width_convert(240 + 89) - Height_convert(94),
      animated: true,
    });
  };
  const ChangeScrollValue = (text) => setScrollValue(text);

  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  const [toastShow, setToastShow] = useState(0);
  useEffect(() => {
    if (toastShow == 1) {
      showToast('찜한 가게에 추가', 1000);
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
  const [pickCount, setPickCount] = useState(props.route.params.item.pickCount);
  const [myPick, setMyPick] = useState(props.route.params.pick);
  const PickChangeValue = () => {
    try {
      let type = myPick ? 'delete' : 'save';
      let url = `${Domain}api/store/pick/${type}`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          let result = await axios.post(url, {
            storeid: props.route.params.item._id,
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
  const [reviewList, setReviewList] = useState([]);
  const getData = () => {
    try {
      let url = Domain + 'reviewList/store';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              item_id: props.route.params.item._id,
            },
          });
          if (result.data[0].message == 'ok') {
            setReviewList(result.data[0].result);
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
  };
  useEffect(() => {
    // getData();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <View style={{backgroundColor: '#FFFFFF'}}>
        {scrollValue > Width_convert(240) - 2 * StatusBarHeight ? (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
        ) : (
          <StatusBar
            translucent
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
          {/*상단슬라이더부터 후기까지 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(240),
            }}>
            {/*상단 이미지 시작 */}
            <FastImage
              style={{height: Width_convert(240)}}
              source={{
                uri: props.route.params.item.image[0],
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
            {/*상단 이미지 끝 */}
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(89),
            }}>
            {/*작업 이름부터 가격까지 시작 */}
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(89),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                      onPress={() => {
                        props.navigation.navigate('StoreLocation', {
                          item: props.route.params.item.location,
                          title: props.route.params.item.name,
                        });
                      }}>
                      <Text
                        style={{
                          marginRight: Width_convert(5),
                          fontFamily: Fonts?.NanumSqureRegular,
                          fontWeight: '400',
                          color: '#000000',
                          fontSize: Font_normalize(12),
                        }}>
                        {props.route.params.item.address.address}
                      </Text>
                    </TouchableOpacity>
                    <VerticalBar
                      style={{marginRight: Width_convert(5)}}></VerticalBar>
                    <TouchableOpacity
                      activeOpacity={1}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => {
                        props.navigation.navigate('StoreLocation', {
                          item: props.route.params.item.location,
                          title: props.route.params.item.name,
                        });
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
                        props.navigation.navigate('ReviewView', {
                          item: props.route.params.item,
                          type: 'store',
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
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
              </View>
              <View style={{marginRight: Width_convert(20)}}>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    props.navigation.navigate('StoreWorkList', {
                      item: props.route.params.item,
                    });
                  }}>
                  <WorkMenu></WorkMenu>
                </TouchableOpacity>
              </View>
            </View>
            {/*작업 이름부터 가격까지 끝 */}
          </View>
          {/*상단슬라이더부터 후기까지 끝 */}
          <View
            style={{
              zIndex: 0,
              marginTop:
                scrollValue >= Width_convert(240 + 89) - Height_convert(94)
                  ? -Height_convert(94)
                  : 0,
            }}></View>
          {/*버튼 위치 맞추기 위함 시작 =========이게 가려서 네비게이션 클릭이 안됨*/}
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 시작 */}
          <View>
            <View
              style={{
                zIndex: 1,
                height:
                  scrollValue >= Width_convert(240 + 89) - Height_convert(94)
                    ? Height_convert(94)
                    : 0,
              }}></View>
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
                  setPage('store');
                  //PageChangeValue(item.value);
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
                    : {borderBottomColor: '#AAAAAA'},
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
                      : {color: '#AAAAAA'},
                  ]}>
                  사장님 가게소개
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                //key={item.value}
                activeOpacity={1}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => {
                  handleClick();
                  setPage('labor');
                  //PageChangeValue(item.value);
                }}
                style={[
                  {
                    width: Width_convert(375 / 2),
                    height: Width_convert(48),
                    borderBottomWidth: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  page == 'labor'
                    ? {
                        borderBottomColor: '#000000',
                      }
                    : {borderBottomColor: '#AAAAAA'},
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
                      : {color: '#AAAAAA'},
                  ]}>
                  가게정보
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 끝 */}
          {/*작업설명 -> HTML로 불러오기 */}
          {page === 'store' ? (
            <StoreInformation item={props.route.params.item}></StoreInformation>
          ) : page === 'labor' ? (
            <StoreInformation2
              item={props.route.params.item}></StoreInformation2>
          ) : null}

          {/*하단 버튼만큼의 공간 띄우기 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(55) + Height_convert(insets.bottom),
            }}></View>
          {/*하단 버튼만큼의 공간 띄우기 끝 */}
        </ScrollView>
        <AnimatedHeader
          Length={pickCount}
          Pick={myPick}
          PickChangeValue={debouncePickChangeValue}
          page={'store'}
          ShowModalChangeValue={ShowModalChangeValue}
          redux={reduxState.loginDataCheck.login}
          Title={props.route.params.item.name}
          navigation={props.navigation}
          animatedValue={offset}
          scrollValue={scrollValue}></AnimatedHeader>
        {/*하단 카카오채팅 전화예약버튼 시작*/}
        <BottomButton
          Messenger={props.route.params.item.address.kakaoTalk}
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
          storeNumber={props.route.params.item.address.phoneNumber}
          WorkConsultingModalChangeValue={WorkConsultingModalChangeValue}
          name={reduxState.loginDataCheck.login?.data?.name || null}
          navigation={props.navigation}></WorkConsultingModal>
      ) : null}
      {showModal ? (
        <LoginModal
          fromNav={'home'}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={'우리가게공임표를 확인하려면 로그인이 필요합니다.'}
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
    </>
  );
};
export default StoreDetailScreen;
