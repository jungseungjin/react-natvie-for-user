import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Filter from '../../../../assets/home/filter.svg';
import Width_convert from '../../Width_convert';
import Height_convert from '../../Height_convert';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize';
import PropTypes from 'prop-types';
const FilterIcon = ({navigation, route, PickChangeValue, nowValue}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        PickChangeValue();
      }}
      activeOpacity={1}
      style={
        nowValue ? styles.touchableOpacity_true : styles.touchableOpacity_false
      }>
      <Filter></Filter>
    </TouchableOpacity>
  );
};
FilterIcon.propsType = {
  PickChangeValue: PropTypes.func.isRequired,
  nowValue: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  touchableOpacity_true: {
    marginLeft: 'auto',
    marginRight: Width_convert(19),
    borderRadius: Font_normalize(3),
    backgroundColor: '#F8F2FD', //필터 누르면 추가
    paddingBottom: Height_convert(5),
    paddingTop: Height_convert(5),
    paddingLeft: Width_convert(5),
    paddingRight: Width_convert(5),
  },
  touchableOpacity_false: {
    marginLeft: 'auto',
    marginRight: Width_convert(19),
    borderRadius: Font_normalize(3),
    paddingBottom: Height_convert(5),
    paddingTop: Height_convert(5),
    paddingLeft: Width_convert(5),
    paddingRight: Width_convert(5),
  },
});
export default FilterIcon;
