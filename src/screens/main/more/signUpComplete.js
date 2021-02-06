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
const SignUpComplete = (props) => {
  const insets = useSafeAreaInsets();
  const [idText, setIdText] = React.useState('');
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
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
          }}>
          <View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                width: Width_convert(268),
                marginLeft: Width_convert(51),
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
                marginTop: Height_convert(22),
                marginLeft: Width_convert(86),
                width: Width_convert(203),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts?.NanumBrushScript || null,
                  fontSize: Font_normalize(45),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                투닝 회원가입을{'\n'}
                축하드립니다
              </Text>
            </View>
            <View
              style={{
                marginTop: Height_convert(43),
                width: Width_convert(334),
                marginLeft: Width_convert(20),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(13),
                  color: '#000000',
                }}>
                자동차 튜닝에 관심있는 모든 사람과 함께 긍정적이고 열린
                튜닝문화를 만들어나가는 투닝이 되겠습니다.
              </Text>
            </View>
            {/* 로그인하기*/}
            <View
              style={{
                marginRight: Width_convert(19),
                marginLeft: Width_convert(19),
                marginTop: Height_convert(133),
                width: Width_convert(337),
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Width_convert(46),
                  marginTop: Height_convert(19),
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {}}
                  style={{
                    width: Width_convert(337),
                    height: Width_convert(46),
                    backgroundColor: '#946AEF',
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
                    로그인 하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/*로그인하기 */}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpComplete;
