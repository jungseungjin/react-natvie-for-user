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
import StatusBarHeight from '../../StatusBarHeight';
const TabBar = (props) => {
  return (
    <View
      style={[
        {
          height: Height_convert(94) - StatusBarHeight,
        },
        props.Title == '투닝'
          ? styles.view
          : props.Title == '설정' || props.Title == '작업종류'
          ? styles.view2
          : props.Title == '드레스업' ||
            props.Title == '퍼포먼스' ||
            props.Title == '편의장치' ||
            props.Title == '캠핑카'
          ? styles.view2
          : styles.view2,
      ]}>
      {/*왼쪽덩어리 시작 */}
      {props.Title == '투닝' ? null : props.Title == '설정' ||
        props.Title == '작업종류' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.navigation.goBack();
          }}>
          {props.Title == '설정' ? (
            <GoBack
              fill={'#000000'}
              style={{marginLeft: Width_convert(22)}}></GoBack>
          ) : (
            <X fill={'#000000'} style={{marginLeft: Width_convert(22)}}></X>
          )}
        </TouchableOpacity>
      ) : props.Title == '드레스업' ||
        props.Title == '퍼포먼스' ||
        props.Title == '편의장치' ||
        props.Title == '캠핑카' ? (
        <TouchableOpacity
          activeOpacity={1}
          style={{}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <GoBack
            fill={'#000000'}
            style={{marginLeft: Width_convert(22)}}></GoBack>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={{}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <GoBack
            fill={'#000000'}
            style={{marginLeft: Width_convert(22)}}></GoBack>
        </TouchableOpacity>
      )}
      {/*왼쪽덩어리 끝 */}
      {/*가운데덩어리 시작 */}
      <Text
        style={
          props.Title == '투닝'
            ? styles.text
            : props.Title == '설정' || props.Title == '작업종류'
            ? styles.text2
            : props.Title == '드레스업' ||
              props.Title == '퍼포먼스' ||
              props.Title == '편의장치' ||
              props.Title == '캠핑카'
            ? styles.text2
            : styles.text2
        }>
        {props.Title}
      </Text>
      {/*가운데덩어리 끝 */}
      {/*오른쪽덩어리 시작 */}
      {props.Title == '투닝' ? null : props.Title == '설정' ||
        props.Title == '작업종류' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (props.Title == '작업종류') {
              props.getDataAndNavigate();
            } else if (props.Title == '설정') {
              props.PushReduxData();
            }
          }}>
          <Text
            style={{
              marginRight: Width_convert(22),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(14),
              color: '#946AEF',
            }}>
            완료
          </Text>
        </TouchableOpacity>
      ) : props.Title == '드레스업' ||
        props.Title == '퍼포먼스' ||
        props.Title == '편의장치' ||
        props.Title == '캠핑카' ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Text
            style={{
              marginRight: Width_convert(22),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(14),
              color: '#FFFFFF',
            }}>
            완료
          </Text>
        </View>
      ) : (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Text
            style={{
              marginRight: Width_convert(22),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(14),
              color: '#FFFFFF',
            }}>
            완료
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
  text2: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(16),
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
});

TabBar.propTypes = {
  Title: PropTypes.string.isRequired,
};
export default TabBar;
