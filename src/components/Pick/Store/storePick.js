import React, {memo, useCallback, useState} from 'react';
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
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
const SearchStore = (props) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (!props.editMode) {
          //편집상테가 아닐때 페이지이동
          props.ToStore(props.item._id);
        }
      }}
      style={[
        {width: Width_convert(375), height: Height_convert(390)},
        props.getIndex === props.storeListLength
          ? {height: Height_convert(390) + Width_convert(55)}
          : null,
      ]}>
      <FastImage
        style={{width: Width_convert(375), height: Height_convert(240)}}
        source={{
          uri: props.item.image[0],
          //headers: {Authorization: 'someAuthToken'},
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
            {props.item.category.indexOf('1') != -1 ? '드레스업' : null}
            {props.item.category.indexOf('1') != -1 &&
            (props.item.category.indexOf('2') != -1 ||
              props.item.category.indexOf('3') != -1 ||
              props.item.category.indexOf('4') != -1)
              ? ' / '
              : null}
            {props.item.category.indexOf('2') != -1 ? '퍼포먼스' : null}
            {props.item.category.indexOf('2') != -1 &&
            (props.item.category.indexOf('3') != -1 ||
              props.item.category.indexOf('4') != -1)
              ? ' / '
              : null}
            {props.item.category.indexOf('3') != -1 ? '편의장치' : null}
            {props.item.category.indexOf('3') != -1 &&
            props.item.category.indexOf('4') != -1
              ? ' / '
              : null}
            {props.item.category.indexOf('4') != -1 ? '캠핑카' : null}
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
            {props.item.name}
          </Text>
        </View>
        {props.item.badge.indexOf('1') != -1 ? (
          <View
            style={{
              borderRadius: Font_normalize(3),
              backgroundColor: '#FFA740',
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
              인기추천
            </Text>
          </View>
        ) : null}
        {props.item.badge.indexOf('2') != -1 ? (
          <View
            style={{
              borderRadius: Font_normalize(3),
              backgroundColor: '#F7606E',
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
              가격할인
            </Text>
          </View>
        ) : null}
        {props.item.badge.indexOf('3') != -1 ? (
          <View
            style={{
              borderRadius: Font_normalize(3),
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
        ) : null}
        {props.item.badge.indexOf('4') != -1
          ? // <View
            //   style={{
            //  borderRadius: Font_normalize(3),
            //     backgroundColor: '#1A74FC',
            //     marginRight: Width_convert(5),
            //     textAlign: 'center',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}>
            //   <Text
            //     style={{
            //       paddingTop: Width_convert(5),
            //       paddingBottom: Width_convert(5),
            //       paddingLeft: Width_convert(6),
            //       paddingRight: Width_convert(6),
            //       fontSize: Font_normalize(10),
            //       fontWeight: '700',
            //       fontFamily: Fonts?.NanumSqureRegular || null,
            //       color: '#ffffff',
            //     }}>
            //     우리가게공임표 공개
            //   </Text>
            // </View>
            null
          : null}
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
          {props.item.address.address}
        </Text>
      </View>
      <View
        style={{
          width: Width_convert(350),
          height: Height_convert(14),
          marginTop: Height_convert(6),
          marginLeft: Width_convert(13),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Star
            width={Width_convert(12)}
            height={Width_convert(12)}
            style={{marginRight: Width_convert(2)}}></Star>
          <Text
            style={{
              marginRight: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            {props.item?.grade}
          </Text>
          <Text
            style={{
              marginRight: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
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
        {props.editMode ? (
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => {
              let newArr = props.storeListDel;
              if (props.storeListDel.indexOf(props.item._id) != -1) {
                //빼기
                newArr.splice(newArr.indexOf(props.item._id), 1);
              } else {
                //넣기
                newArr.push(props.item._id);
              }
              props.StoreListDelChangeValue(newArr);
              forceUpdate();
            }}>
            {props.storeListDel.indexOf(props.item._id) != -1 ? (
              <CheckedBox
                width={Width_convert(15)}
                height={Width_convert(15)}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(15)}
                height={Width_convert(15)}></CheckBox>
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {props.getIndex === props.storeListLength ? (
        <View
          style={{
            width: Width_convert(375),
            height: Width_convert(55),
          }}></View>
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(SearchStore);
