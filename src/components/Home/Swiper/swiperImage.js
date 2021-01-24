import React from 'react';
import {View, StyleSheet} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
const SwiperImage = ({image}) => {
  return (
    <View style={styles.view}>
      <FastImage
        style={styles.fastImage}
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
});
SwiperImage.propTypes = {
  image: PropTypes.string.isRequired,
};
export default SwiperImage;
