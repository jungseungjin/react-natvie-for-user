import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import FastImage from 'react-native-fast-image';

const OwnersWork = ({Title, ImageUrl, OwnersImage, OwnersStore, Index}) => {
  return (
    <View style={Index == 0 ? styles.view_index0 : styles.view}>
      <FastImage
        style={styles.fastImage}
        source={{
          uri: ImageUrl,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
      <View
        style={{
          heigt: Height_convert(36),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '400',
            fontSize: Font_normalize(13),
            marginTop: Height_convert(11),
            color: '#000000',
            lineHeight: Height_convert(17),
          }}>
          {Title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: Height_convert(10),
          alignItems: 'center',
        }}>
        <FastImage
          style={styles.fastImage2}
          source={{
            uri: OwnersImage,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}></FastImage>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '400',
            fontSize: Font_normalize(10),
            color: '#000000',
          }}>
          {OwnersStore}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    width: Width_convert(304),
    height: Height_convert(266),
    marginRight: Width_convert(9),
  },
  view_index0: {
    width: Width_convert(304),
    height: Height_convert(266),
    marginLeft: Width_convert(19),
    marginRight: Width_convert(9),
  },
  fastImage: {
    width: Width_convert(304),
    height: Height_convert(171),
    borderRadius: 6,
  },
  fastImage2: {
    width: Width_convert(16),
    height: Width_convert(16),
    borderRadius: 16,
    marginRight: Width_convert(3),
  },
});
OwnersWork.propTypes = {
  Title: PropTypes.string.isRequired,
  ImageUrl: PropTypes.string.isRequired,
  OwnersImage: PropTypes.string.isRequired,
  OwnersStore: PropTypes.string.isRequired,
  Index: PropTypes.number.isRequired,
};
export default OwnersWork;
