import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';

const SignUp = (props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        회원가입시 고객님의 차종과 지역설정이 저장되어 {'\n'}원하는 튜닝작업
        검색이 간편합니다
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}
        style={styles.touchableOpacity}>
        <Text style={styles.text2}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    marginTop: 'auto',
    marginBottom: 0,
    width: Width_convert(375),
    height: Height_convert(74),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#DBDBDB',
    borderTopWidth: 1,
  },
  touchableOpacity: {
    justifyContent: 'center',
    height: Height_convert(24),
    marginTop: Height_convert(11),
    marginRight: Width_convert(21),
    borderRadius: Font_normalize(4),
    borderTopColor: '#FF965A',
    borderLeftColor: '#FF965A',
    borderRightColor: '#FF965A',
    borderBottomColor: '#FF965A',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  text: {
    marginTop: Height_convert(11),
    marginLeft: Width_convert(21),
    fontFamily: Fonts?.NanumGothicRegular || null,
    fontSize: Font_normalize(10),
    fontWeight: '400',
    color: '#000000',
  },
  text2: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(8),
    paddingTop: Height_convert(8),
    paddingBottom: Height_convert(8),
    paddingRight: Width_convert(11),
    paddingLeft: Width_convert(11),
    fontWeight: '700',
    color: '#FF965A',
  },
});
export default SignUp;
