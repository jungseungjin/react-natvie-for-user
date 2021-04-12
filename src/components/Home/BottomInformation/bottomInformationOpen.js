import React, {memo} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import Vertical_bar from '../../../../assets/home/vertical_bar.svg';
const BottomInformationOpen = () => {
  return (
    <>
      <View>
        <View style={styles.view}>
          <Text style={styles.text}>대표이사 백준열</Text>
          <Vertical_bar style={styles.vertical_bar}></Vertical_bar>
          <Text style={styles.text}>사업자등록번호 123-45-67891</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>주소 광주광역시 북구 용봉로300 </Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text}>전화번호 1234-5678</Text>
          <Vertical_bar style={styles.vertical_bar}></Vertical_bar>
          <Text style={styles.text}>메일 abc@motory.com</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.text}>통신판매업 광주 북구-1111</Text>
          <Vertical_bar style={styles.vertical_bar}></Vertical_bar>
          <Text style={styles.text}>호스팅서비스제공자 모토리</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  view: {
    marginTop: Height_convert(7),
    flexDirection: 'row',
    alignItems: 'center',
  },
  view2: {
    marginTop: Height_convert(3),
    justifyContent: 'center',
  },
  view3: {
    marginTop: Height_convert(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  view4: {
    marginTop: Height_convert(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(8),
    color: '#7A7A7A',
    marginRight: Width_convert(6),
  },
  vertical_bar: {
    marginRight: Width_convert(6),
  },
});
export default memo(BottomInformationOpen);
