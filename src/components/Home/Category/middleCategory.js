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
          props.PickMiddleCategoryChangeValue(props.item);
        }}
        style={[
          styles.touch,
          props.PickMiddleCategory == props.item
            ? {
                backgroundColor: '#DBDBDB',
              }
            : {
                backgroundColor: '#F1F1F1',
              },
        ]}>
        <Text style={styles.text}>{props.item.work_sub_type_name}</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  touch: {
    width: Width_convert(125),
    height: Width_convert(52),
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
