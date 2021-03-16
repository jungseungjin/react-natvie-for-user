import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';

const BottomSignUpButton = (props) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        투닝에 가입하시면 {'\n'}더욱 즐거운 자동차 튜닝을 하실 수 있습니다.
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
  },
  touchableOpacity: {
    justifyContent: 'center',
    height: Width_convert(30),
    marginTop: Height_convert(11),
    marginRight: Width_convert(22),
    borderRadius: Font_normalize(4),
    borderTopColor: '#1A74FC',
    borderLeftColor: '#1A74FC',
    borderRightColor: '#1A74FC',
    borderBottomColor: '#1A74FC',
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
    fontSize: Font_normalize(12),
    paddingTop: Height_convert(8),
    paddingBottom: Height_convert(8),
    paddingRight: Width_convert(12),
    paddingLeft: Width_convert(12),
    fontWeight: '700',
    color: '#1A74FC',
  },
});
export default BottomSignUpButton;
