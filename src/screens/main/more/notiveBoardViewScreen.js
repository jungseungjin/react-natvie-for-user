import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const NoticeBoardViewScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}></SafeAreaView>
      <Tabbar
        left={'back'}
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
        {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
          <IsLoading></IsLoading>
        ) : isLoadingAndModal === 2 ? (
          <NetworkErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NetworkErrModal>
        ) : isLoadingAndModal === 3 ? (
          <NormalErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NormalErrModal>
        ) : null}
      </View>
    </>
  );
};

export default NoticeBoardViewScreen;
