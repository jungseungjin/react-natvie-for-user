import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';

const MiddleCategory = (props) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.PickSecondCategoryChangeValue({
            ...props.item.item,
            index: props.topIndex,
          });
        }}
        style={styles.touch(props)}>
        <Text style={styles.text}>{props.item.item.name}</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  touch: (props) => {
    return {
      width: Width_convert(125),
      height: Width_convert(52),
      borderBottomColor: '#FFFFFF',
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        props.pickSecondCategory === props.item.item._id
          ? '#DBDBDB'
          : '#F1F1F1',
    };
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(14),
    color: '#000000',
    textAlign: 'center',
  },
});
export default memo(MiddleCategory);
