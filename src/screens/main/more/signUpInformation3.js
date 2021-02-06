import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {TextInput} from 'react-native-gesture-handler';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
const SignUpInformation = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [authButtonClick, setAuthButtonClick] = React.useState(false);
  const [authNumber, setAuthNumber] = React.useState('');
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'회원가입3'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          marginLeft: Width_convert(24),
          marginRight: Width_convert(24),
          marginTop: Height_convert(50),
          width: Width_convert(327),
          height: Width_convert(95),
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            width: Width_convert(327),
            height: Width_convert(35),
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="회원님의 성함을 적어주세요"
            placeholderTextColor="#CCCCCC"
            value={phoneNumber}
            onChangeText={(value) => {
              setPhoneNumber(value);
            }}
            placeholderStyle={{
              paddingLeft: Width_convert(10),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
              lineHeight: Font_normalize(14),
            }}
            style={{
              height: Width_convert(40),
              paddingLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
              lineHeight: Font_normalize(14),
            }}></TextInput>
        </View>

        <View
          style={{
            width: Width_convert(327),
            height: Width_convert(73),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              marginRight: Width_convert(13),
              width: Width_convert(243),
              height: Width_convert(44),
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
            }}>
            <TextInput
              placeholder="이메일 주소를 입력해주세요"
              placeholderTextColor="#CCCCCC"
              value={authNumber}
              onChangeText={(value) => {
                setAuthNumber(value);
              }}
              placeholderStyle={{
                paddingLeft: Width_convert(10),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
                lineHeight: Font_normalize(14),
              }}
              style={{
                height: Width_convert(40),
                paddingLeft: Width_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
                lineHeight: Font_normalize(14),
              }}></TextInput>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(71),
              height: Width_convert(29),
              borderRadius: Font_normalize(3),
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderRightColor: '#CCCCCC',
              borderLeftColor: '#CCCCCC',
              borderTopColor: '#CCCCCC',
              borderBottomColor: '#CCCCCC',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(11),
                fontWeight: '400',
                color: '#000000',
              }}>
              중복확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignUpInformation;
