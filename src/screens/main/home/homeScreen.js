import React from 'react';
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
import Height_convert from '../../../components/Height_convert.js';
import {Fonts} from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Swiper from 'react-native-swiper';
import Width_convert from '../../../components/Width_convert';
const {StatusBarManager} = NativeModules;
const HomeScreen = ({navigation, route}) => {
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusBar, setStatusBar] = React.useState(0);

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
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollView>
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
                  marginBottom: 0,
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
                  marginBottom: 0,
                }}
              />
            }>
            <View style={styles.slide0}>
              <Text>Hello Swiper0</Text>
            </View>
            <View style={styles.slide1}>
              <Text>Hello Swiper1</Text>
            </View>
            <View style={styles.slide2}>
              <Text>Hello Swiper2</Text>
            </View>
            <View style={styles.slide3}>
              <Text>Hello Swiper3</Text>
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
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
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
                height: Height_convert(69),
                marginTop: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(69),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(69),
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
                      marginBottom: Height_convert(6),
                    }}>
                    드레스업
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                    }}>
                    내 차의 외장을 꾸미고 싶을 때
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(69),
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
                      marginBottom: Height_convert(6),
                    }}>
                    퍼포먼스
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                    }}>
                    내 차의 성능을 높이고 싶을 때
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(69),
                marginTop: Height_convert(12),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(69),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(69),
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
                      marginBottom: Height_convert(6),
                    }}>
                    편의장치
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
                    }}>
                    내 차의 풍부한 옵션이 필요할 때
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(160),
                    height: Height_convert(69),
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
                      marginBottom: Height_convert(6),
                    }}>
                    캠핑카 튜닝
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '400',
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
                  placeholder={'튜닝부품or작업, 튜닝샵 검색'}></TextInput>
              </View>
            </View>
          </View>

          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(336),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginTop: Height_convert(32),
                width: Width_convert(375),
                height: Height_convert(18),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(18),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
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
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(226),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginTop: Height_convert(32),
                width: Width_convert(375),
                height: Height_convert(18),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(18),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
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
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(155),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}></View>
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
