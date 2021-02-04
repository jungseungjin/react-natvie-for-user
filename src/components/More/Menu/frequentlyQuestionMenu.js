import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import PropTypes from 'prop-types';
const FrequentlyQuestionMenu = (props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.PageChangeValue(props.Title);
        }}
        style={[
          {
            width: Width_convert(341) / 3,
            height: Width_convert(57),
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: '#EEEEEE',
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
          },
          props.Title == props.nowValue
            ? {backgroundColor: '#946AEF'}
            : {backgroundColor: '#FFFFFF'},
        ]}>
        <Text
          style={[
            {
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
            },
            props.Title == props.nowValue
              ? {
                  color: '#FFFFFF',
                }
              : {
                  color: '#000000',
                },
          ]}>
          {props.Title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
FrequentlyQuestionMenu.propTypes = {
  Title: PropTypes.string.isRequired,
  nowValue: PropTypes.string.isRequired,
  PageChangeValue: PropTypes.func.isRequired,
};
export default FrequentlyQuestionMenu;
