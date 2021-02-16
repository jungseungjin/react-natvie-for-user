import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityBase,
} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-gesture-handler';
import Search from '../../../../assets/home/search.svg';

const LocationSetting = (props) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginLeft: Width_convert(18),
          marginRight: Width_convert(18),
          marginTop: Height_convert(45),
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontSize: Font_normalize(14),
            fontWeight: '400',
            color: '#000000',
          }}>
          튜닝샵과의 거리를 측정하여 보다 쉽게 튜닝작업을 할 수 있도록
          도와줍니다
        </Text>
      </View>
      <View
        style={{
          width: Width_convert(375 - 36),
          height: Height_convert(46),
          marginLeft: Width_convert(18),
          marginRight: Width_convert(18),
          marginTop: Height_convert(30),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            width: Width_convert(297),
            height: Width_convert(35),
          }}>
          <TextInput
            placeholder="가게와의 거리를 알기 위한 지역설정이 필요해요"
            placeholderTextColor="#CCCCCC"
            editable={false}
            value={props.pickLocation?.legalcode}
            onChangeText={(value) => {}}
            placeholderStyle={{
              paddingLeft: Width_convert(10),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
              lineHeight: Font_normalize(14),
            }}
            style={{
              height: Width_convert(40),
              paddingLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
              lineHeight: Font_normalize(14),
            }}></TextInput>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate('MapSearch', {
              PickBrandValue: props.PickBrandValue,
              PickModelValue: props.PickModelValue,
              PickModelDetail: props.PickModelDetail,
            });
          }}
          style={{
            marginLeft: Width_convert(7),
            marginRight: Width_convert(18),
            width: Width_convert(35),
            height: Width_convert(35),
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomColor: '#CCCCCC',
            borderTopColor: '#CCCCCC',
            borderLeftColor: '#CCCCCC',
            borderRightColor: '#CCCCCC',
            borderRadius: Font_normalize(3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Search></Search>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (props.handleLocationPermission(Platform.OS)) {
            //위치정보 사용 ok 현재위치를 가져와야합니다. 어디서?? 네이버에서
            props.CurrentPosition(); //경위도 찍고
          } else {
            //위치정보 켜달라는 모달 띄우기
            props.LocationModalChangeValue(true);
          }
          //props.navigation.navigate('Map');
        }}
        style={{
          width: Width_convert(375 - 36),
          height: Width_convert(46),
          marginLeft: Width_convert(18),
          marginRight: Width_convert(18),
          marginTop: Width_convert(15),
          borderRadius: Font_normalize(3),
          backgroundColor: '#946AEF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontSize: Font_normalize(16),
            fontWeight: '700',
            color: '#FFFFFF',
          }}>
          지역 설정하기
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          width: Width_convert(375 - 36),
          marginLeft: Width_convert(18),
          marginRight: Width_convert(18),
          marginTop: Width_convert(9),
          fontFamily: Fonts?.NanumSqureRegular || null,
          fontSize: Font_normalize(9),
          fontWeight: '400',
          color: '#000000',
        }}>
        *지역 설정하기 버튼을 누르시면 자동으로 주소설정이 됩니다.
      </Text>
    </View>
  );
};
export default LocationSetting;
