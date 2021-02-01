import React from 'react';
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

import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import ReviewRegister from '../../../../assets/home/reviewRegister.svg';
import IsLoading from '../../../components/ActivityIndicator';
const {StatusBarManager} = NativeModules;
const ReviewView = ({navigation, Page}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState('MOTION튜닝샵');
  const [statusBar, setStatusBar] = React.useState(0);
  const [scrollValue, setScrollValue] = React.useState(0);

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
        {Platform.OS == 'android' ? (
          <View style={{width: Width_convert(375), height: statusBar}}></View>
        ) : null}
        <Tabbar
          Title={
            page == 'dressup'
              ? '드레스업'
              : page == 'perfomance'
              ? '퍼포먼스'
              : page == 'convenience'
              ? '편의장치'
              : page == 'camping'
              ? '캠핑카'
              : 'MOTION튜닝샵'
          }
          navigation={navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(161 - 94),
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              marginBottom: Height_convert(12),
            }}>
            <Text
              style={{
                marginLeft: Width_convert(19),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(20),
                color: '#000000',
                textAlign: 'right',
                lineHeight: Font_normalize(23),
                marginRight: Width_convert(8),
              }}>
              작업후기{'\n'}37개
            </Text>
          </View>
          <View
            style={{
              marginBottom: Height_convert(12),
            }}>
            <Text
              style={{
                borderRadius: Font_normalize(4),
                overflow: 'hidden',
                backgroundColor: '#FFC187',
                padding: Width_convert(10),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(22),
                color: '#FFFFFF',
              }}>
              4.6
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: Width_convert(375)}}>
          <View
            style={{
              width: Width_convert(375),
              paddingBottom: Height_convert(35),
              borderBottomWidth: 1,
              borderBottomColor: '#EEEEEE',
            }}>
            <View
              style={{
                marginTop: Height_convert(17),
                marginLeft: Width_convert(16),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: Width_convert(34),
                  height: Width_convert(34),
                  marginRight: Width_convert(7),
                }}>
                <FastImage
                  style={{
                    width: Width_convert(34),
                    height: Width_convert(34),
                    borderRadius: Width_convert(34),
                  }}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    광주 검팅어
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(4)}}>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#8D8D8D',
                    }}>
                    1일전
                  </Text>
                </View>
                <View style={{marginTop: Height_convert(8)}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '700',
                      color: '#A1A1A1',
                    }}>
                    G70 카나드콘 립 에어댐
                  </Text>
                </View>
                <View
                  style={{
                    width: Width_convert(265),
                    marginTop: Height_convert(8),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    정말 친절하시고 실력까지 좋은 가게입니다. 다른분들께
                    강력추천드립니다!
                  </Text>
                </View>
                <ScrollView
                  style={{
                    marginTop: Height_convert(21),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>

          <View
            style={{
              width: Width_convert(375),
              paddingBottom: Height_convert(35),
              borderBottomWidth: 1,
              borderBottomColor: '#EEEEEE',
            }}>
            <View
              style={{
                marginTop: Height_convert(17),
                marginLeft: Width_convert(16),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: Width_convert(34),
                  height: Width_convert(34),
                  marginRight: Width_convert(7),
                }}>
                <FastImage
                  style={{
                    width: Width_convert(34),
                    height: Width_convert(34),
                    borderRadius: Width_convert(34),
                  }}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    광주 검팅어
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(4)}}>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#8D8D8D',
                    }}>
                    1일전
                  </Text>
                </View>
                <View style={{marginTop: Height_convert(8)}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '700',
                      color: '#A1A1A1',
                    }}>
                    G70 카나드콘 립 에어댐
                  </Text>
                </View>
                <View
                  style={{
                    width: Width_convert(265),
                    marginTop: Height_convert(8),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    정말 친절하시고 실력까지 좋은 가게입니다. 다른분들께
                    강력추천드립니다!
                  </Text>
                </View>
                <ScrollView
                  style={{
                    marginTop: Height_convert(21),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>

          <View
            style={{
              width: Width_convert(375),
              paddingBottom: Height_convert(35),
              borderBottomWidth: 1,
              borderBottomColor: '#EEEEEE',
            }}>
            <View
              style={{
                marginTop: Height_convert(17),
                marginLeft: Width_convert(16),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: Width_convert(34),
                  height: Width_convert(34),
                  marginRight: Width_convert(7),
                }}>
                <FastImage
                  style={{
                    width: Width_convert(34),
                    height: Width_convert(34),
                    borderRadius: Width_convert(34),
                  }}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    광주 검팅어
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(4)}}>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#8D8D8D',
                    }}>
                    1일전
                  </Text>
                </View>
                <View style={{marginTop: Height_convert(8)}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '700',
                      color: '#A1A1A1',
                    }}>
                    G70 카나드콘 립 에어댐
                  </Text>
                </View>
                <View
                  style={{
                    width: Width_convert(265),
                    marginTop: Height_convert(8),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    정말 친절하시고 실력까지 좋은 가게입니다. 다른분들께
                    강력추천드립니다!
                  </Text>
                </View>
                <ScrollView
                  style={{
                    marginTop: Height_convert(21),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          <View
            style={{
              width: Width_convert(375),
              paddingBottom: Height_convert(35),
              borderBottomWidth: 1,
              borderBottomColor: '#EEEEEE',
            }}>
            <View
              style={{
                marginTop: Height_convert(17),
                marginLeft: Width_convert(16),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: Width_convert(34),
                  height: Width_convert(34),
                  marginRight: Width_convert(7),
                }}>
                <FastImage
                  style={{
                    width: Width_convert(34),
                    height: Width_convert(34),
                    borderRadius: Width_convert(34),
                  }}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}></FastImage>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '700',
                      color: '#000000',
                    }}>
                    광주 검팅어
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: Height_convert(4)}}>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Star
                    width={Width_convert(9)}
                    height={Width_convert(9)}
                    style={{marginRight: Width_convert(4)}}></Star>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(9),
                      color: '#8D8D8D',
                    }}>
                    1일전
                  </Text>
                </View>
                <View style={{marginTop: Height_convert(8)}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(9),
                      fontWeight: '700',
                      color: '#A1A1A1',
                    }}>
                    G70 카나드콘 립 에어댐
                  </Text>
                </View>
                <View
                  style={{
                    width: Width_convert(265),
                    marginTop: Height_convert(8),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    정말 친절하시고 실력까지 좋은 가게입니다. 다른분들께
                    강력추천드립니다!
                  </Text>
                </View>
                <ScrollView
                  style={{
                    marginTop: Height_convert(21),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                  <View style={{marginRight: Width_convert(7)}}>
                    <FastImage
                      style={{
                        width: Width_convert(134),
                        height: Width_convert(88),
                        borderRadius: Width_convert(3),
                      }}
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: Width_convert(48),
            height: Width_convert(48),
            position: 'absolute',
            bottom: Height_convert(72),
            right: Width_convert(14),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('ReviewRegister');
            }}
            style={{
              width: Width_convert(48),
              height: Width_convert(48),
              marginRight: Width_convert(14),
              borderRadius: Width_convert(48),
              backgroundColor: '#946AEF',
              justifyContent: 'center',
              alignItems: 'center',

              shadowColor: '#000000', //그림자색
              shadowOpacity: 0.2, //그림자 투명도
              shadowOffset: {width: 2, height: 2}, //그림자 위치
              //ANDROID
              elevation: 5,
            }}>
            <ReviewRegister
              width={Width_convert(30)}
              height={Width_convert(30)}></ReviewRegister>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default ReviewView;
