import React from 'react';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const Title = ({title, titleStyle}) => {
  return (
    <View style={{}}>
      {title === 'none' ? null : <Text style={titleStyle}>{title}</Text>}
    </View>
  );
};
Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
};
export default Title;
