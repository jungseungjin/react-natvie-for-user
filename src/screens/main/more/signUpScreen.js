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

const SignUp = (props) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'회원가입'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          borderTopColor: 'rgba(219, 219, 219, 0.35);',
          borderTopWidth: 1,
        }}></View>
      <View
        style={{
          marginTop: Height_convert(57),
          marginLeft: Width_convert(53),
          marginRight: Width_convert(53),
          width: Width_convert(375 - 106),
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumGothicRegular || null,
            fontSize: Font_normalize(18),
            fontWeight: '700',
            color: '#000000',
          }}>
          모두가 즐길 수 있는 투명한 튜닝 문화를 만들어 나갈 수 있도록
          노력하겠습니다.
        </Text>
      </View>
      {/**전체 동의 ~ 투닝혜택알림동의*/}
      <View
        style={{
          marginTop: Height_convert(48),
          marginRight: Width_convert(30),
          marginLeft: Width_convert(30),
          width: Width_convert(315),
          height: Height_convert(250),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{
            width: Width_convert(315),
            height: Width_convert(45),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: Font_normalize(5),
            backgroundColor: 'rgba(196, 196, 196, 0.3)',
          }}>
          <Text
            style={{
              marginLeft: Width_convert(16),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#000000',
            }}>
            전체동의
          </Text>
          <CheckBox
            style={{
              marginRight: Width_convert(16),
            }}></CheckBox>
        </TouchableOpacity>
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(26),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              투닝 이용약관 동의
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(16),
            }}>
            <CheckBox></CheckBox>
          </TouchableOpacity>
        </View>
        {/*만 14세 이상 확인 */}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              만 14세 이상 확인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(16),
            }}>
            <CheckBox></CheckBox>
          </TouchableOpacity>
        </View>

        {/*만 14세 이상 확인 */}

        {/*개인정보 수집이용 동의*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              개인정보 수집이용 동의
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(16),
            }}>
            <CheckBox></CheckBox>
          </TouchableOpacity>
        </View>

        {/*개인정보 수집이용 동의*/}
        {/*위치기반 서비스 이용약관(선택)*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              위치기반 서비스 이용약관(선택)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(16),
            }}>
            <CheckBox></CheckBox>
          </TouchableOpacity>
        </View>

        {/*위치기반 서비스 이용약관(선택)*/}
        {/*개인정보 제3자 제공 동의(선택)*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              개인정보 제3자 제공 동의(선택)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(16),
            }}>
            <CheckBox></CheckBox>
          </TouchableOpacity>
        </View>

        {/*개인정보 제3자 제공 동의(선택)*/}
        {/*투닝 혜택 알림 동의(선택)*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
              }}>
              투닝 혜택 알림 동의(선택)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(16),
            }}>
            <CheckBox></CheckBox>
          </TouchableOpacity>
        </View>

        {/*투닝 혜택 알림 동의(선택)*/}
      </View>
      {/**전체 동의 ~ 투닝혜택알림동의 */}

      <View
        style={{
          marginTop: Height_convert(160),
          marginRight: Width_convert(19),
          marginLeft: Width_convert(19),
          width: Width_convert(337),
          height: Width_convert(45),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate('SignUpInformation');
          }}
          style={{
            width: Width_convert(337),
            height: Width_convert(45),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Font_normalize(5),
            backgroundColor: 'rgba(196, 196, 196, 0.3)',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#FFFFFF',
            }}>
            다음단계
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
