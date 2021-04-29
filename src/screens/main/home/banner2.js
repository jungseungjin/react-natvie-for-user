import React from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import X from '../../../../assets/home/x_black.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Width_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar';
import FastImage from 'react-native-fast-image';
import Fonts from '../../../components/Fonts';
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000', //그림자색
    shadowOpacity: 0.5, //그림자 투명도
    shadowOffset: {width: 2, height: 2}, //그림자 위치
    //ANDROID
    elevation: 10,
  },
  text1: {
    marginTop: Height_convert(55),
    fontFamily: Fonts.NanumSqureRegular,
    fontWeight: '700',
    fontSize: Font_normalize(13),
    textAlign: 'center',
    color: '#000000',
  },
  dot: {
    marginTop: Height_convert(22),
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
});

const Banner2 = (props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Tabbar
          Title={'튜닝문화 성장을 위한 후기'}
          left={'X'}
          navigation={props.navigation}></Tabbar>
        <ScrollView
          style={{flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(678),
              backgroundColor: '#FFFFFF',
              ...styles.shadow,
            }}>
            <Text
              style={{
                marginTop: Height_convert(76),
                ...styles.text1,
              }}>
              신차 출고하는데 틴팅, PPF 실력 좋은 업체가 어디 있을까?
            </Text>
            <Text style={styles.text1}>
              이번 여름에 통풍시트를 장착하고 싶은데 어디서 해야하지?
            </Text>
            <Text style={styles.text1}>
              나와 같은 차량을 타는 오너들은 튜닝을 어디에서 했을까?
            </Text>
            <View style={{alignItems: 'center'}}>
              <View
                style={[styles.dot, {marginTop: Height_convert(54)}]}></View>
              <View style={styles.dot}></View>
              <View style={styles.dot}></View>
            </View>
            <Text
              style={{
                marginTop: Height_convert(54),
                fontFamily: Fonts.NanumSquareExtraBold,
                fontSize: Font_normalize(23),
                lineHeight: Font_normalize(25),
                textAlign: 'center',
                color: '#000000',
              }}>
              튜닝을 생각한 사람이라면{'\n'}한번쯤 고민하는 문제
            </Text>
            <FastImage
              style={{
                marginTop: 'auto',
                marginBottom: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: Width_convert(116),
                height: Height_convert(183),
              }}
              source={{
                uri:
                  'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/2_1.jpg',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(1982),
              backgroundColor: '#BEB2B2',
            }}>
            <View
              style={{
                marginTop: Height_convert(122),
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginTop: -Height_convert(10),
                  fontFamily: Fonts.NanumSquareExtraBold,
                  fontStyle: 'italic',
                  fontSize: Font_normalize(26),
                  color: '#FFFFFF',
                }}>
                "
              </Text>
              <Text
                style={{
                  marginRight: Height_convert(5),
                  fontFamily: Fonts.NanumSqureRegular,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  lineHeight: Font_normalize(20),
                  textAlign: 'center',
                  color: '#FFFFFF',
                }}>
                나누면 나눌수록 튜닝문화는{'\n'}더욱 올바른 방향으로 나아갑니다.
              </Text>
              <Text
                style={{
                  marginTop: Height_convert(30),
                  fontFamily: Fonts.NanumSquareExtraBold,
                  fontStyle: 'italic',
                  fontSize: Font_normalize(26),
                  color: '#FFFFFF',
                }}>
                "
              </Text>
            </View>
            <Text
              style={{
                marginTop: Height_convert(87),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '700',
                fontSize: Font_normalize(20),
                lineHeight: Font_normalize(23),
                color: '#FFFFFF',
                textAlign: 'center',
              }}>
              투닝에 후기 작성하는
            </Text>
            <Text
              style={{
                marginTop: Height_convert(6),
                fontFamily: Fonts.NanumSquareExtraBold,
                fontSize: Font_normalize(31),
                lineHeight: Font_normalize(36),
                color: '#FFFFFF',
                textAlign: 'center',
              }}>
              정말 쉬운 방법
            </Text>
            <View>
              {step(
                0,
                '01.',
                `홈화면 카테고리별 검색/검색창 통한\n튜닝작업 or 튜닝업체 검색`,
              )}
              <FastImage
                style={{
                  marginTop: Height_convert(21),
                  marginBottom: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: Width_convert(289),
                  height: Height_convert(193),
                }}
                source={{
                  uri:
                    'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/2_2.png',
                  //headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}></FastImage>
            </View>
            <View>
              {step(1, '02.', `튜닝 작업에 들어간 페이지의\n후기 버튼을 클릭`)}
              <Text
                style={{
                  marginTop: Height_convert(16),
                  fontFamily: Fonts.NanumSqureRegular,
                  fontWeight: '700',
                  fontSize: Font_normalize(9),
                  lineHeight: Font_normalize(12),
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                + 업체로 검색시, 해당 업체로 이동하여 오른쪽의 작업메뉴 버튼을
                {'\n'}클릭 후 나오는 작업목록으로 찾기 가능
              </Text>
              <FastImage
                style={{
                  marginTop: Height_convert(21),
                  marginBottom: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: Width_convert(289),
                  height: Height_convert(292),
                }}
                source={{
                  uri:
                    'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/2_3.png',
                  //headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}></FastImage>
            </View>
            <View>
              {step(2, '03.', `후기 페이지 오른쪽 하단의 작성 버튼 클릭`)}
              <FastImage
                style={{
                  marginTop: Height_convert(21),
                  marginBottom: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: Width_convert(295),
                  height: Height_convert(292),
                }}
                source={{
                  uri:
                    'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/2_4.png',
                  //headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}></FastImage>
            </View>
            <View>
              {step(3, '04.', `여러분의 생생한 튜닝경험 후기를 작성!`)}
              <FastImage
                style={{
                  marginTop: Height_convert(21),
                  marginBottom: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: Width_convert(289),
                  height: Height_convert(193),
                }}
                source={{
                  uri:
                    'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/2_6.png',
                  //headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}></FastImage>
            </View>
            <View style={{alignItems: 'center', marginTop: Height_convert(67)}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('SignUp');
                }}
                activeOpacity={1}
                style={{
                  width: Width_convert(167),
                  height: Width_convert(44),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: '#FFFFFF',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.NanumSquareExtraBold,
                    fontSize: Font_normalize(14),
                    lineHeight: Font_normalize(16),
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                  회원가입 하러가기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(35),
            }}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const step = (index, number, contents) => {
  return (
    <View>
      <Text
        style={{
          marginTop: index === 0 ? Height_convert(49) : Height_convert(58),
          fontFamily: Fonts.NanumSquareExtraBold,
          fontSize: Font_normalize(12),
          lineHeight: Font_normalize(14),
          color: '#F9CF3D',
          textAlign: 'center',
        }}>
        {number}
      </Text>
      <Text
        style={{
          marginTop: Height_convert(7),
          fontFamily: Fonts.NanumSqureRegular,
          fontWeight: '700',
          fontSize: Font_normalize(13),
          lineHeight: Font_normalize(15),
          color: '#FFFFFF',
          textAlign: 'center',
        }}>
        {contents}
      </Text>
    </View>
  );
};
export default Banner2;
