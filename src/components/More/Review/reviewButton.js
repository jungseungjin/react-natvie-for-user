import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import PropTypes from 'prop-types';
const ReviewButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (props.Title == '수정') {
          props.navigation.navigate('ReviewRevise');
        } else if (props.Title == '삭제') {
        }
      }}
      style={[
        {
          marginRight: Width_convert(8),
          borderRadius: Font_normalize(3),
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.Title == '수정'
          ? {
              backgroundColor: '#946AEF',
            }
          : props.Title == '삭제'
          ? {
              backgroundColor: '#EF6666',
            }
          : null,
      ]}>
      <Text
        style={{
          paddingTop: Width_convert(3),
          paddingBottom: Width_convert(3),
          paddingLeft: Width_convert(7),
          paddingRight: Width_convert(7),
          fontFamily: Fonts?.NanumSqureRegular || null,
          fontSize: Font_normalize(7),
          fontWeight: '700',
          color: '#FFFFFF',
        }}>
        {props.Title}
      </Text>
    </TouchableOpacity>
  );
};
ReviewButton.propTypes = {
  Title: PropTypes.string.isRequired,
};
export default ReviewButton;
