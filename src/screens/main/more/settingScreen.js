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
const Setting = (props) => {
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
