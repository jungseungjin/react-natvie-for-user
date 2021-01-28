import React from 'react';
import {View, StyleSheet} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
const SwiperImage = ({image, from}) => {
  return (
    <View
      style={
        from == 'home' ? styles.view : from == 'work' ? styles.view_work : null
      }>
      <FastImage
        style={
          from == 'home'
            ? styles.fastImage
            : from == 'work'
            ? styles.fastImage_work
            : null
        }
        source={{
          uri: image,
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
    backgroundColor: '#9DD6EB',
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
    backgroundColor: '#9DD6EB',
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
};
export default SwiperImage;
