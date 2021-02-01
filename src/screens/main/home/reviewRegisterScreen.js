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
import PicktureNestedPlus from '../../../../assets/home/pickture_nestedPlus.svg';
import IsLoading from '../../../components/ActivityIndicator';
import {TextInput} from 'react-native-gesture-handler';
const {StatusBarManager} = NativeModules;
const ReviewRegister = ({navigation, Page}) => {
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
              : '후기작성'
          }
          navigation={navigation}></Tabbar>
        {/*  작업명, 샵이름, 별점 시작 */}
        <View style={{alignItems: 'center', width: Width_convert(375)}}>
          <View>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(16),
                color: '#000000',
              }}>
              기아 쏘렌토 제스트 바디킷
            </Text>
            <Text
              style={{
                textAlign: 'right',
                marginTop: Height_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(10),
                color: '#000000',
              }}>
              MOTION튜닝샵
            </Text>
          </View>
          <View
            style={{
              marginTop: Height_convert(14),
              flexDirection: 'row',
            }}>
            <Star
              width={Width_convert(20)}
              height={Height_convert(20)}
              style={{marginRight: Width_convert(7)}}></Star>
            <Star
              width={Width_convert(20)}
              height={Height_convert(20)}
              style={{marginRight: Width_convert(7)}}></Star>
            <Star
              width={Width_convert(20)}
              height={Height_convert(20)}
              style={{marginRight: Width_convert(7)}}></Star>
            <Star
              width={Width_convert(20)}
              height={Height_convert(20)}
              style={{marginRight: Width_convert(7)}}></Star>
            <Star
              width={Width_convert(20)}
              height={Height_convert(20)}
              style={{marginRight: Width_convert(7)}}></Star>
          </View>
        </View>

        {/*  작업명, 샵이름, 별점 끝 */}
        <View
          style={{
            marginTop: Height_convert(17),
            width: Width_convert(375),
            height: Width_convert(479),
            alignItems: 'center',
          }}>
          {/*후기 글작성 시작 */}
          <View
            style={{
              width: Width_convert(339),
              height: Width_convert(391),
              borderBottomWidth: 1,
              borderBottomColor: '#BFBFBF',
              borderTopWidth: 1,
              borderTopColor: '#BFBFBF',
              borderLeftWidth: 1,
              borderLeftColor: '#BFBFBF',
              borderRightWidth: 1,
              borderRightColor: '#BFBFBF',
            }}>
            <TextInput></TextInput>
          </View>
          {/*후기 글작성 끝 */}
          {/* 하단 사진추가버튼 시작 */}
          <View
            style={{
              width: Width_convert(339),
              height: Width_convert(71),
              marginTop: Height_convert(17),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: Width_convert(71),
                height: Width_convert(71),
                marginRight: Width_convert(18),
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                borderTopWidth: 1,
                borderTopColor: '#BFBFBF',
                borderLeftWidth: 1,
                borderLeftColor: '#BFBFBF',
                borderRightWidth: 1,
                borderRightColor: '#BFBFBF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PicktureNestedPlus></PicktureNestedPlus>
            </View>
            <View
              style={{
                width: Width_convert(71),
                height: Width_convert(71),
                marginRight: Width_convert(18),
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                borderTopWidth: 1,
                borderTopColor: '#BFBFBF',
                borderLeftWidth: 1,
                borderLeftColor: '#BFBFBF',
                borderRightWidth: 1,
                borderRightColor: '#BFBFBF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PicktureNestedPlus></PicktureNestedPlus>
            </View>
            <View
              style={{
                width: Width_convert(71),
                height: Width_convert(71),
                marginRight: Width_convert(18),
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                borderTopWidth: 1,
                borderTopColor: '#BFBFBF',
                borderLeftWidth: 1,
                borderLeftColor: '#BFBFBF',
                borderRightWidth: 1,
                borderRightColor: '#BFBFBF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PicktureNestedPlus></PicktureNestedPlus>
            </View>
            <View
              style={{
                width: Width_convert(71),
                height: Width_convert(71),
                marginRight: Width_convert(18),
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
                borderTopWidth: 1,
                borderTopColor: '#BFBFBF',
                borderLeftWidth: 1,
                borderLeftColor: '#BFBFBF',
                borderRightWidth: 1,
                borderRightColor: '#BFBFBF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PicktureNestedPlus></PicktureNestedPlus>
            </View>
          </View>
          {/* 하단 사진추가버튼 끝 */}
          <View
            style={{
              marginTop: Height_convert(30),
              width: Width_convert(375),
              height: Width_convert(46),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: Width_convert(339),
                height: Width_convert(46),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(5),
                backgroundColor: '#946AEF',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(16),
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}>
                작성완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default ReviewRegister;
