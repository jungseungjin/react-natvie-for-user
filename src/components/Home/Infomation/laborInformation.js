import React from 'react';
import {View, Text} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';

const StoreInformation = () => {
  return (
    <View
      style={{
        minHeight: Height_convert(812),
      }}>
      <View
        style={{
          width: Width_convert(375),
        }}>
        <Text
          style={{
            marginTop: Height_convert(21),
            marginLeft: Width_convert(21),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '700',
            fontSize: Font_normalize(14),
            color: '#000000',
          }}>
          우리가게공임표
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            width: Width_convert(333),
            height: Height_convert(27),
            marginTop: Height_convert(27),
            borderBottomWidth: 0.5,
            borderBottomColor: '#DEDEDE',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            바디킷 장착
          </Text>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            400000~500000
          </Text>
        </View>
        <View
          style={{
            width: Width_convert(333),
            height: Height_convert(27),
            marginTop: Height_convert(27),
            borderBottomWidth: 0.5,
            borderBottomColor: '#DEDEDE',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            엔진오일 교체
          </Text>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            20,000
          </Text>
        </View>
        <View
          style={{
            width: Width_convert(333),
            height: Height_convert(27),
            marginTop: Height_convert(27),
            borderBottomWidth: 0.5,
            borderBottomColor: '#DEDEDE',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            휠교체
          </Text>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            30,000
          </Text>
        </View>
        <View
          style={{
            width: Width_convert(333),
            height: Height_convert(27),
            marginTop: Height_convert(27),
            borderBottomWidth: 0.5,
            borderBottomColor: '#DEDEDE',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            차량엔진관련
          </Text>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              fontSize: Font_normalize(12),
              color: '#000000',
            }}>
            10,000 ~ 1,000,000
          </Text>
        </View>
      </View>
    </View>
  );
};
export default StoreInformation;
