import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CallLogo from '../../../../assets/home/CallLogo.svg';
import KakaoTalkLogo from '../../../../assets/home/KakaoTalkLogo.svg';

const CustomerServiceScreen = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'고객센터'} navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(1),
            borderTopWidth: 1,
            borderTopColor: '#DBDBDB',
          }}></View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: Width_convert(375),
            height: Height_convert(812),
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: Width_convert(375),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('FrequentlyQuestion');
              }}
              style={{
                marginTop: Width_convert(43),
                width: Width_convert(281),
                height: Width_convert(139),
                borderRadius: Font_normalize(5),
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Swagger || null,
                  fontSize: Font_normalize(48),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                자주 묻는 질문
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('OneOnOne');
              }}
              style={{
                marginTop: Width_convert(27),
                width: Width_convert(281),
                height: Width_convert(139),
                borderRadius: Font_normalize(5),
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Swagger || null,
                  fontSize: Font_normalize(48),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                1대1문의
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('Feedback');
              }}
              style={{
                marginTop: Width_convert(27),
                width: Width_convert(281),
                height: Width_convert(139),
                borderRadius: Font_normalize(5),
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(130),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.Swagger || null,
                    fontSize: Font_normalize(24),
                    fontWeight: '400',
                    color: '#000000',
                    textAlign: 'left',
                  }}>
                  투닝에게
                </Text>
              </View>
              <View
                style={{
                  width: Width_convert(157),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.Swagger || null,
                    fontSize: Font_normalize(48),
                    fontWeight: '400',
                    color: '#000000',
                  }}>
                  피드백주기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(375),
              alignItems: 'center',
              marginTop: Height_convert(36),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.Swagger || null,
                fontSize: Font_normalize(20),
                fontWeight: '400',
                color: '#000000',
              }}>
              투닝 고객센터
            </Text>
            <Text
              style={{
                marginTop: Height_convert(9),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#000000',
              }}>
              오전 9시 ~ 오후 6시
            </Text>
          </View>
          <View
            style={{
              marginTop: Height_convert(24),
              width: Width_convert(343),
              height: Height_convert(36),
              marginLeft: Width_convert(16),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                width: Width_convert(163),
                height: Height_convert(36),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(6),
                backgroundColor: '#D9C1ED',
                flexDirection: 'row',
              }}>
              <CallLogo
                fill={'#A1A1A1'}
                style={{marginRight: Width_convert(8)}}></CallLogo>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(11),
                  color: '#000000',
                }}>
                070-0000-0000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                width: Width_convert(163),
                height: Height_convert(36),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(6),
                backgroundColor: '#FDDC3F',
                flexDirection: 'row',
              }}>
              <KakaoTalkLogo
                fill={'#A1A1A1'}
                width={Width_convert(20)}
                height={Width_convert(20)}
                style={{marginRight: Width_convert(8)}}></KakaoTalkLogo>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(11),
                  color: '#000000',
                }}>
                카카오톡 상담
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: Height_convert(insets.bottom || 40),
              backgroundColor: '#FFFFFF',
            }}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CustomerServiceScreen;
