import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import moment from 'moment';
import 'moment/locale/ko';
import MiniMap from '../Search/miniMap.js';

const WorkInformation = (props) => {
  moment.locale('ko');
  const [closedDay, setClosedDay] = React.useState([]);
  const [operationTime, setOperationTime] = React.useState([]);
  // React.useEffect(() => {
  //   let newArr = [];
  //   let newArr2 = [];
  //   if (props.item.store_closed_day.length > 0) {
  //     for (items of props.item.store_closed_day) {
  //       let A, B;
  //       if (items.week === '1') {
  //         A = '매달 첫번째 ';
  //       } else if (items.week === '2') {
  //         A = '매달 두번째 ';
  //       } else if (items.week === '3') {
  //         A = '매달 세번째 ';
  //       } else if (items.week === '4') {
  //         A = '매달 네번째 ';
  //       } else if (items.week === '5') {
  //         A = '매달 다섯번째 ';
  //       } else if (items.week === '6') {
  //         A = '매달 여섯번째 ';
  //       }
  //       if (items.day === 'mon') {
  //         B = '월요일';
  //       } else if (items.day === 'tue') {
  //         B = '화요일';
  //       } else if (items.day === 'wen') {
  //         B = '수요일';
  //       } else if (items.day === 'thu') {
  //         B = '목요일';
  //       } else if (items.day === 'fri') {
  //         B = '금요일';
  //       } else if (items.day === 'sat') {
  //         B = '토요일';
  //       } else if (items.day === 'sun') {
  //         B = '일요일';
  //       }
  //       newArr.push(A + B);
  //     }
  //     setClosedDay(newArr);
  //   }
  //   if (props.item.store_operation_time.length > 0) {
  //     for (items of props.item.store_operation_time) {
  //       let A, B, C;
  //       if (items.workday === 1) {
  //         A = '월요일';
  //       } else if (items.workday === 2) {
  //         A = '화요일';
  //       } else if (items.workday === 3) {
  //         A = '수요일';
  //       } else if (items.workday === 4) {
  //         A = '목요일';
  //       } else if (items.workday === 5) {
  //         A = '금요일';
  //       } else if (items.workday === 6) {
  //         A = '토요일';
  //       } else if (items.workday === 7) {
  //         A = '일요일';
  //       }
  //       B = moment(items.startTime, 'HH:mm').format('A hh:mm');
  //       C = moment(items.endTime, 'HH:mm').format('A hh:mm');
  //       newArr2.push(A + B + '~' + C);
  //     }
  //     setOperationTime(newArr2);
  //   }
  // }, []);
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
          {props.item.information}
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
              {props.item.address.address}
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
              {/* {operationTime.map((item) => `${item}\n`)} */}
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
              {/* {closedDay.map((item) => `${item}\n`)} */}
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
              {props.item.address.number}
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
              {props.item.businessInformation.owner}
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
              {props.item.businessInformation.name}
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
              {props.item.businessInformation.address}
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
              {props.item.businessInformation.registerNumber}
            </Text>
          </View>
        </View>
      </View>
      {/*사업자정보 끝 */}
      <MiniMap coordinates={props.item.location.coordinates}></MiniMap>
    </View>
  );
};
export default memo(WorkInformation);
