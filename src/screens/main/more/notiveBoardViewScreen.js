import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
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
              {props.route.params.item.title}
            </Text>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(10),
                fontWeight: '400',
                color: '#000000',
              }}>
              {moment(props.route.params.item.regDate).format(
                'YYYY년 MM월 DD일',
              )}
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
              {props.route.params.item.contents}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NoticeBoardViewScreen;
