import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
const SwiperImage = (props) => {
  return (
    <View style={CheckStyles(props, 'View')}>
      <FastImage
        style={CheckStyles(props, 'Image')}
        source={SwiperImageUri(props.image)}
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

const CheckStyles = (props, Type) => {
  if (props.from === 'home') {
    if (Type === 'View') return styles.view;
    return styles.fastImage;
  } else if (props.from === 'work') {
    if (Type === 'View') return styles.view_work;
    return styles.fastImage_work;
  }
  return null;
};

const SwiperImageUri = (image) => {
  return {
    uri: image,
    priority: FastImage.priority.normal,
  };
};
SwiperImage.propTypes = {
  image: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
};
export default memo(SwiperImage);
