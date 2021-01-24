import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import Vertical_bar from '../../../../assets/home/vertical_bar.svg';
const BottomInformationDefault = () => {
  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>이용약관</Text>
        <Vertical_bar style={styles.vertical_bar}></Vertical_bar>
        <Text style={styles.text}>사업자정보확인</Text>
        <Vertical_bar style={styles.vertical_bar}></Vertical_bar>
        <Text style={styles.text3}>개인정보처리방침</Text>
      </View>
      <View style={styles.view2}>
        <Text style={styles.text4}>
          투닝은 통신판매중개자로서 통신판매의 당사자가 아닙니다. 가게의 예약,
          환불 등과 관련된 책임을 지지 않습니다.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginTop: Height_convert(9),
    alignItems: 'center',
  },
  view2: {
    marginTop: Height_convert(9),
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(9),
    color: '#7A7A7A',
    marginRight: Width_convert(8),
  },
  text3: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(9),
    color: '#3F3F3F',
  },
  text4: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(7),
    color: '#7A7A7A',
  },
  vertical_bar: {
    marginRight: Width_convert(6),
  },
});
export default BottomInformationDefault;
