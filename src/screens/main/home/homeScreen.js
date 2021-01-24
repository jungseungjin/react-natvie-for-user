import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  NativeModules,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Width_convert.js';
import {Fonts} from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Swiper from 'react-native-swiper';
import Width_convert from '../../../components/Width_convert';
const {StatusBarManager} = NativeModules;
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import BraketUp from '../../../../assets/home/braket_up.svg';
import BraketDown from '../../../../assets/home/braket_down.svg';
import Vertical_bar from '../../../../assets/home/vertical_bar.svg';
const HomeScreen = ({navigation, route}) => {
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusBar, setStatusBar] = React.useState(0);
  const [showInformation, setShowInformation] = React.useState(false);

  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollToEnd({
      animated: true,
    });
  };

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
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          <View
            style={{
              height: Height_convert(94) - statusBar,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.Swagger || null,
                fontSize: Font_normalize(24),
                color: 'black',
                textAlign: 'center',
              }}>
              투닝
            </Text>
          </View>
          <Swiper
            style={{height: Height_convert(211)}}
            autoplay={true}
            autoplayTimeout={4.5}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(198,198,198,.7)',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: -13,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: -13,
                }}
              />
            }>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#9DD6EB',
                width: Width_convert(375),
                height: Height_convert(211),
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../../../assets/pic/Rectangle300.png')}></Image>
            </View>
            <View style={styles.slide1}>
              <Text>Hello Swiper1</Text>
            </View>
            <View style={styles.slide2}>
              <Text>Hello Swiper2</Text>
            </View>
          </Swiper>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(313),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
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
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(36),
                    height: Height_convert(18),
                    borderColor: '#A3A3A3',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    borderRadius: 3,
                    marginRight: Width_convert(8),
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000', //그림자색
                    shadowOpacity: 0.2, //그림자 투명도
                    shadowOffset: {width: 0.5, height: 0.5}, //그림자 위치
                    //ANDROID
                    elevation: 5,
                  }}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: 'rgba(125, 125, 125,0.72)',
                    }}>
                    설정
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    height: Height_convert(18),
                    backgroundColor: '#A3A3A3',
                    borderColor: '#A3A3A3',
                    borderRadius: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#FFFFFF',
                      paddingBottom: Height_convert(4),
                      paddingTop: Height_convert(4),
                      paddingLeft: Width_convert(7),
                      paddingRight: Width_convert(7),
                    }}>
                    차량선택 / 지역설정
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(74),
                    borderColor: '#F0F0F0',
                    borderRadius: 5,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000', //그림자색
                    shadowOpacity: 0.3, //그림자 투명도
                    shadowOffset: {width: 2, height: 2}, //그림자 위치
                    //ANDROID
                    elevation: 5,
                  }}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(13),
                      fontWeight: '700',
                      marginTop: Height_convert(7),
                      marginBottom: Height_convert(6),
                      color: '#000000',
                    }}>
                    드레스업
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    내 차의 외장을 꾸미고 싶을 때
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(74),
                    borderColor: '#F0F0F0',
                    borderRadius: 5,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000', //그림자색
                    shadowOpacity: 0.3, //그림자 투명도
                    shadowOffset: {width: 2, height: 2}, //그림자 위치
                    //ANDROID
                    elevation: 5,
                  }}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(13),
                      fontWeight: '700',
                      marginTop: Height_convert(7),
                      marginBottom: Height_convert(6),
                      color: '#000000',
                    }}>
                    퍼포먼스
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    내 차의 성능을 높이고 싶을 때
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(74),
                    borderColor: '#F0F0F0',
                    borderRadius: 5,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000', //그림자색
                    shadowOpacity: 0.3, //그림자 투명도
                    shadowOffset: {width: 2, height: 2}, //그림자 위치
                    //ANDROID
                    elevation: 5,
                  }}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(13),
                      fontWeight: '700',
                      marginTop: Height_convert(7),
                      marginBottom: Height_convert(6),
                      color: '#000000',
                    }}>
                    편의장치
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    내 차의 풍부한 옵션이 필요할 때
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(74),
                    borderColor: '#F0F0F0',
                    borderRadius: 5,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000000', //그림자색
                    shadowOpacity: 0.3, //그림자 투명도
                    shadowOffset: {width: 2, height: 2}, //그림자 위치
                    //ANDROID
                    elevation: 5,
                  }}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(13),
                      fontWeight: '700',
                      marginTop: Height_convert(7),
                      marginBottom: Height_convert(6),
                      color: '#000000',
                    }}>
                    캠핑카 튜닝
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    캠핑을 위한 튜닝을 하고 싶을 때
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(36),
                marginTop: Height_convert(27),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(36),
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderRadius: 5,
                  borderColor: '#F1F1F1',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  backgroundColor: '#F1F1F1',
                }}>
                <TextInput
                  style={{
                    width: Width_convert(337),
                    height: Height_convert(36),
                    marginLeft: Width_convert(11),
                    fontSize: Font_normalize(12),
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                  }}
                  placeholderTextColor="#A1A1A1"
                  placeholder={'튜닝부품 or 작업, 튜닝샵 검색'}></TextInput>
              </View>
            </View>
          </View>

          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(370),
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
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
                    color: '#000000',
                  }}>
                  사장님의 작업영상
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      color: '#946AEF',
                      fontSize: Font_normalize(10),
                    }}>
                    더보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: Height_convert(16),
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    width: Width_convert(304),
                    height: Height_convert(266),
                    marginRight: Width_convert(9),
                    marginLeft: Width_convert(19),
                  }}>
                  <Image
                    style={{
                      width: Width_convert(304),
                      height: Height_convert(171),
                      borderRadius: 6,
                    }}
                    source={require('../../../../assets/pic/Rectangle302.png')}></Image>
                  <View
                    style={{
                      heigt: Height_convert(36),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(13),
                        marginTop: Height_convert(11),
                        color: '#000000',
                        lineHeight: Height_convert(17),
                      }}>
                      너도나도 같은 배기음 16:9? 소리박 제품은 달라! 소리나 한번
                      들어보고 가슈
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Height_convert(10),
                      alignItems: 'center',
                    }}>
                    <FastImage
                      style={{
                        width: Width_convert(16),
                        height: Width_convert(16),
                        borderRadius: 16,
                        marginRight: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                      }}>
                      모토리 튜닝샵
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: Width_convert(304),
                    height: Height_convert(232),
                    marginRight: Width_convert(9),
                  }}>
                  <FastImage
                    style={{
                      width: Width_convert(304),
                      height: Height_convert(180),
                      borderRadius: 6,
                    }}
                    source={{
                      uri: 'https://unsplash.it/400/400?image=1',
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(13),
                      marginTop: Height_convert(11),
                      color: '#000000',
                    }}>
                    너도나도 같은 배기음 16:9.5? 소리박 제품은 달라! 소리나 한번
                    들어보고 가슈
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Height_convert(6),
                      alignItems: 'center',
                    }}>
                    <FastImage
                      style={{
                        width: Width_convert(16),
                        height: Width_convert(16),
                        borderRadius: 16,
                        marginRight: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                      }}>
                      모토리 튜닝샵
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: Width_convert(304),
                    height: Height_convert(232),
                    marginRight: Width_convert(9),
                  }}>
                  <FastImage
                    style={{
                      width: Width_convert(304),
                      height: Height_convert(190),
                      borderRadius: 6,
                    }}
                    source={{
                      uri: 'https://unsplash.it/400/400?image=1',
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(13),
                      marginTop: Height_convert(11),
                      color: '#000000',
                    }}>
                    너도나도 같은 배기음 16:10? 소리박 제품은 달라! 소리나 한번
                    들어보고 가슈
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Height_convert(6),
                      alignItems: 'center',
                    }}>
                    <FastImage
                      style={{
                        width: Width_convert(16),
                        height: Width_convert(16),
                        borderRadius: 16,
                        marginRight: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                      }}>
                      모토리 튜닝샵
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(315),
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
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
                    color: '#000000',
                  }}>
                  최근 본 작업
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    alert('gd');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      color: '#946AEF',
                      fontSize: Font_normalize(10),
                    }}>
                    더보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                width: Width_convert(375),
                height: Height_convert(185),
                marginTop: Height_convert(16),
              }}>
              <View
                style={{
                  width: Width_convert(160),
                  height: Height_convert(185),
                  marginRight: Width_convert(11),
                  marginLeft: Width_convert(19),
                }}>
                <Image
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(90),
                    borderRadius: 6,
                  }}
                  source={require('../../../../assets/pic/Rectangle316.png')}></Image>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                    marginTop: Height_convert(11),
                  }}>
                  아우디 Q7 ABTLINE 바디킷
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(1),
                    marginTop: Height_convert(5),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                      marginRight: Width_convert(6),
                    }}>
                    튜닝개러지
                  </Text>
                  <Star
                    style={{
                      width: Width_convert(8),
                      height: Height_convert(8),
                      marginRight: Width_convert(3),
                    }}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                      marginRight: Width_convert(4),
                    }}>
                    4.8
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                    }}>
                    후기 10
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: Height_convert(5),
                    marginLeft: Width_convert(1),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#000000',
                  }}>
                  주소 : 서울특별시 강남구 청담동
                </Text>
                <View
                  style={{
                    marginTop: Height_convert(19),
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(13),
                      color: '#FF5858',
                    }}>
                    2,350,000원
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: Width_convert(160),
                  height: Height_convert(185),
                  marginRight: Width_convert(11),
                }}>
                <FastImage
                  style={{
                    width: Width_convert(160),
                    height: Width_convert(90),
                    borderRadius: 6,
                  }}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                    marginTop: Height_convert(11),
                  }}>
                  아우디 Q7 ABTLINE 바디킷
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(1),
                    marginTop: Height_convert(5),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                      marginRight: Width_convert(6),
                    }}>
                    튜닝개러지
                  </Text>
                  <Star
                    style={{
                      width: Width_convert(8),
                      height: Height_convert(8),
                      marginRight: Width_convert(3),
                    }}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                      marginRight: Width_convert(4),
                    }}>
                    4.8
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                    }}>
                    후기 10
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: Height_convert(5),
                    marginLeft: Width_convert(1),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#000000',
                  }}>
                  주소 : 서울특별시 강남구 청담동
                </Text>
                <View
                  style={{
                    marginTop: Height_convert(19),
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(13),
                      color: '#FF5858',
                    }}>
                    2,350,000원
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: Width_convert(160),
                  height: Height_convert(185),
                  marginRight: Width_convert(11),
                }}>
                <FastImage
                  style={{
                    width: Width_convert(160),
                    height: Width_convert(90),
                    borderRadius: 6,
                  }}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(12),
                    color: '#000000',
                    marginTop: Height_convert(11),
                  }}>
                  아우디 Q7 ABTLINE 바디킷
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Width_convert(1),
                    marginTop: Height_convert(5),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                      marginRight: Width_convert(6),
                    }}>
                    튜닝개러지
                  </Text>
                  <Star
                    style={{
                      width: Width_convert(8),
                      height: Height_convert(8),
                      marginRight: Width_convert(3),
                    }}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                      marginRight: Width_convert(4),
                    }}>
                    4.8
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(9),
                      color: '#000000',
                    }}>
                    후기 10
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: Height_convert(5),
                    marginLeft: Width_convert(1),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#000000',
                  }}>
                  주소 : 서울특별시 강남구 청담동
                </Text>
                <View
                  style={{
                    marginTop: Height_convert(19),
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(13),
                      color: '#FF5858',
                    }}>
                    2,350,000원
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(155),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}
            //{showInformation ? {height : Height_convert(216)} : {height :Height_convert(155)}}
          >
            <View
              style={{
                marginLeft: Width_convert(12),
                marginTop: Height_convert(11),
                width: Width_convert(351),
                height: Height_convert(144),
                //{showInformation ? {height : Height_convert(205)} : {height :Height_convert(144)}}
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (!showInformation) {
                    handleClick();
                  }
                  setShowInformation(!showInformation);
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
                <View>
                  <View
                    style={{
                      marginTop: Height_convert(7),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                        marginRight: Width_convert(6),
                      }}>
                      대표이사 백준열
                    </Text>
                    <Vertical_bar
                      style={{
                        marginRight: Width_convert(6),
                      }}></Vertical_bar>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                        marginRight: Width_convert(6),
                      }}>
                      사업자등록번호 123-45-67891
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: Height_convert(3),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                      }}>
                      주소 광주광역시 북구 용봉로300{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: Height_convert(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                        marginRight: Width_convert(6),
                      }}>
                      전화번호 1234-5678
                    </Text>
                    <Vertical_bar
                      style={{
                        marginRight: Width_convert(6),
                      }}></Vertical_bar>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                      }}>
                      메일 abc@motory.com
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: Height_convert(3),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                        marginRight: Width_convert(6),
                      }}>
                      통신판매업 광주 북구-1111
                    </Text>
                    <Vertical_bar
                      style={{
                        marginRight: Width_convert(6),
                      }}></Vertical_bar>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(8),
                        color: '#7A7A7A',
                      }}>
                      호스팅서비스제공자 모토리
                    </Text>
                  </View>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Height_convert(9),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#7A7A7A',
                    marginRight: Width_convert(8),
                  }}>
                  이용약관
                </Text>
                <Vertical_bar
                  style={{
                    marginRight: Width_convert(6),
                  }}></Vertical_bar>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#7A7A7A',
                    marginRight: Width_convert(8),
                  }}>
                  사업자정보확인
                </Text>
                <Vertical_bar
                  style={{
                    marginRight: Width_convert(6),
                  }}></Vertical_bar>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#3F3F3F',
                  }}>
                  개인정보처리방침
                </Text>
              </View>
              <View
                style={{
                  marginTop: Height_convert(9),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(7),
                    color: '#7A7A7A',
                  }}>
                  투닝은 통신판매중개자로서 통신판매의 당사자가 아닙니다. 가게의
                  예약, 환불 등과 관련된 책임을 지지 않습니다.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
const styles = StyleSheet.create({
  swiper: {},
  slide0: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
});
export default HomeScreen;
