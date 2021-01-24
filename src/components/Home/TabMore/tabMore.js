import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
const TabMore = ({Title}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{Title}</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          alert('gd');
        }}>
        <Text style={styles.touchText}>더보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Width_convert(337),
    height: Height_convert(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(16),
    color: '#000000',
  },
  touchText: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    color: '#946AEF',
    fontSize: Font_normalize(10),
  },
});
TabMore.propTypes = {
  Title: PropTypes.string.isRequired,
};
export default TabMore;
