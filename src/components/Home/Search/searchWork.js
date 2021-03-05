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
  NativeModules,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import SetRecentList from '../../../components/setRecentList.js';
const SearchWork = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        //최근 본 작업에 넣기
        SetRecentList('work', props.item._id);
        props.navigation.navigate('WorkDetail', {item: props.item});
      }}
      style={{
        width: Width_convert(375),
        height: Width_convert(423),
      }}>
      <FastImage
        style={{
          width: Width_convert(375),
          height: Width_convert(240),
        }}
        source={{
          uri: props.item?.store_thumbnail[0],
          //headers: {Authorization: 'someAuthToken'},
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
        {props.item?.info_store[0].store_badge.indexOf(1) != -1 ? (
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
        ) : null}
        {props.item?.info_store[0].store_badge.indexOf(2) != -1 ? (
          <View
            style={{
              borderRadius: Font_normalize(2),
              backgroundColor: '#F7606E',
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
              가격할인
            </Text>
          </View>
        ) : null}
        {props.item?.info_store[0].store_badge.indexOf(3) != -1 ? (
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
                paddingTop: Width_convert(3),
                paddingBottom: Width_convert(3),
                paddingLeft: Width_convert(4),
                paddingRight: Width_convert(4),
                fontSize: Font_normalize(9),
                fontWeight: '700',
                fontFamily: Fonts?.NanumSqureRegular || null,
                color: '#ffffff',
              }}>
              신규업체
            </Text>
          </View>
        ) : null}
        {props.item?.info_store[0].store_badge.indexOf(4) != -1
          ? // <View
            //   style={{
            //     borderRadius: Font_normalize(2),
            //     backgroundColor: '#1A74FC',
            //     marginRight: Width_convert(5),
            //     textAlign: 'center',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}>
            //   <Text
            //     style={{
            //       paddingTop: Width_convert(3),
            //       paddingBottom: Width_convert(3),
            //       paddingLeft: Width_convert(4),
            //       paddingRight: Width_convert(4),
            //       fontSize: Font_normalize(9),
            //       fontWeight: '700',
            //       fontFamily: Fonts?.NanumSqureRegular,
            //       color: '#ffffff',
            //     }}>
            //     우리가게 공임표 공개
            //   </Text>
            // </View>
            null
          : null}
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
            {props.item?.store_work_name}
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
            {props.item?.info_store[0].store_name}
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
            {props.item?.reviewCount > 0
              ? parseFloat(
                  props.item?.reviewTotal / props.item?.reviewCount,
                ).toFixed(1)
              : '0.0'}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            후기{' '}
            {props.item?.reviewCount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
            {props.item?.info_store[0].store_address}
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
            {props.item?.store_work_total_cost != null &&
            props.item?.store_work_total_cost != 0
              ? props.item?.store_work_total_cost
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
              : '업체문의'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default SearchWork;
