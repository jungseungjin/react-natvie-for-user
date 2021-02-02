import React from 'react';
import {View, Text} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';

const WorkInformation = () => {
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
          안녕하세요? MOTION튜닝 사장 ***입니다 저희 튜닝샵은 이 지역에서만
          작업을 한지 10년입니다. 다양한 튜닝작업을 해왔으며 특히, 바디킷
          장착에서만큼은 그 누구보다 부족함 없이 잘하고 있다고 자부합니다!
          고객님들의 불편한 점과 문제에 대해서 지적하신 것에 대해 늘 받아드리고
          배울 준비가 되어있습니다. 많은 작업들을 올려 놓았으니 구경한번 하시고
          편안하게 방문해주시면 감사하겠습니다!
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
              서울특별시 강남구 청담동 12-3 1층 MOTION튜닝샵
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
              02-123-4567
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
              백준열
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
              MOTION튜닝
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
              서울특별시 강남구 청담동 12-3 1층
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
              02-123-4567
            </Text>
          </View>
        </View>
      </View>
      {/*사업자정보 끝 */}
    </View>
  );
};
export default WorkInformation;
