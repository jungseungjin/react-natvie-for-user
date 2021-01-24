import React from 'react';
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

const Search = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Search');
      }}
      activeOpacity={1}
      style={{
        width: Width_convert(375),
        height: Height_convert(36),
        marginTop: Height_convert(27),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
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
        }}>
        <Text
          style={{
            color: '#A1A1A1',
            fontFamily: Fonts?.NanumGothicRegular || null,
            fontSize: Font_normalize(12),
            fontWeight: '700',
            marginLeft: Width_convert(11),
          }}>
          튜닝부품 or 작업,튜닝샵 검색
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Search;
