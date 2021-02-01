import React from 'react';
import {View, StyleSheet} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
const SwiperImage = (props) => {
  return (
    <View
      style={
        props.from == 'home'
          ? styles.view
          : props.from == 'work'
          ? styles.view_work
          : null
      }>
      <FastImage
        style={
          props.from == 'home'
            ? styles.fastImage
            : props.from == 'work'
            ? styles.fastImage_work
            : null
        }
        source={{
          uri: props.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: Width_convert(375),
    height: Width_convert(211),
  },
  fastImage: {
    width: Width_convert(375),
    height: Width_convert(211),
  },
  view_work: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: Width_convert(375),
    height: Width_convert(240),
  },
  fastImage_work: {
    width: Width_convert(375),
    height: Width_convert(240),
  },
});
SwiperImage.propTypes = {
  image: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
};
export default SwiperImage;
