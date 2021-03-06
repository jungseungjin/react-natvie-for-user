import React, {useRef, memo} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Width_convert.js';
import Height_convert_real from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X_grayRound from '../../../../assets/home/x_grayRound.svg';
import Filter from '../../../../assets/home/filter.svg';
import BlankBox from '../../../../assets/home/blank_box.svg';
import DisabledBox from '../../../../assets/home/disabled_box.svg';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import QuestionRound from '../../../../assets/home/question_round.svg';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import SearchStore from '../../../components/Home/Search/searchStore.js';
import StatusBarHeight from '../../StatusBarHeight';

const styles = StyleSheet.create({
  view: {
    // Platform.OS == 'android'
    //   ? {
    //       height:
    //         Height_convert_real(818) -
    //         Height_convert(139) -
    //         StatusBarHeight,
    //     }
    //   : {
    //       height: Height_convert_real(818) - Height_convert(139),
    //     },
    // {
    //   width: Width_convert(375),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNested: {
    width: Width_convert(245),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(16),
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
});

const SearchNull = (props) => {
  return (
    <View style={styles.view}>
      <View style={styles.viewNested}>
        <Text style={styles.text}>
          {'원하시는 검색결과가 나올 수 있도록\n 노력하는 투닝이 되겠습니다 🔥'}
        </Text>
      </View>
    </View>
  );
};
export default memo(SearchNull);
