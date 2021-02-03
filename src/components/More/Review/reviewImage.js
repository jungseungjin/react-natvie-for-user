import React from 'react';
import {View} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import FastImage from 'react-native-fast-image';
const ReviewImage = (props) => {
  return (
    <View
      style={[
        {marginRight: Width_convert(7)},
        props.index == 0 ? {marginLeft: Width_convert(21)} : null,
      ]}>
      <FastImage
        style={{
          width: Width_convert(134),
          height: Width_convert(88),
          borderRadius: Width_convert(3),
        }}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
    </View>
  );
};

export default React.memo(ReviewImage);
