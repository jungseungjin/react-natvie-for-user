import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import PropTypes from 'prop-types';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x_black.svg';
import {ScrollView} from 'react-native-gesture-handler';
import Filter from '../../../../assets/home/filter.svg';
import StatusBarHeight from '../../StatusBarHeight';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
const TabBarBottom = ({
  navigation,
  Title,
  nowValue,
  PageChangeValue,
  from,
  FilterValue,
  FtilerChangeValue,
}) => {
  return (
    <>
      <View
        style={{
          height: Height_convert(48),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {Title.map((item) => (
          <TouchableOpacity
            key={item.value}
            activeOpacity={1}
            onPress={() => {
              if (item.value == '지역설정') {
              } else {
                PageChangeValue(item.value);
              }
            }}
            style={[
              {
                width: Width_convert(375 / Title.length),
                height: Height_convert(48),
                borderBottomWidth: 3,
                justifyContent: 'center',
                alignItems: 'center',
              },
              nowValue == item.value ? styles.pickView : styles.unPickView,
            ]}>
            <Text
              style={[
                {
                  fontFamily: Fonts?.NanumSquareRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                },
                nowValue == item.value ? styles.pickText : styles.unPickText,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};
TabBarBottom.propTypes = {
  from: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  pickView: {
    borderBottomColor: '#000000',
  },
  unPickView: {
    borderBottomColor: '#AAAAAA',
  },
  pickText: {
    color: '#000000',
  },
  unPickText: {
    color: '#AAAAAA',
  },
});

export default TabBarBottom;
