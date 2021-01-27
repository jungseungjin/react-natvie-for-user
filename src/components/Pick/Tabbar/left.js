import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GoBack from '../../../../assets/home/goBack.svg';
import Width_convert from '../../Width_convert';
const Left = ({navigation, goBack, left, leftStyle, props}) => {
  console.log(navigation);
  console.log(goBack);
  console.log(props);
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {left === 'none' ? null : left ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            //navigation.goBack();
          }}>
          <GoBack style={leftStyle}></GoBack>
        </TouchableOpacity>
      ) : (
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
