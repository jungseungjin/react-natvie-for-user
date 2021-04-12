import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
const styles = StyleSheet.create({
  touch: {
    justifyContent: 'center',
  },
  text: (props) => {
    return {
      fontFamily: Fonts?.NanumSqureRegular || null,
      fontWeight: '700',
      fontSize: Font_normalize(11),
      paddingLeft: Width_convert(10),
      paddingTop: Height_convert(13),
      paddingBottom: Height_convert(13),
      color:
        props.PickModelDetail?.model_detail === props.item?.model_detail
          ? '#946AEF'
          : '#000000',
    };
  },
});
const TouchOnPress = (props) => {
  props.PickModelDetailChangeValue(props.item);
  if (props.from === 'SignUp') {
    props.PageChangeValue('SignUp');
  }
};
const CarSettingModelDetail = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        TouchOnPress(props);
      }}
      style={styles.touch}>
      <Text style={styles.text(props)}>{props.item.model_detail}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CarSettingModelDetail);
