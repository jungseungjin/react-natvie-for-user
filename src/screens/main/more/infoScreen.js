import React from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import PurplePlus from '../../../../assets/home/purple_plus.svg';
import WorkInformation from '../../../components/Home/Infomation/workInformation.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const InfoScreen = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'내정보'} navigation={props.navigation}></Tabbar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flexGrow: 1,
          width: Width_convert(375),
          minHeight: Height_convert(812),
        }}>
        <View
          style={{
            width: Width_convert(375),
            minHeight: Height_convert(812),
          }}>
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(263 - 94 - 57),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{
                width: Width_convert(78),
                height: Width_convert(78),
                borderRadius: Width_convert(78),
              }}
              source={{
                uri: 'https://unsplash.it/400/400?image=1',
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}></FastImage>
          </View>
          {/*이름 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
              height: Width_convert(57),
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                height: Width_convert(57),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                이름
              </Text>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#000000',
                }}>
                백준열
              </Text>
            </View>
          </View>
          {/*이름 끝 */}
          {/*닉네임 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
              height: Width_convert(57),
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                height: Width_convert(57),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                닉네임
              </Text>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#000000',
                }}>
                투링의순정
              </Text>
            </View>
          </View>
          {/*닉네임 끝 */}
          {/*휴대폰번호 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
              height: Width_convert(57),
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                height: Width_convert(57),
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  width: Width_convert(70),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                휴대폰번호
              </Text>
              <Text
                style={{
                  width: Width_convert(230),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#A7A7A7',
                }}>
                01232223232
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#C1C1C1',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    padding: Width_convert(5),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  재인증
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*휴대폰번호 끝 */}
          {/*지역 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
              height: Width_convert(57),
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                height: Width_convert(57),
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  width: Width_convert(28),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                지역
              </Text>
              <Text
                style={{
                  width: Width_convert(272),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#000000',
                }}>
                광주 북구 용봉동
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#C1C1C1',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    padding: Width_convert(5),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  재인증
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*지역 끝 */}
          {/*차종 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
            }}>
            {/**하나랑 두개 스타일 다름. */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                //height: Width_convert(57),//하나있을때
                //두개부터는 height없애고
                marginTop: Width_convert(21),

                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  width: Width_convert(28),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                차종
              </Text>
              <Text
                style={{
                  width: Width_convert(234),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#000000',
                }}>
                기아 스팅어, 2.0T, 17~19년형
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  marginRight: Width_convert(5),
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#C1C1C1',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                  }}>
                  변경
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#EF6666',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                  }}>
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Width_convert(12),
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  width: Width_convert(28),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#FFFFFF',
                  marginRight: Width_convert(13),
                }}>
                차종
              </Text>
              <Text
                style={{
                  width: Width_convert(234),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#000000',
                }}>
                기아 스팅어, 2.0T, 17~19년형
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  marginRight: Width_convert(5),
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#C1C1C1',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                  }}>
                  변경
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#EF6666',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                  }}>
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: Width_convert(21),
                marginBottom: Width_convert(21),
                width: Width_convert(375),
                height: Height_convert(28),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                <PurplePlus></PurplePlus>
              </TouchableOpacity>
            </View>
          </View>
          {/*차종 끝 */}
          {/*아이디 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
              height: Width_convert(57),
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                height: Width_convert(57),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                아이디
              </Text>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(16),
                  color: '#000000',
                }}>
                eoqwmmfkdsno@nabef.fefew
              </Text>
            </View>
          </View>
          {/*아이디 끝 */}
          {/*비밀번호 시작 */}
          <View
            style={{
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              width: Width_convert(375),
              height: Width_convert(57),
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: Width_convert(16),
                marginRight: Width_convert(11),
                width: Width_convert(375 - 27),
                height: Width_convert(57),
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  width: Width_convert(56),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#C4C4C4',
                  marginRight: Width_convert(13),
                }}>
                비밀번호
              </Text>
              <Text
                style={{
                  width: Width_convert(244),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(12),
                  color: 'rgba(0, 0, 0, 0.2)',
                }}>
                영문+숫자+특수문자 8~20자
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  width: Width_convert(35),
                  height: Width_convert(20),
                  backgroundColor: '#C1C1C1',
                  borderRadius: Font_normalize(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    padding: Width_convert(5),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#FFFFFF',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  변경
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*비밀번호 끝 */}
          {/*마케팅 정보 수신 동의 시작 */}
          <View style={{marginTop: Height_convert(19)}}>
            <Text
              style={{
                marginLeft: Width_convert(17),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(16),
                color: '#000000',
              }}>
              마케팅 정보 수신 동의
            </Text>
            <Text
              style={{
                marginLeft: Width_convert(17),
                marginTop: Height_convert(8),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(9),
                color: '#000000',
              }}>
              튜닝의 순정에서 보내드리는 다양한 정보를 받으실 수 있습니다
            </Text>
            <View
              style={{
                width: Width_convert(375),
                marginTop: Height_convert(11),
              }}>
              <View
                style={{
                  marginTop: Height_convert(8),
                  marginLeft: Width_convert(17),
                  width: Width_convert(339),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>카카오톡 수신동의</Text>
                <CheckedBox
                  width={Width_convert(14)}
                  height={Width_convert(14)}></CheckedBox>
              </View>
              <View
                style={{
                  marginTop: Height_convert(8),
                  marginLeft: Width_convert(17),
                  width: Width_convert(339),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>메일 수신동의</Text>
                <CheckBox
                  width={Width_convert(14)}
                  height={Width_convert(14)}></CheckBox>
              </View>
              <View
                style={{
                  marginTop: Height_convert(8),
                  marginLeft: Width_convert(17),
                  width: Width_convert(339),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>SMS 수신동의</Text>
                <CheckedBox
                  width={Width_convert(14)}
                  height={Width_convert(14)}></CheckedBox>
              </View>
            </View>
          </View>
          {/*마케팅 정보 수신 동의 끝 */}
          {/**로그아웃 회원탈퇴버튼 시작 */}
          <View
            style={{
              marginTop: Height_convert(26),
              width: Width_convert(375),
              height: Height_convert(50),
              backgroundColor: '#F0F0F0',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: Width_convert(375) / 2,
                height: Height_convert(50),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#797979',
                  }}>
                  로그아웃
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: Width_convert(375) / 2,
                height: Height_convert(50),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#797979',
                  }}>
                  회원탈퇴
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/**로그아웃 회원탈퇴버튼 끝 */}
        </View>

        {/*하단 버튼만큼의 공간 띄우기 시작 */}
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(insets.bottom),
            backgroundColor: '#F0F0F0',
          }}></View>
        {/*하단 버튼만큼의 공간 띄우기 끝 */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;
