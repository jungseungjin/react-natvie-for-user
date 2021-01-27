import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacityBase,
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

const CarSetting = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          width: Width_convert(99),
          borderRightWidth: 1,
          borderRightColor: '#DBDBDB',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: Width_convert(99), //사이즈안맞아서 width로
            borderBottomWidth: 1,
            borderBottomColor: '#DBDBDB',
          }}>
          <TouchableOpacity
            activeOpacity={1}
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
            <Gray_checkBox
              style={{marginRight: Width_convert(22)}}></Gray_checkBox>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
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
              수입
            </Text>
            <Gray_checkBox
              style={{marginRight: Width_convert(22)}}></Gray_checkBox>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
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
            <Purple_checkBox
              style={{marginRight: Width_convert(22)}}></Purple_checkBox>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: Width_convert(65),
              height: Width_convert(51),
              borderRadius: Font_normalize(4),
              backgroundColor: '#ECECEC',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: Width_convert(16),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{
                width: Width_convert(30),
                height: Width_convert(20),
              }}
              source={{
                uri: 'https://unsplash.it/400/400?image=1',
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#000000',
                marginTop: Height_convert(9),
              }}>
              제네시스
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView style={{width: Width_convert(275)}}>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: Width_convert(31),
              marginTop: Height_convert(28),
            }}>
            <Purple_dot style={{marginRight: Width_convert(9)}}></Purple_dot>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(15),
                color: '#946AEF',
              }}>
              G70
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: Width_convert(199),
              borderRadius: Font_normalize(4),
              backgroundColor: '#F2EEFA',
              marginLeft: Width_convert(40),
              marginTop: Height_convert(5),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(11),
                  color: '#946AEF',
                  paddingLeft: Width_convert(10),
                  paddingTop: Height_convert(13),
                  paddingBottom: Height_convert(13),
                }}>
                더 뉴 G70(20년~현재)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CarSetting;
