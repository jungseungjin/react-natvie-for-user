import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import FastImage from 'react-native-fast-image';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import X from '../../../../assets/home/x_black.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
const CostChangeScreen = (props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <View
        style={{height: StatusBarHeight, backgroundColor: '#FFFFFF'}}></View>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View
          style={{
            width: '100%',
            height: Height_convert(94) - StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '25%',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                props.navigation.goBack();
              }}>
              <X fill={'#000000'} style={{marginLeft: Width_convert(22)}}></X>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: Font_normalize(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                color: '#000000',
              }}>
              작업비용이 변동하는 이유?
            </Text>
          </View>
          <View style={{width: '25%'}}></View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}>
          <Text
            style={{
              marginTop: Height_convert(14),
              marginLeft: Width_convert(11),
              marginBottom: Height_convert(9),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(13),
              color: '#000000',
            }}>
            첫번째 예시) 차량트림, 옵션에 따른 경우
          </Text>
          <Image
            style={{width: Width_convert(375), height: Width_convert(179)}}
            source={require('../../../../assets/pic/CostChangeScreen1_X4.jpg')}
            resizeMode={'stretch'}></Image>
          <Image
            style={{width: Width_convert(375), height: Width_convert(183)}}
            source={require('../../../../assets/pic/CostChangeScreen2_X4.jpg')}
            resizeMode={'stretch'}></Image>
          <Text
            style={{
              marginTop: Height_convert(14),
              marginLeft: Width_convert(21),
              marginRight: Width_convert(21),
              marginBottom: Height_convert(20),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(11),
              lineHeight: Font_normalize(14),
              color: '#000000',
            }}>
            아반떼 CN7 경우, 통풍시트 튜닝을 할 경우 ‘자동 공조기’가 있어야만
            가능합니다. 그래서 출고 시 수동 공조기일 경우 자동 공조기 부품까지
            구매해야합니다. 그러므로 차량트림과 옵션 등에 따라 튜닝작업비용이
            변동될 수 있습니다.
          </Text>
          <View
            style={{
              width: Width_convert(375),
              borderBottomColor: '#DBDBDB',
              borderBottomWidth: Height_convert(1),
            }}></View>
          <Text
            style={{
              marginTop: Height_convert(27),
              marginLeft: Width_convert(11),
              marginBottom: Height_convert(8),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(13),
              color: '#000000',
            }}>
            두번째 예시) 기존 차량이 튜닝이 되어있는 경우
          </Text>

          <Image
            style={{width: Width_convert(375), height: Width_convert(253)}}
            source={require('../../../../assets/pic/CostChangeScreen3_X4.jpg')}
            resizeMode={'stretch'}></Image>
          <Text
            style={{
              marginTop: Height_convert(14),
              marginLeft: Width_convert(21),
              marginRight: Width_convert(21),
              marginBottom: Height_convert(20),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(11),
              lineHeight: Font_normalize(14),
              color: '#000000',
            }}>
            {`휠 또는 브레이크 튜닝 경우, 차량에 따라 휠 내부가 좁거나 오프셋을 맞추기 위해 ‘휠 허브스페이스’를 장착하는 상황이 발생하기도 합니다.\n\n이러한 상황에서는 이미 기존에 휠 허브스페이스가 장착된 튜닝차량이라면 휠, 브레이크를 교체하기만 하면 됩니다.\n\n하지만 휠 허브 스페이스가 장착되어있지 않은 차량이라면 추가로 작업이 필요합니다. 그래서 상황에 따라 튜닝작업비용이 변동될 수 있습니다.`}
          </Text>
          <View
            style={{
              width: Width_convert(375),
              borderBottomColor: '#DBDBDB',
              borderBottomWidth: Height_convert(1),
            }}></View>

          <Text
            style={{
              marginTop: Height_convert(27),
              marginLeft: Width_convert(11),
              marginBottom: Height_convert(8),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(13),
              color: '#000000',
            }}>
            세번째 예시) 부품가격 변동에 따른 경우
          </Text>

          <Image
            style={{width: Width_convert(375), height: Width_convert(250)}}
            source={require('../../../../assets/pic/CostChangeScreen4_X4.jpg')}
            resizeMode={'stretch'}></Image>
          <Text
            style={{
              marginTop: Height_convert(14),
              marginLeft: Width_convert(21),
              marginRight: Width_convert(21),
              marginBottom: Height_convert(20),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(11),
              lineHeight: Font_normalize(14),
              color: '#000000',
            }}>
            부품 가격은 고정되어있지 않고 심지어 계절 변동성에 따라 변하기도
            합니다. 따라서 자동차, 부품 회사의 가격책정 등 여러 상황 등에 변동될
            수 있기 때문에 튜닝작업비용이 오히려 감소할 수도 증가할 수도
            있습니다.
          </Text>
          <View style={{height: Height_convert(50)}}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CostChangeScreen;
