import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import {useSelector} from 'react-redux';
const SettingButton = (props) => {
  const reduxState = useSelector((state) => state);
  return (
    <TouchableOpacity
      activeOpacity={1}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={
        props.Type == 'car/location'
          ? styles.touchableOpacity
          : props.Type == 'car'
          ? styles.carTouchableOpacity
          : props.Type == 'workDetail'
          ? styles.workDetailTouchableOpacity
          : null
      }
      onPress={() => {
        if (props.Type == 'car/location') {
          props.navigation.navigate('Setting');
        } else if (props.Type == 'car') {
          return false;
        } else if (props.Type == 'workDetail') {
          if (
            reduxState.loginDataCheck.login?.car?.length == 0 ||
            !reduxState.loginDataCheck.login?.location?.legalCode
          ) {
            props.PickButtonTitleChangeValue(props.Title);
            props.ShowModalChangeValue(true);
          } else {
            props.navigation.navigate('Category', {Title: props.Title});
          }
        }
      }}>
      <Text
        style={
          props.Type == 'car/location'
            ? styles.text
            : props.Type == 'car'
            ? styles.carText
            : props.Type == 'workDetail'
            ? styles.workDetailText
            : null
        }>
        {props.Title}
      </Text>
      {props.SubTitle ? (
        <Text style={styles.workDetailSubText}>{props.SubTitle}</Text>
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  touchableOpacity: {
    width: Width_convert(36),
    height: Height_convert(18),
    borderColor: '#A3A3A3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRadius: Font_normalize(3),
    marginRight: Width_convert(8),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000', //그림자색
    shadowOpacity: 0.2, //그림자 투명도
    shadowOffset: {width: 0.3, height: 0.3}, //그림자 위치
    //ANDROID
    elevation: 2,
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(9),
    color: 'rgba(125, 125, 125,0.72)',
  },
  carTouchableOpacity: {
    height: Height_convert(18),
    backgroundColor: '#A3A3A3',
    borderColor: '#A3A3A3',
    overflow: 'hidden',
    borderRadius: Font_normalize(3),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  carText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(9),
    color: '#FFFFFF',
    paddingBottom: Height_convert(4),
    paddingTop: Height_convert(4),
    paddingLeft: Width_convert(7),
    paddingRight: Width_convert(7),
  },
  workDetailTouchableOpacity: {
    width: Width_convert(160),
    height: Height_convert(74),
    borderColor: '#F0F0F0',
    borderRadius: Font_normalize(5),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000', //그림자색
    shadowOpacity: 0.3, //그림자 투명도
    shadowOffset: {width: 2, height: 2}, //그림자 위치
    //ANDROID
    elevation: 5,
  },
  workDetailText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(13),
    fontWeight: '700',
    marginTop: Height_convert(7),
    marginBottom: Height_convert(6),
    color: '#000000',
  },
  workDetailSubText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(9),
    fontWeight: '400',
    color: '#000000',
  },
});
SettingButton.propTypes = {
  Title: PropTypes.string.isRequired,
  SubTitle: PropTypes.string,
  Type: PropTypes.string.isRequired,
};
export default SettingButton;
