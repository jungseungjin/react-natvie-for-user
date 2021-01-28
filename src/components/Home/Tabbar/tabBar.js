import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeModules,
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
const {StatusBarManager} = NativeModules;
const TabBar = ({navigation, Title, Page}) => {
  console.log(Page);
  const [statusBar, setStatusBar] = React.useState(0);
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);
  return (
    <View
      style={[
        {height: Height_convert(94) - statusBar},
        Title == '투닝'
          ? styles.view
          : Title == '설정' || Title == '작업종류'
          ? styles.view2
          : Title == '드레스업' ||
            Title == '퍼포먼스' ||
            Title == '편의장치' ||
            Title == '캠핑카'
          ? styles.view2
          : null,
      ]}>
      {Title == '투닝' ? null : Title == '설정' || Title == '작업종류' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}>
          {Title == '설정' ? (
            <GoBack style={{marginLeft: Width_convert(22)}}></GoBack>
          ) : (
            <X style={{marginLeft: Width_convert(22)}}></X>
          )}
        </TouchableOpacity>
      ) : Title == '드레스업' ||
        Title == '퍼포먼스' ||
        Title == '편의장치' ||
        Title == '캠핑카' ? (
        <TouchableOpacity
          activeOpacity={1}
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}>
          <GoBack style={{marginLeft: Width_convert(22)}}></GoBack>
        </TouchableOpacity>
      ) : null}
      <Text
        style={
          Title == '투닝'
            ? styles.text
            : Title == '설정' || Title == '작업종류'
            ? styles.text2
            : Title == '드레스업' ||
              Title == '퍼포먼스' ||
              Title == '편의장치' ||
              Title == '캠핑카'
            ? styles.text2
            : null
        }>
        {Title}
      </Text>
      {Title == '투닝' ? null : Title == '설정' || Title == '작업종류' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (Title == '작업종류') {
              navigation.navigate('CategoryDetail', {Page: Page});
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
      ) : Title == '드레스업' ||
        Title == '퍼포먼스' ||
        Title == '편의장치' ||
        Title == '캠핑카' ? (
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
      ) : null}
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
