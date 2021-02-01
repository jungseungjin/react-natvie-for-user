import React, {useRef} from 'react';
import {
  StatusBar,
  View,
  Platform,
  ScrollView,
  NativeModules,
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
import IsLoading from '../../../components/ActivityIndicator';
const {StatusBarManager} = NativeModules;
import AnimatedHeader from './AnimatedHeader';
const StoreDetailScreen = ({navigation, Page}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const offset = useRef(new Animated.Value(0)).current;
  const [statusBar, setStatusBar] = React.useState(0);
  const [scrollValue, setScrollValue] = React.useState(0);

  const insets = useSafeAreaInsets();
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);

  const ChangeScrollValue = (text) => setScrollValue(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <View style={{backgroundColor: '#FFFFFF'}}>
        {scrollValue > Width_convert(240) - 2 * statusBar ? (
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
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {
              useNativeDriver: false,
              listener: (event) => {
                ChangeScrollValue(event.nativeEvent.contentOffset.y);
              },
            },
          )}>
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
                        navigation.navigate('ReviewView', {Page: Page});
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
                        후기 30
                      </Text>
                      <PurpleTag></PurpleTag>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginRight: Width_convert(20)}}>
                <TouchableOpacity
                  activeOpacit={1}
                  onPress={() => {
                    navigation.navigate('StoreWorkList', {
                      Page: 'MOTION튜닝샵',
                    });
                  }}>
                  <WorkMenu></WorkMenu>
                </TouchableOpacity>
              </View>
            </View>
            {/*작업 이름부터 가격까지 끝 */}
          </View>

          {/*작업설명 사장님가게소개 우리가게공임표 버튼 시작 */}
          {scrollValue >=
          (Platform.OS == 'ios'
            ? Width_convert(240 + 89) - Height_convert(94)
            : Width_convert(240 + 89) - Height_convert(94)) ? (
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(48),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}></View>
          ) : (
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(48),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                //key={item.value}
                activeOpacity={1}
                onPress={() => {
                  //PageChangeValue(item.value);
                }}
                style={{
                  width: Width_convert(375 / 2),
                  height: Width_convert(48),
                  borderBottomWidth: 3,
                  borderBottomColor: '#000000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSquareRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(11),
                    color: '#000000',
                  }}>
                  사장님 가게소개
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                //key={item.value}
                activeOpacity={1}
                onPress={() => {
                  //PageChangeValue(item.value);
                }}
                style={{
                  width: Width_convert(375 / 2),
                  height: Width_convert(48),
                  borderBottomWidth: 3,
                  borderBottomColor: '#AAAAAA',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSquareRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(11),
                    color: '#AAAAAA',
                  }}>
                  우리가게공임표
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/*작업설명 사장님가게소개 우리가게공임표 버튼 끝 */}
          {/*작업설명 -> HTML로 불러오기 */}
          {/*사장님 가게소개 시작*/}
          <View>
            <View
              style={{
                width: Width_convert(375),
                borderBottomWidth: 3,
                borderBottomColor: '#DBDBDB',
              }}>
              <Text
                style={{
                  marginTop: Height_convert(21),
                  marginLeft: Width_convert(21),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#000000',
                }}>
                사장님 한마디
              </Text>
              <Text
                style={{
                  marginTop: Height_convert(17),
                  marginLeft: Width_convert(21),
                  marginRight: Width_convert(17),
                  marginBottom: Width_convert(22),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(11),
                  color: '#000000',
                }}>
                안녕하세요? MOTION튜닝 사장 ***입니다 저희 튜닝샵은 이
                지역에서만 작업을 한지 10년입니다. 다양한 튜닝작업을 해왔으며
                특히, 바디킷 장착에서만큼은 그 누구보다 부족함 없이 잘하고
                있다고 자부합니다! 고객님들의 불편한 점과 문제에 대해서 지적하신
                것에 대해 늘 받아드리고 배울 준비가 되어있습니다. 많은 작업들을
                올려 놓았으니 구경한번 하시고 편안하게 방문해주시면
                감사하겠습니다!
              </Text>
            </View>
            <View
              style={{
                width: Width_convert(375),
                borderBottomWidth: 3,
                borderBottomColor: '#DBDBDB',
              }}>
              <Text
                style={{
                  marginTop: Height_convert(21),
                  marginLeft: Width_convert(21),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#000000',
                }}>
                가게영업정보
              </Text>
              <View
                style={{
                  marginTop: Height_convert(17),
                  marginLeft: Width_convert(21),
                  marginRight: Width_convert(17),
                  marginBottom: Width_convert(22),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    가게주소
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    서울특별시 강남구 청담동 12-3 1층 MOTION튜닝샵
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    운영시간
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    월요일 - 금요일 오전 09:00 ~ 오후 07:00{'\n'}토요일 - 일요일
                    오전 10:00 ~ 오후 06:00
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    휴무일
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    매달 첫째주 일요일{'\n'}매달 셋째주 일요일
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    전화번호
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    02-123-4567
                  </Text>
                </View>
              </View>
            </View>
            {/*사업자정보 시작 */}
            <View
              style={{
                width: Width_convert(375),
              }}>
              <Text
                style={{
                  marginTop: Height_convert(21),
                  marginLeft: Width_convert(21),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#000000',
                }}>
                사업자정보
              </Text>
              <View
                style={{
                  marginTop: Height_convert(17),
                  marginLeft: Width_convert(21),
                  marginRight: Width_convert(17),
                  marginBottom: Width_convert(22),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    대표자명
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    백준열
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    가게상호명
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    MOTION튜닝
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    사업자주소
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    서울특별시 강남구 청담동 12-3 1층
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
                  <Text
                    style={{
                      width: Width_convert(112 - 21),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    사업자등록번호
                  </Text>
                  <Text
                    style={{
                      width: Width_convert(236),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(11),
                      color: '#000000',
                    }}>
                    02-123-4567
                  </Text>
                </View>
              </View>
            </View>

            {/*사업자정보 끝 */}
          </View>
          {/*사장님 가게소개 끝*/}
          {/*우리가게공임표 시작*/}
          <View
            style={{
              width: Width_convert(375),
            }}>
            <View
              style={{
                width: Width_convert(375),
              }}>
              <Text
                style={{
                  marginTop: Height_convert(21),
                  marginLeft: Width_convert(21),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#000000',
                }}>
                우리가게공임표
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: Width_convert(333),
                  height: Height_convert(27),
                  marginTop: Height_convert(27),
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#DEDEDE',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  바디킷 장착
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  400000~500000
                </Text>
              </View>
              <View
                style={{
                  width: Width_convert(333),
                  height: Height_convert(27),
                  marginTop: Height_convert(27),
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#DEDEDE',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  엔진오일 교체
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  20,000
                </Text>
              </View>
              <View
                style={{
                  width: Width_convert(333),
                  height: Height_convert(27),
                  marginTop: Height_convert(27),
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#DEDEDE',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  휠교체
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  30,000
                </Text>
              </View>
              <View
                style={{
                  width: Width_convert(333),
                  height: Height_convert(27),
                  marginTop: Height_convert(27),
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#DEDEDE',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  차량엔진관련
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                  }}>
                  10,000 ~ 1,000,000
                </Text>
              </View>
            </View>
          </View>
          {/*우리가게공임표 끝*/}
          {/*하단 버튼만큼의 공간 띄우기 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(55) + Height_convert(insets.bottom),
            }}></View>
          {/*하단 버튼만큼의 공간 띄우기 끝 */}
        </ScrollView>
        <AnimatedHeader
          navigation={navigation}
          animatedValue={offset}
          scrollValue={scrollValue}></AnimatedHeader>
        {/*스크롤 내리면 버튼 달라붙기 시작*/}
        {scrollValue >=
        (Platform.OS == 'ios'
          ? Width_convert(240 + 89) - Height_convert(94)
          : Width_convert(240 + 89) - Height_convert(94)) ? (
          <View
            style={{
              height: Width_convert(48),
              flexDirection: 'row',
              position: 'absolute',
              top: Height_convert(94),
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}>
            <TouchableOpacity
              //key={item.value}
              activeOpacity={1}
              onPress={() => {
                //PageChangeValue(item.value);
              }}
              style={{
                width: Width_convert(375 / 2),
                height: Width_convert(48),
                borderBottomWidth: 3,
                borderBottomColor: '#000000',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(11),
                  color: '#000000',
                }}>
                사장님 가게소개
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              //key={item.value}
              activeOpacity={1}
              onPress={() => {
                //PageChangeValue(item.value);
              }}
              style={{
                width: Width_convert(375 / 2),
                height: Width_convert(48),
                borderBottomWidth: 3,
                borderBottomColor: '#AAAAAA',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(11),
                  color: '#AAAAAA',
                }}>
                우리가게공임표
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/*스크롤 내리면 버튼 달라붙기 끝*/}
        {/*하단 카카오채팅 전화예약버튼 시작*/}
        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        <View
          style={{
            width: Width_convert(375),
            height: Width_convert(55) + Height_convert(insets.bottom),
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              height: Width_convert(55),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                height: Width_convert(55),
                width: Width_convert(375) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FEE500',
                flexDirection: 'row',
              }}>
              <KakaoTalkLogo
                width={Width_convert(23)}
                height={Width_convert(23)}
                style={{marginRight: Width_convert(6)}}></KakaoTalkLogo>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(15),
                  fontWeight: '700',
                  color: '#391B1B',
                }}>
                카카오 채팅
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                height: Width_convert(55),
                width: Width_convert(375) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#9B6FAB',
                flexDirection: 'row',
              }}>
              <CallLogo style={{marginRight: Width_convert(4.8)}}></CallLogo>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(15),
                  fontWeight: '700',
                  color: '#EEEEEE',
                }}>
                전화예약
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: Height_convert(insets.bottom),
              backgroundColor: '#FFFFFF',
            }}></View>
        </View>
        {/*하단 카카오채팅 전화예약버튼 끝*/}
      </View>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default StoreDetailScreen;
