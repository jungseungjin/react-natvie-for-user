import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import moment from 'moment';
import 'moment/locale/ko';
import MiniMap from '../Search/miniMap.js';
import FastImage from 'react-native-fast-image';

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
          // borderBottomWidth: 3,
          // borderBottomColor: '#DBDBDB',
        }}>
        {props.item.member?.length > 0 && (
          <>
            <Text
              style={{
                marginTop: Height_convert(21),
                marginLeft: Width_convert(21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(14),
                color: '#000000',
              }}>
              가게 구성원
            </Text>
            <View style={{flexDirection: 'row', marginTop: Width_convert(14)}}>
              {props.item.member.map((item, index) => (
                <>
                  <View
                    style={{marginLeft: Width_convert(21)}}
                    key={item.image + index}>
                    <FastImage
                      style={{
                        width: Width_convert(59),
                        height: Width_convert(59),
                        borderRadius: Width_convert(59),
                      }}
                      source={{
                        uri: item.image,
                        //headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}></FastImage>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: Width_convert(8),
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </>
              ))}
            </View>
          </>
        )}
        <Text
          style={{
            marginTop:
              props.item.member?.length > 0
                ? Height_convert(29)
                : Height_convert(21),
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
    </View>
  );
};
export default memo(WorkInformation);
