import React, {memo} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
const Search = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Search');
      }}
      activeOpacity={1}
      style={styles.touch}>
      <View style={styles.view}>
        <Text style={styles.text}>튜닝부품 or 작업,튜닝샵 검색</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: Width_convert(375),
    height: Height_convert(36),
    marginTop: Height_convert(27),
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: Width_convert(337),
    height: Height_convert(36),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#F1F1F1',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: '#F1F1F1',
  },
  text: {
    color: '#A1A1A1',
    fontFamily: Fonts?.NanumGothicRegular || null,
    fontSize: Font_normalize(12),
    fontWeight: '700',
    marginLeft: Width_convert(11),
  },
});
export default memo(Search);
