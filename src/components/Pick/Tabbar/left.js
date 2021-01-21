import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const Left = ({left, leftStyle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {left === 'none' ? null : (
        <TouchableOpacity>
          <Text>편집</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
Left.propTypes = {
  left: PropTypes.string.isRequired,
  leftStyle: PropTypes.object,
};
export default Left;
