import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
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
            if (props.PickSmallCategory == props.item) {
              props.PickSmallCategoryChangeValue({});
            } else {
              props.PickSmallCategoryChangeValue(props.item);
            }
          }}
          activeOpacity={1}
          style={{
            marginTop: Height_convert(20),
            marginBottom: Height_convert(5),
          }}>
          <Text
            style={[
              {
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(14),
              },
              props.PickSmallCategory == props.item
                ? {color: '#946AEF'}
                : {color: '#000000'},
            ]}>
            {props.item.work_name}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default React.memo(SmallCategory);