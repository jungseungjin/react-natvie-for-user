import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
const CarSettingModelDetail = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.PickModelDetailChangeValue(props.item);
      }}
      style={{justifyContent: 'center'}}>
      <Text
        style={[
          {
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '700',
            fontSize: Font_normalize(11),
            paddingLeft: Width_convert(10),
            paddingTop: Height_convert(13),
            paddingBottom: Height_convert(13),
          },
          props?.PickModelDetail?.model_detail == props.item.model_detail
            ? {
                color: '#946AEF',
              }
            : {
                color: '#000000',
              },
        ]}>
        {props.item.model_detail}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(CarSettingModelDetail);
