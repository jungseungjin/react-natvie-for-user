import React, {memo} from 'react';
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
      style={touchStyle(props)}
      onPress={() => {
        if (props.From === 'home' || props.From === 'workVideo') {
          props.navigation.navigate('WorkVideo', {item: props.item});
        }
      }}>
      <FastImage
        style={FastImageStyle(props.From, 1)}
        source={{
          uri: props.item.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={styles.titleText}>{props.item.title}</Text>
      </View>
      <View style={styles.view}>
        <FastImage
          style={FastImageStyle(props.From, 2)}
          source={{
            uri: props.item.owner.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}></FastImage>
        <Text style={styles.ownersnameText}>{props.item.owner.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const FastImageStyle = (From, Number) => {
  if (Number === 1) {
    if (From === 'home') {
      return styles.home_fastImage;
    }
    return styles.workVideo_fastImage;
  }
  if (From === 'home') {
    return styles.home_fastImage2;
  }
  return styles.workVideo_fastImage2;
};
const touchStyle = (props) => {
  if (props.From == 'home') {
    if (props.Index == 0) return styles.home_view_index0;
    return styles.home_view;
  } else {
    if (props.Index == 0) return styles.workVideo_view_index0;
    return styles.workVideo_view;
  }
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
  titleText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(14),
    marginTop: Height_convert(11),
    color: '#000000',
    lineHeight: Height_convert(17),
  },
  ownersnameText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(10),
    color: '#000000',
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
  view: {
    flexDirection: 'row',
    marginTop: Height_convert(10),
    alignItems: 'center',
  },
});
OwnersWork.propTypes = {};
export default memo(OwnersWork);
