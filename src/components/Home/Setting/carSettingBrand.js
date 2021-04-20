import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
const CarSettingBrand = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.BrandPickChangeValue(props.item);
        props.ModelPickChangeValue({});
        props.ModelDetailPickChangeValue({});
      }}
      style={[
        styles.touch,
        props.BrandPick?._id === props.item?._id && {
          backgroundColor: '#ECECEC',
        },
      ]}>
      <FastImage
        style={styles.image}
        source={{
          uri: props.item.image,
          //headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain} // {FastImage.resizeMode.stretch}
      ></FastImage>
      <Text style={styles.text}>{props.item.brand}</Text>
    </TouchableOpacity>
  );
};

export default memo(CarSettingBrand);

const styles = StyleSheet.create({
  touch: {
    width: Width_convert(65),
    height: Width_convert(65),
    borderRadius: Font_normalize(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Width_convert(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Width_convert(84),
    height: Width_convert(40),
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(11),
    fontWeight: '400',
    color: '#000000',
  },
});
