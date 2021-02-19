import React from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SettingOn from '../../../../assets/home/setting_on.svg';
import SettingOff from '../../../../assets/home/setting_off.svg';
import {useSelector} from 'react-redux';
const Setting = (props) => {
  const reduexState = useSelector((state) => state);
  //로그인된 상태면 로그인정보로 설정값 가져오기
  //로그인 안된상태면 디바이스정보로 설정값 가져오기
  //현재버전과 DB상의 버전을 비교해서 최신으로 안내
  //여기 알림도 퍼미션이 꺼져있으면 모두 비활성화,
  //퍼미션이 꺼져있고 알림 비활성화에서 알림켜면 설정으로가서 설정할수있게한다음 설정이 되어야 활성화로 가능
  //퍼미션이 꺼져있으면 알림 비활성화 기본
  //퍼미션이 켜져있고 알림 비활성화에서 알림켜면 켜지기
  //퍼미션이 켜져있으면 알림 활성화가 기본 알림 끄면 꺼지기

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'설정'} navigation={props.navigation}></Tabbar>
      <View style={{width: Width_convert(375), marginTop: Height_convert(20)}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(314),
              height: Width_convert(64),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: Width_convert(30),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              내게시물 댓글 알림
            </Text>
            <SettingOn></SettingOn>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(314),
              height: Width_convert(64),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: Width_convert(30),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              공지사항 알림
            </Text>
            <SettingOff></SettingOff>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#EEEEEE'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(314),
              height: Width_convert(64),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: Width_convert(30),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              현재 버전
            </Text>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              1.0.0
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
