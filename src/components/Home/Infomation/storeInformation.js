import React from 'react';
import {View, Text} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';

const WorkInformation = (props) => {
  return (
    <View
      style={{
        minHeight: Height_convert(812),
      }}>
      <View
        style={{
          width: Width_convert(375),
          borderBottomWidth: 3,
          borderBottomColor: '#DBDBDB',
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
          사장님 한마디
        </Text>
        <Text
          style={{
            marginTop: Height_convert(17),
            marginLeft: Width_convert(21),
            marginRight: Width_convert(17),
            marginBottom: Width_convert(22),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '400',
            fontSize: Font_normalize(11),
            color: '#000000',
          }}>
          {props.item.store_info}
        </Text>
      </View>
      <View
        style={{
          width: Width_convert(375),
          borderBottomWidth: 3,
          borderBottomColor: '#DBDBDB',
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
          가게영업정보
        </Text>
        <View
          style={{
            marginTop: Height_convert(17),
            marginLeft: Width_convert(21),
            marginRight: Width_convert(17),
            marginBottom: Width_convert(22),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              가게주소
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              {props.item.store_address + ' ' + props.item.store_address_detail}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              운영시간
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              월요일 - 금요일 오전 09:00 ~ 오후 07:00{'\n'}토요일 - 일요일 오전
              10:00 ~ 오후 06:00
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              휴무일
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              매달 첫째주 일요일{'\n'}매달 셋째주 일요일
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              전화번호
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              {props.item.store_number}
            </Text>
          </View>
        </View>
      </View>
      {/*사업자정보 시작 */}
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
          사업자정보
        </Text>
        <View
          style={{
            marginTop: Height_convert(17),
            marginLeft: Width_convert(21),
            marginRight: Width_convert(17),
            marginBottom: Width_convert(22),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              대표자명
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              {props.item.store_ceo}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              가게상호명
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              {props.item.store_name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              사업자주소
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              {props.item.store_address + ' ' + props.item.store_address_detail}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: Height_convert(14)}}>
            <Text
              style={{
                width: Width_convert(112 - 21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              사업자등록번호
            </Text>
            <Text
              style={{
                width: Width_convert(236),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#000000',
              }}>
              {props.item.store_register}
            </Text>
          </View>
        </View>
      </View>
      {/*사업자정보 끝 */}
    </View>
  );
};
export default WorkInformation;
