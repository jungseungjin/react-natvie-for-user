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
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeModules,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';

const SearchWork = ({navigation, route}) => {
  return (
    <View
      style={{
        width: Width_convert(375),
        height: Width_convert(423),
      }}>
      <FastImage
        style={{width: Width_convert(375), height: Width_convert(240)}}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
      <View
        style={{
          width: Width_convert(362),
          height: Height_convert(16),
          marginTop: Height_convert(18),
          marginLeft: Width_convert(13),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: Font_normalize(2),
            backgroundColor: '#FFA740',
            marginRight: Width_convert(5),
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingTop: Width_convert(3),
              paddingBottom: Width_convert(3),
              paddingLeft: Width_convert(4),
              paddingRight: Width_convert(4),
              fontSize: Font_normalize(9),
              fontWeight: '700',
              fontFamily: Fonts?.NanumSqureRegular || null,
              color: '#ffffff',
            }}>
            인기추천
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
              paddingTop: Width_convert(3),
              paddingBottom: Width_convert(3),
              paddingLeft: Width_convert(4),
              paddingRight: Width_convert(4),
              fontSize: Font_normalize(9),
              fontWeight: '700',
              fontFamily: Fonts?.NanumSqureRegular,
              color: '#ffffff',
            }}>
            우리가게 공임표 공개
          </Text>
        </View>
      </View>
      <View
        style={{
          width: Width_convert(350),
          height: Height_convert(125),
          marginLeft: Width_convert(13),
          marginTop: Height_convert(15),
        }}>
        <View style={{height: Height_convert(20), justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(18),
              fontWeight: '700',
              color: '#000000',
            }}>
            아우디 Q7 ABT LINE 바디킷
          </Text>
        </View>
        <View
          style={{
            height: Height_convert(14),
            marginTop: Height_convert(11),
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(12),
              marginRight: Width_convert(8),
              color: '#000000',
            }}>
            MOTION튜닝샵
          </Text>
          <Star
            width={Width_convert(12)}
            height={Width_convert(12)}
            style={{marginRight: Width_convert(3)}}></Star>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              marginRight: Width_convert(4),
              color: '#000000',
            }}>
            4.8
          </Text>
          <Text
            style={{
              fontFamily: Fonts.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            후기 33
          </Text>
        </View>
        <View
          style={{
            height: Height_convert(14),
            justifyContent: 'center',
            marginTop: Height_convert(6),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(12),
              fontWeight: '400',
              color: '#000000',
            }}>
            서울특별시 강남구 청담동 12-3
          </Text>
        </View>
        <View
          style={{
            width: Width_convert(350),
            height: Height_convert(25),
            marginTop: Height_convert(35),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSquareBold || null,
              fontWeight: '700',
              fontSize: Font_normalize(22),
              color: '#000000',
              marginLeft: 'auto',
              marginRight: 0,
            }}>
            2,300,000원
          </Text>
        </View>
      </View>
    </View>
  );
};
export default SearchWork;
