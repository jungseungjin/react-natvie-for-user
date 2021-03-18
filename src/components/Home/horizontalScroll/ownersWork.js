import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import FastImage from 'react-native-fast-image';

const OwnersWork = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={
        props.From == 'home'
          ? props.Index == 0
            ? styles.home_view_index0
            : styles.home_view
          : props.Index == 0
          ? styles.workVideo_view_index0
          : styles.workVideo_view
      }
      onPress={() => {
        if (props.From == 'home' || props.From == 'workVideo') {
          props.navigation.navigate('WorkVideo', {item: props.item});
        }
      }}>
      <FastImage
        style={
          props.From == 'home'
            ? styles.home_fastImage
            : styles.workVideo_fastImage
        }
        source={{
          uri: props.item.url,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
      <View
        style={{
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
          {props.item.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: Height_convert(10),
          alignItems: 'center',
        }}>
        <FastImage
          style={
            props.From == 'home'
              ? styles.home_fastImage2
              : styles.workVideo_fastImage2
          }
          source={{
            uri: props.item.ownersImage,
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
          {props.item.ownersname}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  home_view: {
    width: Width_convert(304),
    height: Height_convert(266),
    marginRight: Width_convert(9),
  },
  home_view_index0: {
    width: Width_convert(304),
    height: Height_convert(266),
    marginLeft: Width_convert(19),
    marginRight: Width_convert(9),
  },
  home_fastImage: {
    width: Width_convert(304),
    height: Height_convert(171),
    borderRadius: Font_normalize(6),
  },
  home_fastImage2: {
    width: Width_convert(16),
    height: Width_convert(16),
    borderRadius: Font_normalize(16),
    marginRight: Width_convert(3),
  },

  workVideo_view: {
    width: Width_convert(348),
    height: Height_convert(264),
    marginRight: Width_convert(13),
    marginLeft: Width_convert(13),
    marginBottom: Height_convert(32),
  },
  workVideo_view_index0: {
    width: Width_convert(348),
    height: Height_convert(264),
    marginTop: Height_convert(13),
    marginLeft: Width_convert(13),
    marginRight: Width_convert(13),
    marginBottom: Height_convert(32),
  },
  workVideo_fastImage: {
    width: Width_convert(349),
    height: Height_convert(195),
    borderRadius: Font_normalize(6),
  },
  workVideo_fastImage2: {
    width: Width_convert(16),
    height: Width_convert(16),
    borderRadius: Font_normalize(16),
    marginRight: Width_convert(3),
  },
});
OwnersWork.propTypes = {};
export default OwnersWork;
