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
});

const Banner1 = (props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Tabbar
          Title={'투닝의 첫걸음'}
          left={'X'}
          navigation={props.navigation}></Tabbar>
        <ScrollView
          style={{flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(725),
              backgroundColor: '#FFFFFF',
            }}>
            <FastImage
              style={{height: Height_convert(725)}}
              source={{
                uri:
                  'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/1_1.png',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(725),
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
            }}>
            <Text
              style={{
                color: '#000000',
                lineHeight: Font_normalize(33),
                fontFamily: Fonts.NanumSquareExtraBold,
                fontSize: Font_normalize(23),
                textAlign: 'center',
              }}>
              투닝은{'\n'}어떻게 만들어졌을까요?
            </Text>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(770),
              backgroundColor: '#FFFFFF',
              ...styles.shadow,
            }}>
            {count('첫째', '자동차 튜닝을 할 때 어떤 생각이 드시나요?')}
            <FastImage
              style={{
                width: Width_convert(339),
                height: Width_convert(243),
                marginTop: Height_convert(10),
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              source={{
                uri:
                  'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/1_2.png',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
            <Text
              style={{
                marginTop: Height_convert(15),
                marginBottom: Height_convert(31),
                marginLeft: Width_convert(30),
                marginRight: Width_convert(30),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                lineHeight: Font_normalize(22),
                color: '#000000',
                textAlign: 'justify',
              }}>
              차량을 출고할 때부터 틴팅, 블랙박스 시공 등 다양한 작업을 합니다.
              뿐만 아니라 중고차를 구매하였을 때는 부족한 기능을 보완하는 등
              많은 분들이 각자의 카 라이프에 맞춰 다양한 튜닝작업을 진행하게
              됩니다.
            </Text>
            <Text
              style={{
                marginBottom: Height_convert(31),
                marginLeft: Width_convert(30),
                marginRight: Width_convert(30),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                lineHeight: Font_normalize(22),
                color: '#000000',
                textAlign: 'justify',
              }}>
              하지만 막상 자동차 튜닝을 하려고 하면 당장 어떤 제품이 있고, 어떤
              업체를 가야할지 막막하기만 하죠. 그렇기 때문에 소비자가 직접
              발품을 팔아야 할 요소가 너무나도 많습니다.
            </Text>
            <Text
              style={{
                marginLeft: Width_convert(30),
                marginRight: Width_convert(30),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                lineHeight: Font_normalize(22),
                color: '#000000',
                textAlign: 'justify',
              }}>
              자동차 튜닝 분야는 다양한 이유로 아직까지 소비자에게 정보 접근이
              쉽지 않습니다. 그래서 저희는 실력있는 사장님들과 투명하고 선별된
              튜닝작업을 소개하여, 자신의 카 라이프에 맞는 자동차 튜닝과 성숙한
              자동차 문화를 즐기는데 도움이 되고자 합니다.
            </Text>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(685),
              backgroundColor: '#F8F8F8',
              ...styles.shadow,
            }}>
            {count('둘째', '투닝만이 가진 특징')}
            <Text
              style={{
                marginTop: Height_convert(40),
                fontFamily: Fonts.NanumSquareExtraBold,
                color: '#000000',
                fontSize: Font_normalize(22),
                lineHeight: Font_normalize(32),
                textAlign: 'center',
              }}>
              이제는 소비자가{'\n'}직접 발품파는 일없이{'\n'}투닝으로 해결
            </Text>
            <Text
              style={{
                marginTop: Height_convert(13),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                color: '#959595',
                fontSize: Font_normalize(11),
                lineHeight: Font_normalize(19),
                textAlign: 'center',
              }}>
              자동차 튜닝정보를 찾기 위해 번거로운 카페 커뮤니티 가입,{'\n'}
              일일이 블로그를 검색할 필요가 없습니다.
            </Text>
            <FastImage
              style={{
                width: Width_convert(201),
                height: Width_convert(346),
                marginTop: 'auto',
                marginBottom: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              source={{
                uri:
                  'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/1_3.png',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(685),
              backgroundColor: '#FFFFFF',
              ...styles.shadow,
            }}>
            <Text
              style={{
                marginTop: Width_convert(172),
                fontFamily: Fonts.NanumSquareExtraBold,
                color: '#000000',
                fontSize: Font_normalize(22),
                lineHeight: Font_normalize(32),
                textAlign: 'center',
              }}>
              나와 같은 차량을 타는{'\n'}소비자가 작성한 튜닝 후기{' '}
            </Text>
            <Text
              style={{
                marginTop: Width_convert(13),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                color: '#959595',
                fontSize: Font_normalize(11),
                lineHeight: Font_normalize(19),
                textAlign: 'center',
              }}>
              내 차가 튜닝을 하면 어떨지 궁금하시나요?{'\n'}해당 튜닝업체의
              작업한 후기를 서로 공유해보세요.
            </Text>
            <FastImage
              style={{
                width: Width_convert(201),
                height: Width_convert(342),
                marginTop: 'auto',
                marginBottom: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              source={{
                uri:
                  'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/1_4.png',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(770),
              backgroundColor: '#F8F8F8',
            }}>
            {count('셋째', '공감하고 상생하는 자동차 튜닝시장으로')}
            <FastImage
              style={{
                width: Width_convert(339),
                height: Width_convert(216),
                marginTop: Width_convert(10),
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              source={{
                uri:
                  'https://motory.s3.ap-northeast-2.amazonaws.com/bannerDetail/1_5.png',
                //headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>

            <Text
              style={{
                marginTop: Width_convert(35),
                fontFamily: Fonts.NanumSquareExtraBold,
                color: '#000000',
                fontSize: Font_normalize(18),
                lineHeight: Font_normalize(26),
                textAlign: 'center',
              }}>
              여러분은 자동차 튜닝이{'\n'}제조산업에 해당하는 것을 아시나요?
            </Text>

            <Text
              style={{
                marginTop: Height_convert(36),
                marginBottom: Height_convert(31),
                marginLeft: Width_convert(30),
                marginRight: Width_convert(30),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                lineHeight: Font_normalize(22),
                color: '#000000',
                textAlign: 'justify',
              }}>
              튜닝은 단순히 차량을 꾸미는 것 뿐만 아니라 친환경 트렌드에 맞춘
              전기차 튜닝, 편리한 자율주행/커넥티드 튜닝, 캠핑을 위한 튜닝 등
              넓은 스펙트럼을 가진 제조산업입니다.
            </Text>
            <Text
              style={{
                marginBottom: Height_convert(31),
                marginLeft: Width_convert(30),
                marginRight: Width_convert(30),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                lineHeight: Font_normalize(22),
                color: '#000000',
                textAlign: 'justify',
              }}>
              튜닝 카테고리에 따라 업체의 전문 분야가 나뉘며, 사장님은
              소비자에게 더 나은 작업을 제공하기 위해 기술과 노하우를 쌓고
              있습니다. 그렇기 때문에 기술의 가치, 어떤 재료를 쓰냐 등에 따라
              같은 튜닝이더라도 차이가 있을 수 있습니다.
            </Text>
            <Text
              style={{
                marginLeft: Width_convert(30),
                marginRight: Width_convert(30),
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                lineHeight: Font_normalize(22),
                color: '#000000',
                textAlign: 'justify',
              }}>
              저희는 신뢰할 수 있고 선별된 튜닝작업을 제공하여 여러분에게
              합리적이고 만족할 수 있는 튜닝환경을 만들어, 서로 웃을 수 있는
              자동차 튜닝시장이 될 수 있도록 노력할 것입니다!
            </Text>
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

const count = (type, text) => {
  return (
    <View
      style={{
        marginTop: Height_convert(73),
        marginLeft: Width_convert(26),
      }}>
      <View>
        <Text
          style={{
            color: '#867CE4',
            lineHeight: Font_normalize(15),
            fontFamily: Fonts.NanumSqureRegular,
            fontWeight: '700',
            fontSize: Font_normalize(12),
            marginLeft: Width_convert(3),
          }}>
          {type}
        </Text>
      </View>
      <View
        style={{
          marginTop: Height_convert(4),
          marginBottom: Height_convert(4),
          height: 1,
          width: Width_convert(71),
          backgroundColor: '#000000',
        }}></View>
      <View>
        <Text
          style={{
            color: '#000000',
            lineHeight: Font_normalize(17),
            fontFamily: Fonts.NanumSquareExtraBold,
            fontSize: Font_normalize(13),
            marginLeft: Width_convert(3),
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};
export default Banner1;
