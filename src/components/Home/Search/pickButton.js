import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Filter from '../../../../assets/home/filter.svg';
import Width_convert from '../../Width_convert';
import Height_convert from '../../Width_convert';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize';

import PropTypes from 'prop-types';
const FilterView = ({
  navigation,
  route,
  Title,
  Length,
  nowValue,
  ButtonChangeValue,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        //setPickButton('store');
        if (nowValue == 'work') {
          ButtonChangeValue('store');
        } else {
          ButtonChangeValue('work');
        }
      }}
      activeOpacity={1}
      style={[
        styles.touchableOpacity,
        (nowValue == 'work' && Title == '튜닝작업') ||
        (nowValue == 'store' && Title == '튜닝샵')
          ? styles.pick
          : styles.unPick,
        Title == '튜닝작업' ? styles.first : styles.second,
      ]}>
      <Text
        style={[
          styles.text,
          (nowValue == 'work' && Title == '튜닝작업') ||
          (nowValue == 'store' && Title == '튜닝샵')
            ? styles.pickText
            : styles.unPickText,
        ]}>
        {Title}({Length})
      </Text>
    </TouchableOpacity>
  );
};
FilterView.propsType = {};
const styles = StyleSheet.create({
  //찍혔을때 안찍혔을때, 첫버튼일때 아닐때
  touchableOpacity: {
    height: Height_convert(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Font_normalize(3),
    paddingTop: Height_convert(5),
    paddingBottom: Height_convert(5),
    paddingLeft: Width_convert(6),
    paddingRight: Width_convert(6),
  },
  pick: {
    backgroundColor: '#946AEF',
  },
  unPick: {
    backgroundColor: '#FFFFFF',
  },
  first: {
    marginLeft: Width_convert(22),
  },
  second: {
    marginLeft: Width_convert(16),
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '800',
    fontSize: Font_normalize(10),
  },
  pickText: {
    color: '#FFFFFF',
  },
  unPickText: {
    color: '#000000',
  },
});
export default FilterView;
