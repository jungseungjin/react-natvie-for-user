import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const Right = ({right, rightStyle}) => {
  return (
    <TouchableOpacity activeOpacity={1}>
      <Text style={rightStyle}>{right}</Text>
    </TouchableOpacity>
  );
};
Right.propTypes = {
  right: PropTypes.string.isRequired,
  rightStyle: PropTypes.object,
};
export default Right;
