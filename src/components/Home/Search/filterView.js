import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Filter from '../../../../assets/home/filter.svg';
import Width_convert from '../../Width_convert';
import Height_convert from '../../Width_convert';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize';
import BlankBox from '../../../../assets/home/blank_box.svg';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import DisabledBox from '../../../../assets/home/disabled_box.svg';
import QuestionRound from '../../../../assets/home/question_round.svg';
import PropTypes from 'prop-types';

const FilterView = ({
  navigation,
  route,
  index,
  Title,
  nowValue,
  SortChangeValue,
}) => {
  return (
    <View style={Title == '가까운 순 ' ? styles.view : styles.view_2}>
      <View style={styles.view2}>
        <Text style={styles.text}>{Title}</Text>
        {Title == '가까운 순 ' ? <QuestionRound></QuestionRound> : null}
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (nowValue == Title) {
            SortChangeValue(false);
          } else {
            SortChangeValue(Title);
          }
        }}>
        {nowValue == Title ? (
          <CheckedBox style={{marginRight: Width_convert(15)}}></CheckedBox>
        ) : (
          <BlankBox style={{marginRight: Width_convert(15)}}></BlankBox>
        )}
      </TouchableOpacity>
    </View>
  );
};
FilterView.propsType = {
  index: PropTypes.number.isRequired,
  Title: PropTypes.string.isRequired,
  nowValue: PropTypes.string.isRequired,
  SortChangeValue: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  view: {
    width: Width_convert(360),
    height: Height_convert(13),
    marginLeft: Width_convert(15),
    marginTop: Height_convert(11),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view_2: {
    width: Width_convert(360),
    height: Height_convert(13),
    marginLeft: Width_convert(15),
    marginTop: Height_convert(19),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.NanumGothicRegular || null,
    fontSize: Font_normalize(10),
    color: '#000000',
    fontWeight: '400',
  },
});

export default FilterView;
