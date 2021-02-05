import React from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Width_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';

const SearchStore = ({navigation, route}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{width: Width_convert(375), height: Height_convert(390)}}>
      <FastImage
        style={{width: Width_convert(375), height: Height_convert(240)}}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
      <View
        style={{
          width: Width_convert(362),
          height: Height_convert(22),
          marginTop: Height_convert(18),
          marginLeft: Width_convert(13),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: Font_normalize(4),
            backgroundColor: '#484848',
            marginRight: Width_convert(5),
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: Width_convert(5),
              paddingBottom: Width_convert(5),
              paddingLeft: Width_convert(6),
              paddingRight: Width_convert(6),
              fontSize: Font_normalize(10),
              fontWeight: '700',
              fontFamily: Fonts?.NanumSquareBold || null,
              color: '#ffffff',
            }}>
            드레스업 / 퍼포먼스
          </Text>
        </View>
      </View>
      <View
        style={{
          width: Width_convert(362),
          height: Height_convert(20),
          marginTop: Height_convert(15),
          marginLeft: Width_convert(13),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{marginRight: Width_convert(5)}}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(18),
              fontWeight: '700',
              color: '#000000',
            }}>
            WHEEL SPIN 구미점
          </Text>
        </View>
        <View
          style={{
            borderRadius: Font_normalize(2),
            backgroundColor: '#4BCA90',
            marginRight: Width_convert(5),
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: Width_convert(5),
              paddingBottom: Width_convert(5),
              paddingLeft: Width_convert(6),
              paddingRight: Width_convert(6),
              fontSize: Font_normalize(10),
              fontWeight: '700',
              fontFamily: Fonts?.NanumSqureRegular || null,
              color: '#ffffff',
            }}>
            신규업체
          </Text>
        </View>
        <View
          style={{
            borderRadius: Font_normalize(2),
            backgroundColor: '#1A74FC',
            marginRight: Width_convert(5),
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: Width_convert(5),
              paddingBottom: Width_convert(5),
              paddingLeft: Width_convert(6),
              paddingRight: Width_convert(6),
              fontSize: Font_normalize(10),
              fontWeight: '700',
              fontFamily: Fonts?.NanumSqureRegular || null,
              color: '#ffffff',
            }}>
            우리가게공임표 공개
          </Text>
        </View>
      </View>
      <View
        style={{
          width: Width_convert(362),
          height: Height_convert(14),
          marginTop: Height_convert(6),
          marginLeft: Width_convert(13),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '400',
            fontSize: Font_normalize(12),
            color: '#000000',
          }}>
          경상북도 구미시 송정동 12-3
        </Text>
      </View>
      <View
        style={{
          width: Width_convert(362),
          height: Height_convert(14),
          marginTop: Height_convert(6),
          marginLeft: Width_convert(13),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Star style={{marginRight: Width_convert(2)}}></Star>
        <Text
          style={{
            marginRight: Width_convert(5),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '700',
            fontSize: Font_normalize(12),
            color: '#000000',
          }}>
          4.8
        </Text>
        <Text
          style={{
            marginRight: Width_convert(5),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '700',
            fontSize: Font_normalize(12),
            color: '#000000',
          }}>
          후기 100
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchStore;
