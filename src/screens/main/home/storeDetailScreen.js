import React, {useRef} from 'react';
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
  LayoutAnimation,
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
import ReviewInformation from '../../../components/Home/Infomation/reviewInformation.js';
import BottomButton from '../../../components/Home/Bottom/bottomButton.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import LoginModal from '../../../components/Modal/LoginModal.js';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import WorkConsultingModal from '../../../components/Modal/WorkConsultingModal.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
const StoreDetailScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [workConsultingModal, setWorkConsultingModal] = React.useState(false);
  const WorkConsultingModalChangeValue = (text) => setWorkConsultingModal(text);
  const offset = useRef(new Animated.Value(0)).current;
  const [scrollValue, setScrollValue] = React.useState(0);
  const [page, setPage] = React.useState('store');
  const [pickCount, setPickCount] = React.useState(
    props.route.params.item.userCount,
  );
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const insets = useSafeAreaInsets();
  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollTo({
      y: Width_convert(240 + 89) - Height_convert(94),
      animated: true,
    });
  };
  const ChangeScrollValue = (text) => setScrollValue(text);

  const Pick = () => {
    try {
      let url = Domain2 + 'pickData_detail';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          if (reduexState.loginDataCheck.login.data) {
            let data = {
              _id: reduexState.loginDataCheck.login.data._id,
              type: 'store',
              item_id: props.route.params.item._id,
            };
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].status == 'ok') {
              let newArr = [];
              for (
                var a = 0;
                a < props.route.params.item.info_user_id.length;
                a++
              ) {
                newArr.push(
                  props.route.params.item.info_user_id[a]._id.toString(),
                );
              }
              if (
                newArr.indexOf(reduexState.loginDataCheck.login.data._id) != -1
              ) {
                //있으니 제거
                newArr.splice(
                  newArr.indexOf(reduexState.loginDataCheck.login.data._id),
                  1,
                );
                let newArr2 = [];
                for (var a = 0; a < newArr.length; a++) {
                  newArr2.push({_id: newArr[a]});
                }
                props.route.params.item.info_user_id = newArr2.slice();
                props.route.params.item.userCount =
                  props.route.params.item.userCount - 1;
                setPickCount(pickCount - 1);
                setToastShow(2);
              } else {
                //없으니 추가
                props.route.params.item.info_user_id.push({
                  _id: reduexState.loginDataCheck.login.data._id,
                });
                props.route.params.item.userCount =
                  props.route.params.item.userCount + 1;
                setPickCount(pickCount + 1);
                setToastShow(1);
              }
              forceUpdate();
            } else {
            }
          } else {
            setShowModal(true);
          }
        } else {
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  const [toastShow, setToastShow] = React.useState(0);
  React.useEffect(() => {
    if (toastShow == 1) {
      showToast('찜한 가게에 추가', 700);
    } else if (toastShow != 0) {
      showToast('찜이 해제되었습니다.', 700);
    }
  }, [toastShow]);

  const [reviewList, setReviewList] = React.useState([]);
  const getData = () => {
    try {
      let result;
      let url = Domain2 + 'reviewList/store';
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
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getData();
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
                uri: props.route.params.item.store_image,
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
                    {props.route.params.item.store_name}
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
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => {
                        props.navigation.navigate('StoreLocation', {
                          item: props.route.params.item,
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
                        {props.route.params.item.store_address}
                      </Text>
                    </TouchableOpacity>
                    <VerticalBar
                      style={{marginRight: Width_convert(5)}}></VerticalBar>
                    <TouchableOpacity
                      activeOpacity={1}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => {
                        props.navigation.navigate('StoreLocation', {
                          item: props.route.params.item,
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
                      {props.route.params.item.reviewCount > 0
                        ? parseFloat(
                            props.route.params.item.reviewTotal /
                              props.route.params.item.reviewCount,
                          ).toFixed(1)
                        : '0.0'}
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
          {scrollValue >= Width_convert(240 + 89) - Height_convert(94) ? (
            <View
              style={{
                zIndex: 0,
                marginTop: -Height_convert(94),
              }}></View>
          ) : null}
          {/*버튼 위치 맞추기 위함 시작 =========이게 가려서 네비게이션 클릭이 안됨*/}
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 시작 */}
          <View>
            {scrollValue >= Width_convert(240 + 89) - Height_convert(94) ? (
              <View
                style={{
                  zIndex: 1,
                  height: Height_convert(94),
                }}></View>
            ) : null}
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
                  후기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 끝 */}
          {/*작업설명 -> HTML로 불러오기 */}
          {page == 'store' ? (
            <StoreInformation item={props.route.params.item}></StoreInformation>
          ) : page == 'labor' ? (
            <ReviewInformation
              item={reviewList}
              reviewGrade={
                props.route.params.item.reviewGrade
              }></ReviewInformation>
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
          Pick={
            reduexState.loginDataCheck.login.login
              ? JSON.stringify(props.route.params.item.info_user_id).indexOf(
                  JSON.stringify({
                    _id: reduexState.loginDataCheck.login.data._id,
                  }),
                ) != -1
                ? true
                : false
              : false
          }
          PickChangeValue={Pick}
          page={'store'}
          ShowModalChangeValue={ShowModalChangeValue}
          redux={reduexState.loginDataCheck.login}
          Title={props.route.params.item.store_name}
          navigation={props.navigation}
          animatedValue={offset}
          scrollValue={scrollValue}></AnimatedHeader>
        {/*하단 카카오채팅 전화예약버튼 시작*/}
        <BottomButton
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
          storeNumber={props.route.params.item.store_number}
          WorkConsultingModalChangeValue={WorkConsultingModalChangeValue}
          name={reduexState.loginDataCheck.login?.data?.iu_name || null}
          navigation={props.navigation}></WorkConsultingModal>
      ) : null}
      {networkModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
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
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default StoreDetailScreen;
