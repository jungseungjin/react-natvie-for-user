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
const PasswordFindScreen2 = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [authButtonClick, setAuthButtonClick] = React.useState(false);
  const [authNumber, setAuthNumber] = React.useState('');
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'비밀번호 찾기2'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          marginLeft: Width_convert(24),
          marginRight: Width_convert(24),
          marginTop: Height_convert(50),
          width: Width_convert(327),
        }}>
        <View
          style={[
            {
              borderBottomWidth: 1,
              borderBottomColor: '#000000',
              width: Width_convert(327),
              height: Width_convert(35),
            },
            phoneNumber
              ? {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              : {
                  justifyContent: 'center',
                },
          ]}>
          <TextInput
            placeholder="비밀번호_영문+숫자+특수문자 8~20자"
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
          {phoneNumber ? (
            <XButton style={{marginRight: Width_convert(3)}}></XButton>
          ) : null}
        </View>

        {/**비밀번호 재입력 */}
        <View
          style={[
            {
              borderBottomWidth: 1,
              width: Width_convert(327),
              height: Width_convert(73),
            },
            phoneNumber
              ? {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              : {
                  justifyContent: 'center',
                },
          ]}>
          <TextInput
            placeholder="비밀번호 재입력"
            placeholderTextColor="#CCCCCC"
            value={phoneNumber}
            underlineColorAndroid="transparent"
            onChangeText={(value) => {
              setPhoneNumber(value);
            }}
            placeholderStyle={{
              marginTop: Width_convert(35),
              paddingLeft: Width_convert(10),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
            }}
            style={{
              marginTop: Width_convert(35),
              height: Width_convert(40),
              paddingLeft: Width_convert(5),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '400',
              color: '#000000',
            }}></TextInput>
          {phoneNumber ? (
            <XButton
              style={{
                marginRight: Width_convert(3),
                marginTop: Width_convert(35),
              }}></XButton>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PasswordFindScreen2;
