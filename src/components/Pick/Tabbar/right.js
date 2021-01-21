import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const Right = ({right, rightStyle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {right === 'none' ? null : (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log('gd');
          }}>
          <Text style={rightStyle}>{right}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
Right.propTypes = {
  right: PropTypes.string.isRequired,
  rightStyle: PropTypes.object,
};
export default Right;
