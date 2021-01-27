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

const LocationSetting = ({navigation}) => {
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Map');
        }}
        style={{
          width: Width_convert(375 - 36),
          height: Height_convert(46),
          marginLeft: Width_convert(18),
          marginRight: Width_convert(18),
          marginTop: Height_convert(30),
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
    </View>
  );
};
export default LocationSetting;
