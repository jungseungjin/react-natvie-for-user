import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacityBase,
  FlatList,
} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Gray_checkBox from '../../../../assets/home/gray_checkBox.svg';
import Purple_checkBox from '../../../../assets/home/purple_checkBox.svg';
import Purple_dot from '../../../../assets/home/purple_dot.svg';
import Black_dot from '../../../../assets/home/black_dot.svg';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Domain from '../../../../key/Domain.js';
import CarSettingBrand from './carSettingBrand.js';
import CarSettingModel from './carSettingModel.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import IsLoading from '../../../components/ActivityIndicator';
const CarSetting = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/*왼쪽 뷰 시작 */}
        <View
          style={{
            width: Width_convert(99),
            borderRightWidth: 1,
            borderRightColor: '#DBDBDB',
            justifyContent: 'space-between',
          }}>
          {/*국산 수입 전체 선택하기 시작*/}
          <View
            style={[
              {
                borderBottomWidth: 1,
                borderBottomColor: '#DBDBDB',
              },
              props.from == 'InfoCar' ||
              props.from == 'SignUp' ||
              props.from == 'info'
                ? {}
                : {},
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                if (props.CategoryPick === 'domestic') {
                } else {
                  props.CategoryPickChangeValue('domestic');
                }
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: Height_convert(14),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(15),
                  color: '#1D1D1D',
                  marginLeft: Width_convert(20),
                }}>
                국산
              </Text>
              {props.CategoryPick == 'domestic' ? (
                <Purple_checkBox
                  style={{marginRight: Width_convert(22)}}></Purple_checkBox>
              ) : (
                <Gray_checkBox
                  style={{marginRight: Width_convert(22)}}></Gray_checkBox>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                if (props.CategoryPick === 'import') {
                } else {
                  props.CategoryPickChangeValue('import');
                }
              }}
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: Height_convert(9),
                },
                props.from == 'InfoCar' ||
                props.from == 'SignUp' ||
                props.from == 'info'
                  ? {
                      marginBottom: Height_convert(14),
                    }
                  : null,
              ]}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(15),
                  color: '#1D1D1D',
                  marginLeft: Width_convert(20),
                }}>
                수입
              </Text>
              {props.CategoryPick == 'import' ? (
                <Purple_checkBox
                  style={{marginRight: Width_convert(22)}}></Purple_checkBox>
              ) : (
                <Gray_checkBox
                  style={{marginRight: Width_convert(22)}}></Gray_checkBox>
              )}
            </TouchableOpacity>
            {props.from == 'InfoCar' ||
            props.from == 'SignUp' ||
            props.from == 'info' ? null : (
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => {
                  if (props.CategoryPick == 'all') {
                  } else {
                    props.CategoryPickChangeValue('all');
                    props.BrandPickChangeValue([]);
                  }
                }}
                style={{
                  marginBottom: Height_convert(14),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: Height_convert(9),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(15),
                    color: '#1D1D1D',
                    marginLeft: Width_convert(20),
                  }}>
                  전체
                </Text>
                {props.CategoryPick == 'all' ? (
                  <Purple_checkBox
                    style={{marginRight: Width_convert(22)}}></Purple_checkBox>
                ) : (
                  <Gray_checkBox
                    style={{marginRight: Width_convert(22)}}></Gray_checkBox>
                )}
              </TouchableOpacity>
            )}
          </View>
          {/*국산 수입 전체 선택하기 끝*/}
          {/*브랜드 나열 시작 */}
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}
            data={
              props.CategoryPick === 'domestic'
                ? props.BrandList1
                : props.CategoryPick === 'import'
                ? props.BrandList2
                : []
            }
            windowSize={2}
            initialNumToRender={10}
            renderItem={({item}) => (
              <CarSettingBrand
                item={item}
                BrandPick={
                  props.BrandPick?._id === item?._id && props.BrandPick
                }
                BrandPickChangeValue={props.BrandPickChangeValue}
                ModelPickChangeValue={props.ModelPickChangeValue}
                ModelDetailPickChangeValue={
                  props.ModelDetailPickChangeValue
                }></CarSettingBrand>
            )}
            keyExtractor={(item) => String(item._id)}></FlatList>
          {/*브랜드 나열 끝 */}
        </View>
        {/*왼쪽 뷰 끝 */}
        {/*오른쪽 뷰 시작 */}
        <FlatList
          bounces={false}
          style={{width: Width_convert(275)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          data={props.BrandPick && props.BrandPick.model}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <CarSettingModel
              index={props.BrandPick.model.indexOf(item)}
              item={item}
              BrandPick={props.BrandPick}
              ModelPick={props.ModelPick._id === item._id && props.ModelPick}
              ModelPickChangeValue={props.ModelPickChangeValue}
              ModelDetailPick={props.ModelDetailPick}
              ModelDetailPickChangeValue={props.ModelDetailPickChangeValue}
              from={props.from}></CarSettingModel>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
        {/*오른쪽 뷰 끝 */}
      </View>
      {/*하단 버튼만큼의 공간 띄우기 시작 */}
      <View
        style={{
          width: Width_convert(375),
          height: Height_convert(insets.bottom),
          backgroundColor: '#FFFFFF',
        }}></View>
    </>
  );
};
export default CarSetting;
