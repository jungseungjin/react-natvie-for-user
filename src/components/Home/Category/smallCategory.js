import React, {memo} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';

const SmallCategory = (props) => {
  return (
    <>
      <View style={{marginLeft: Width_convert(28)}}>
        <TouchableOpacity
          onPress={() => {
            if (props.PickSmallCategory === props.item) {
              props.PickSmallCategoryChangeValue({});
            } else {
              props.PickSmallCategoryChangeValue(props.item);
            }
          }}
          activeOpacity={1}
          style={styles.touch}>
          <Text style={styles.text(props)}>{props.item.work_name}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  touch: {
    marginTop: Height_convert(20),
    marginBottom: Height_convert(5),
  },
  text: (props) => {
    return {
      fontFamily: Fonts?.NanumSqureRegular || null,
      fontWeight: '400',
      fontSize: Font_normalize(14),
      color: props.PickSmallCategory === props.item ? '#946AEF' : '#000000',
    };
  },
});
export default memo(SmallCategory);
