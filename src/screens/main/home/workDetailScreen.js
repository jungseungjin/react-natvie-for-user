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
const WorkDetailScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const offset = useRef(new Animated.Value(0)).current;
  const [scrollValue, setScrollValue] = React.useState(0);
  const [workConsultingModal, setWorkConsultingModal] = React.useState(false);
  const WorkConsultingModalChangeValue = (text) => setWorkConsultingModal(text);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [page, setPage] = React.useState('work');
  const [pickCount, setPickCount] = React.useState(
    props.route.params.item.userCount,
  );
  const insets = useSafeAreaInsets();
  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollTo({
      y: Width_convert(240 + 171) - Height_convert(94),
      animated: true,
    });
  };
  const ChangeScrollValue = (text) => setScrollValue(text);
  const Pick = () => {
    try {
      let url = Domain + 'pickData_detail';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          if (reduxState.loginDataCheck.login.data) {
            let data = {
              _id: reduxState.loginDataCheck.login.data._id,
              type: 'work',
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
                newArr.indexOf(reduxState.loginDataCheck.login.data._id) != -1
              ) {
                //있으니 제거
                newArr.splice(
                  newArr.indexOf(reduxState.loginDataCheck.login.data._id),
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
                  _id: reduxState.loginDataCheck.login.data._id,
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

  const getDataAndNavigateFromWork = (type, item_id) => {
    try {
      let result;
      let url = Domain + 'detail/navigate/' + type;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              item_id: item_id,
            },
          });
          if (result.data[0].message == 'ok') {
            props.navigation.navigate('StoreDetail', {
              item: result.data[0].result[0],
            });
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
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  const [toastShow, setToastShow] = React.useState(0);
  React.useEffect(() => {
    if (toastShow == 1) {
      showToast('찜한 작업에 추가', 700);
    } else if (toastShow != 0) {
      showToast('찜이 해제되었습니다.', 700);
    }
  }, [toastShow]);
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
          {/*상단슬라이더부터 가격까지 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(240),
            }}>
            {/*상단 슬라이더 시작 */}
            <Swiper
              style={{height: Width_convert(240)}}
              autoplay={true}
              autoplayTimeout={4.5}
              dot={<Dot></Dot>}
              activeDot={<ActiveDot></ActiveDot>}>
              {props.route.params.item.store_thumbnail.map((item) => (
                <SwiperImage
                  from={'work'}
                  image={item}
                  key={item}></SwiperImage>
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
                {props.route.params.item.store_work_name}
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
                    getDataAndNavigateFromWork(
                      'store',
                      props.route.params.item.info_store[0]._id,
                    );
                  }}>
                  <Text
                    style={{
                      marginRight: Width_convert(5),
                      fontFamily: Fonts?.NanumSqureRegular,
                      fontWeight: '400',
                      color: '#000000',
                      fontSize: Font_normalize(12),
                    }}>
                    {props.route.params.item.info_store[0].store_name}
                  </Text>
                </TouchableOpacity>
                <VerticalBar
                  style={{marginRight: Width_convert(5)}}></VerticalBar>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    getDataAndNavigateFromWork(
                      'store',
                      props.route.params.item.info_store[0]._id,
                    );
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
                    props.navigation.navigate('StoreLocation', {
                      item: props.route.params.item.info_store[0],
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
                    {props.route.params.item.info_store[0].store_address}
                  </Text>
                </TouchableOpacity>
                <VerticalBar
                  style={{marginRight: Width_convert(5)}}></VerticalBar>
                <TouchableOpacity
                  activeOpacity={1}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => {
                    props.navigation.navigate('StoreLocation', {
                      item: props.route.params.item.info_store[0],
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
                  작업소요 {props.route.params.item.store_work_time}
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
                  {props.route.params.item.store_work_total_cost != null &&
                  props.route.params.item.store_work_total_cost != 0
                    ? props.route.params.item.store_work_total_cost
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
                    : '업체문의'}
                </Text>
              </View>
            </View>
          </View>
          {/*작업 이름부터 가격까지 끝 */}
          {/*상단슬라이더부터 가격까지 끝 */}
          {scrollValue >= Width_convert(240 + 171) - Height_convert(94) ? (
            <View
              style={{
                zIndex: 0,
                marginTop: -Height_convert(94),
              }}></View>
          ) : (
            <View
              style={{
                zIndex: 0,
                marginTop: 0,
              }}></View>
          )}
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 시작 */}
          <View>
            {scrollValue >= Width_convert(240 + 171) - Height_convert(94) ? (
              <View
                style={{
                  zIndex: 1,
                  height: Height_convert(94),
                }}></View>
            ) : (
              <View
                style={{
                  zIndex: 1,
                  height: 0,
                }}></View>
            )}
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
          {page == 'work' ? (
            <WorkInformation
              item={props.route.params.item.store_work_info}></WorkInformation>
          ) : page == 'store' ? (
            <StoreInformation
              item={props.route.params.item.info_store[0]}></StoreInformation>
          ) : page == 'labor' ? (
            <LaborInformation></LaborInformation>
          ) : null}
          {/*작업설명 -> HTML로 불러오기 */}
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
            reduxState.loginDataCheck.login.login
              ? JSON.stringify(props.route.params.item.info_user_id).indexOf(
                  JSON.stringify({
                    _id: reduxState.loginDataCheck.login.data._id,
                  }),
                ) != -1
                ? true
                : false
              : false
          }
          PickChangeValue={Pick}
          page={'work'}
          ShowModalChangeValue={ShowModalChangeValue}
          redux={reduxState.loginDataCheck.login}
          Title={props.route.params.item.info_store[0].store_name}
          navigation={props.navigation}
          animatedValue={offset}
          scrollValue={scrollValue}></AnimatedHeader>
        {/*하단 카카오채팅 전화예약버튼 시작*/}

        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        <BottomButton
          Messenger={props.route.params.item.info_store[0].store_messenger}
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
          storeNumber={props.route.params.item.info_store[0].store_number}
          WorkConsultingModalChangeValue={WorkConsultingModalChangeValue}
          name={reduxState.loginDataCheck.login?.data?.iu_name || null}
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
    </>
  );
};
export default WorkDetailScreen;
