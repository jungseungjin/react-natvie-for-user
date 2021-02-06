import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
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
import DismissKeyboard from '../../../components/DismissKeyboard.js';
const SignUpInformation = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [authButtonClick, setAuthButtonClick] = React.useState(false);
  const [authNumber, setAuthNumber] = React.useState('');
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'회원가입4'} navigation={props.navigation}></Tabbar>
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={30}>
        <DismissKeyboard>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flexGrow: 1,
              width: Width_convert(375),
            }}>
            <View
              style={{
                marginLeft: Width_convert(24),
                marginRight: Width_convert(24),
                marginTop: Height_convert(50),
                width: Width_convert(327),
              }}>
              {/*이름 */}
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
              {/*이름 */}
              {/*이메일 */}
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
                    underlineColorAndroid="transparent"
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
                      color: '#CCCCCC',
                    }}>
                    중복확인
                  </Text>
                </TouchableOpacity>
              </View>
              {/*이메일 */}
              {/**닉네임 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="닉네임_한글+영문+숫자 2~10자, 띄어쓰기 불가"
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
              </View>
              {/**비밀번호 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="비밀번호_영문+숫자+특수문자 8~20자"
                  placeholderTextColor="#CCCCCC"
                  value={phoneNumber}
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
              </View>
              {/**생년월일 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="생년월일_1994.01.11"
                  placeholderTextColor="#CCCCCC"
                  value={phoneNumber}
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
              </View>
              {/*차종*/}
              <View
                style={{
                  borderBottomWidth: 1,
                  width: Width_convert(327),
                  height: Width_convert(73),
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="차종"
                  placeholderTextColor="#CCCCCC"
                  value={phoneNumber}
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
              </View>
              {/*지역 */}
              <View
                style={{
                  marginTop: Width_convert(35),
                  width: Width_convert(327),
                  height: Width_convert(73),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: Width_convert(285),
                    height: Width_convert(35),
                  }}>
                  <TextInput
                    placeholder="가게와의 거리를 알기 위한 지역설정이 필요해요"
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
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {}}
                  style={{
                    width: Width_convert(35),
                    height: Width_convert(35),
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomColor: '#CCCCCC',
                    borderTopColor: '#CCCCCC',
                    borderLeftColor: '#CCCCCC',
                    borderRightColor: '#CCCCCC',
                    borderRadius: Font_normalize(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Search></Search>
                </TouchableOpacity>
              </View>

              {/*지역설정버튼 */}
              <View
                style={{
                  marginTop: Width_convert(15),
                  width: Width_convert(327),
                  height: Width_convert(46),
                  borderRadius: Font_normalize(3),
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomColor: '#CCCCCC',
                  borderTopColor: '#CCCCCC',
                  borderLeftColor: '#CCCCCC',
                  borderRightColor: '#CCCCCC',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {}}
                  style={{}}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    지역 설정하기
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: Width_convert(9),
                  marginBottom: Width_convert(50),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(9),
                    fontWeight: '400',
                    color: '#000000',
                  }}>
                  *지역 설정하기 버튼을 누르시면 자동으로 주소설정이 됩니다.
                </Text>
              </View>
            </View>
          </ScrollView>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignUpInformation;
