import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import BottomSignUpButton from '../../../components/More/SignUp/bottomSignUpButton.js';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import VirticalBar from '../../../../assets/home/vertical_bar.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
const LoginScreen = (props) => {
  const insets = useSafeAreaInsets();
  const [idText, setIdText] = React.useState('');
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <DismissKeyboard>
        <SafeAreaView
          style={{
            backgroundColor: 'white',
            width: Width_convert(375),
            height: Height_convert(812),
          }}>
          <View
            style={{
              marginTop: Height_convert(170),
              width: Width_convert(375),
              height: Height_convert(812),
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Width_convert(260),
                  height: Height_convert(64),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(24),
                    color: '#000000',
                    textAlign: 'right',
                    marginRight: Width_convert(4),
                    lineHeight: Font_normalize(27),
                  }}>
                  내가원하는튜닝부터{'\n'}투명한가격까지
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.Swagger || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(62),
                    color: '#000000',
                  }}>
                  투닝
                </Text>
              </View>
              <View
                style={{
                  marginTop: Height_convert(26),
                  width: Width_convert(273),
                  height: Height_convert(177),
                }}>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(33),
                  }}>
                  <TextInput
                    placeholder="아이디를 입력해주세요"
                    placeholderTextColor={'rgba(0,0,0,0.45)'}
                    placeholderStyle={{
                      fontSize: Font_normalize(11),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}
                    onChangeText={(idText) => setIdText(idText)}
                    autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    autoCorrect={false}
                    keyboardType="default"
                    value={idText}
                    style={{
                      paddingLeft: Width_convert(9),
                      backgroundColor: 'rgba(196, 196, 196, 0.4)',
                      width: Width_convert(273),
                      height: Height_convert(33),
                      borderRadius: Font_normalize(4),
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontSize: Font_normalize(11),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}></TextInput>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(33),
                    marginTop: Height_convert(11),
                  }}>
                  <TextInput
                    placeholder="비밀번호를 입력해주세요"
                    placeholderTextColor={'rgba(0,0,0,0.45)'}
                    onChangeText={(idText) => setIdText(idText)}
                    autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    autoCorrect={false}
                    keyboardType="default"
                    value={idText}
                    placeholderStyle={{
                      fontSize: Font_normalize(11),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}
                    style={{
                      paddingLeft: Width_convert(9),
                      backgroundColor: 'rgba(196, 196, 196, 0.4)',
                      width: Width_convert(273),
                      height: Height_convert(33),
                      borderRadius: Font_normalize(4),
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontSize: Font_normalize(11),
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '700',
                    }}></TextInput>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(44),
                    marginTop: Height_convert(19),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      width: Width_convert(273),
                      height: Height_convert(44),
                      backgroundColor: '#000000',
                      borderRadius: Font_normalize(7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: Font_normalize(16),
                        fontWeight: '700',
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        color: '#FFFFFF',
                      }}>
                      로그인
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: Width_convert(273),
                    height: Height_convert(44),
                    marginTop: Height_convert(25),
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity style={{marginRight: Width_convert(15)}}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#9A9A9A',
                      }}>
                      아이디 찾기
                    </Text>
                  </TouchableOpacity>
                  <VirticalBar
                    style={{marginRight: Width_convert(15)}}></VirticalBar>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(10),
                        color: '#9A9A9A',
                      }}>
                      비밀번호 찾기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*하단 회원가입 안내 버튼 시작 */}
            <View style={{position: 'absolute', top: Height_convert(550)}}>
              <BottomSignUpButton
                navigation={props.navigation}></BottomSignUpButton>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(insets.bottom),
                }}></View>
            </View>
            {/*하단 회원가입 안내 버튼 끝 */}
            {/**ios 하단 indicator */}
          </View>
        </SafeAreaView>
      </DismissKeyboard>
    </View>
  );
};

export default LoginScreen;
