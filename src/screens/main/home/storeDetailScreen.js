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
import AnimatedHeader from '../../../components/Home/Animate/animatedHeader.js';
import StoreInformation from '../../../components/Home/Infomation/storeInformation.js';
import LaborInformation from '../../../components/Home/Infomation/laborInformation.js';
import BottomButton from '../../../components/Home/Bottom/bottomButton.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
const StoreDetailScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const offset = useRef(new Animated.Value(0)).current;
  const [scrollValue, setScrollValue] = React.useState(0);
  const [page, setPage] = React.useState('store');

  const insets = useSafeAreaInsets();
  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollTo({
      y: Width_convert(240 + 89) - Height_convert(94),
      animated: true,
    });
  };

  const ChangeScrollValue = (text) => setScrollValue(text);
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
          scrollEventThrottle={16}
          stickyHeaderIndices={[2]}
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
              height: Width_convert(240 + 89),
            }}>
            {/*상단 슬라이더 시작 */}
            <Swiper
              style={{height: Width_convert(240)}}
              autoplay={true}
              autoplayTimeout={4.5}
              dot={<Dot></Dot>}
              activeDot={<ActiveDot></ActiveDot>}>
              <SwiperImage
                from={'work'}
                image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
              <SwiperImage
                from={'work'}
                image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
              <SwiperImage
                from={'work'}
                image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
            </Swiper>
            {/*상단 슬라이더 끝 */}
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
                    MOTION튜닝샵
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: Height_convert(13),
                    marginLeft: Width_convert(19),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        marginRight: Width_convert(5),
                        fontFamily: Fonts?.NanumSqureRegular,
                        fontWeight: '400',
                        color: '#000000',
                        fontSize: Font_normalize(12),
                      }}>
                      서울특별시 강남구 청담동 12-3
                    </Text>
                    <VerticalBar
                      style={{marginRight: Width_convert(5)}}></VerticalBar>
                    <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                      <StoreSVG></StoreSVG>
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
                      4.8
                    </Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        props.navigation.navigate('ReviewView', {
                          Page: props.Page,
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
                        후기 30
                      </Text>
                      <PurpleTag></PurpleTag>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginRight: Width_convert(20)}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate('StoreWorkList', {
                      Page: 'MOTION튜닝샵',
                    });
                  }}>
                  <WorkMenu></WorkMenu>
                </TouchableOpacity>
              </View>
            </View>
            {/*작업 이름부터 가격까지 끝 */}
          </View>
          {/*상단슬라이더부터 후기까지 끝 */}
          {/*버튼 위치 맞추기 위함 시작 =========이게 가려서 네비게이션 클릭이 안됨*/}
          <View
            style={{
              marginTop: -Height_convert(94),
            }}></View>
          {/*버튼 위치 맞추기 위함 끝 */}
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 시작 */}
          <View>
            {/*터치 안되는곳 강제로 터치 추가맞춤 시작*/}
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(94),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: Width_convert(300),
                  height: Height_convert(94),
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate('ReviewView', {
                      Page: props.Page,
                    });
                  }}
                  style={{
                    marginTop: Height_convert(70),
                    marginLeft: Width_convert(60),
                    width: Width_convert(60),
                    height: Height_convert(30),
                  }}></TouchableOpacity>
              </View>
              <View style={{marginRight: Width_convert(20)}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(55),
                    height: Height_convert(85),
                  }}
                  onPress={() => {
                    props.navigation.navigate('StoreWorkList', {
                      Page: 'MOTION튜닝샵',
                    });
                  }}></TouchableOpacity>
              </View>
            </View>
            {/*터치 안되는곳 강제로 터치 추가맞춤 끝*/}
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
                  우리가게공임표
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 끝 */}
          {/*작업설명 -> HTML로 불러오기 */}
          {page == 'store' ? (
            <StoreInformation></StoreInformation>
          ) : page == 'labor' ? (
            <LaborInformation></LaborInformation>
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
          navigation={props.navigation}
          animatedValue={offset}
          scrollValue={scrollValue}></AnimatedHeader>
        {/*하단 카카오채팅 전화예약버튼 시작*/}
        <BottomButton></BottomButton>
        {/*하단 카카오채팅 전화예약버튼 끝*/}
      </View>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default StoreDetailScreen;
