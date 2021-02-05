import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x_black.svg';
import Place_check from '../../../../assets/home/place_check';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
const MapScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height: Height_convert(88) - StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              marginLeft: Width_convert(22),
              marginRight: Width_convert(15),
              width: Width_convert(14),
              height: Height_convert(16),
            }}>
            <X></X>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Font_normalize(16),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              color: '#000000',
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            주소검색
          </Text>
          <View
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(22),
              width: Width_convert(20),
              height: Height_convert(20),
            }}></View>
        </View>
        <View
          style={{
            height: Height_convert(88) - statusBar,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: 'rgba(219,219,219,0.35)',
            borderBottomWidth: 1,
          }}>
          <TextInput
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            keyboardType="default"
            onChangeText={() => {}}
            returnKeyType={'search'}
            onSubmitEditing={() => {}}
            style={{
              width: Width_convert(280),
              fontSize: Font_normalize(16),
              marginLeft: Width_convert(22),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              paddingTop: 0,
              paddingBottom: 0,
            }}
            placeholderTextColor="#A1A1A1"
            placeholder={'읍 면 동으로 간편하게 검색해주세요'}
            //onKeyPress={this.handleKeyDown}
            // /handleKeyDown: function(e) {
            //   if(e.nativeEvent.key == "Enter"){
            //     dismissKeyboard();
            // }
          ></TextInput>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(22),
              width: Width_convert(20),
              height: Height_convert(20),
            }}>
            <Search></Search>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(642) + 2 * statusBar,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.Swagger || null,
              fontSize: Font_normalize(20),
              color: '#B4B4B4',
              textAlign: 'center',
            }}>
            고객님이 튜닝작업 받기 원하시는 지역을 검색해주세요
          </Text>
        </View>
        <ScrollView style={{flex: 1}}>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: Width_convert(15),
              }}>
              <Place_check
                style={{marginRight: Width_convert(12)}}></Place_check>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                광주광역시 북구 용봉동
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    //borderBottomColor: 'rgba(219,219,219,1)',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
});
export default MapScreen;
