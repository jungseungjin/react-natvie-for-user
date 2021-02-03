import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const NoticeBoardViewScreen = (props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}></SafeAreaView>
      <Tabbar
        Title={'공지사항 및 이벤트 보기'}
        navigation={props.navigation}></Tabbar>
      <View
        style={{
          width: Width_convert(375),
          height: Height_convert(812),
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(93),
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginLeft: Width_convert(17),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              2020년 7월 31일 업데이트 내용공지
            </Text>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(10),
                fontWeight: '400',
                color: '#000000',
              }}>
              2020년 7월 31일
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{minHeight: Height_convert(812)}}>
          <View
            style={{
              width: Width_convert(327),
              marginLeft: Width_convert(17),
              marginRight: Width_convert(31),
              marginTop: Height_convert(20),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(13),
                color: '#000000',
              }}>
              안녕하세요. 튜닝의순정입니다. 아무래도 저희가 서비스를 시작한지
              얼마되지 않다보니 오류들이 조금씩 발견되고 있습니다. 사장님들께
              불편드리지 않기 위해 실시간으로 모니터링을 통해 최대한 빠른 복구를
              할 수 있도록 노력하고 있습니다.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NoticeBoardViewScreen;
