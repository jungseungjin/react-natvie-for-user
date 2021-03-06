import React, {memo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  view: {
    width: Width_convert(375),
    height: Height_convert(72),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  touch: {
    width: Width_convert(375),
    height: Height_convert(72),
    justifyContent: 'center',
  },
  text: {
    marginLeft: Width_convert(28),
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(16),
    fontWeight: '700',
    color: '#000000',
  },
});

const Menu = (props) => {
  const reduxState = useSelector((state) => state);
  const TouchOnPress = () => {};
  return (
    <View style={styles.view}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (props.Title == '내정보') {
            console.log(`props.toastRef = ${props.toastRef}`);
            props.navigation.navigate('Info', {toastRef: props.toastRef});
          } else if (props.Title == '로그인하기') {
            props.navigation.navigate('Login');
          } else if (props.Title == '후기관리') {
            if (reduxState.loginDataCheck.login.login) {
              props.navigation.navigate('ReviewManage');
            } else {
              props.ShowModalChangeValue(true);
            }
          } else if (props.Title == '최근 본 작업') {
            props.navigation.navigate('RecentWork');
          } else if (props.Title == '공지사항 및 이벤트') {
            props.navigation.navigate('NoticeBoard');
          } else if (props.Title == '고객센터') {
            props.navigation.navigate('Customer');
          } else if (props.Title == '설정') {
            props.navigation.navigate('Setting_more');
          } else if (props.Title == '투닝 가게 입점 문의') {
            props.navigation.navigate('Entry');
          } else {
            return false;
          }
        }}
        style={styles.touch}>
        <Text style={styles.text}>{props.Title}</Text>
      </TouchableOpacity>
    </View>
  );
};

Menu.propTypes = {
  Title: PropTypes.string.isRequired,
};
export default memo(Menu);
