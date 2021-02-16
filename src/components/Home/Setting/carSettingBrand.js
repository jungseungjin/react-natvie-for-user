import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
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
        props.PickBrandChangeValue(props.item);
        props.PickModelChangeValue({});
        props.PickModelDetailChangeValue({});
      }}
      style={[
        {
          width: Width_convert(65),
          height: Width_convert(65),
          borderRadius: Font_normalize(4),
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: Width_convert(16),
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.PickBrandValue?._id == props.item?._id
          ? {backgroundColor: '#ECECEC'}
          : null,
      ]}>
      <FastImage
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          width: Width_convert(64),
          height: Width_convert(40),
        }}
        source={{
          uri: props.item.brand_image,
          //headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain} // {FastImage.resizeMode.stretch}
      ></FastImage>
      <Text
        style={{
          fontFamily: Fonts?.NanumSqureRegular || null,
          fontSize: Font_normalize(11),
          fontWeight: '400',
          color: '#000000',
        }}>
        {props.item.brand}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(CarSettingBrand);
