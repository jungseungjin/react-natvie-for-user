import React, {memo} from 'react';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import KakaoTalkLogo from '../../../../assets/home/KakaoTalkLogo.svg';
import CallLogo from '../../../../assets/home/CallLogo.svg';
const styles = StyleSheet.create({
  view: {},
});
const BottomButton = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: Width_convert(375),
        height: Width_convert(55) + Height_convert(insets.bottom),
        position: 'absolute',
        bottom: 0,
      }}>
      <View
        style={{
          height: Width_convert(55),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log(props.Messenger);
            Linking.openURL(props.Messenger);
          }}
          style={{
            height: Width_convert(55),
            width: Width_convert(375) / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FEE500',
            flexDirection: 'row',
          }}>
          <KakaoTalkLogo
            width={Width_convert(23)}
            height={Width_convert(23)}
            style={{marginRight: Width_convert(6)}}></KakaoTalkLogo>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(15),
              fontWeight: '700',
              color: '#391B1B',
            }}>
            카카오 상담
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.WorkConsultingModalChangeValue(true);
          }}
          style={{
            height: Width_convert(55),
            width: Width_convert(375) / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9B6FAB',
            flexDirection: 'row',
          }}>
          <CallLogo
            fill={'#EEEEEE'}
            style={{marginRight: Width_convert(4.8)}}></CallLogo>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(15),
              fontWeight: '700',
              color: '#EEEEEE',
            }}>
            작업 상담
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: Height_convert(insets.bottom),
          backgroundColor: '#FFFFFF',
        }}></View>
    </View>
  );
};
export default memo(BottomButton);
