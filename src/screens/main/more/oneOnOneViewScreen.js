import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FrequentlyQuestionMenu from '../../../components/More/Menu/frequentlyQuestionMenu.js';
import BracketDown from '../../../../assets/home/braket_down.svg';
import BracketUp from '../../../../assets/home/braket_up.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import GoBack from '../../../../assets/home/goBack.svg';
import Enter from '../../../../assets/home/Enter.svg';
const OneOnOneView = (props) => {
  const [page, setPage] = React.useState('TOP5');
  const PageChangeValue = (text) => setPage(text);
  const [dataList, setDataList] = React.useState([]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        {/* <Tabbar Title={'문의내역'} navigation={props.navigation}></Tabbar> */}
        {/*탑바 대체 시작 */}
        <View
          style={{
            height: Height_convert(94) - StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: Width_convert(90),
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <GoBack
              fill={'#000000'}
              style={{marginLeft: Width_convert(22)}}></GoBack>
          </TouchableOpacity>
          <View
            style={{
              width: Width_convert(195),
            }}>
            <Text
              style={{
                marginRight: Width_convert(7),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: 'black',
                textAlign: 'center',
              }}>
              문의확인
            </Text>
          </View>
          <View
            style={{
              width: Width_convert(90),
              backgroundColor: '#FFFFFF',
              marginRight: 0,
              marginLeft: 'auto',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                //props.navigation.navigate('OneOnOneRegister');
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: Width_convert(12),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#63BEDB',
                }}>
                수정
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                //props.navigation.navigate('OneOnOneRegister');
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: Width_convert(22),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#FF0000',
                }}>
                삭제
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*탑바 대체 끝 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: Height_convert(20),
          }}>
          <View style={{width: Width_convert(375), backgroundColor: '#F5F5F5'}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#A8A8A8',
              }}>
              <View
                style={{
                  marginLeft: Width_convert(17),
                  marginRight: Width_convert(17),
                  width: Width_convert(375 - 34),
                  height: Width_convert(42),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                  }}>
                  작업시간이 수정이 안되요.
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(8),
                    color: '#9F9F9F',
                  }}>
                  2020년 7월 20일
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#A8A8A8',
                minHeight: Height_convert(116),
              }}>
              <View
                style={{
                  marginLeft: Width_convert(17),
                  marginRight: Width_convert(17),
                  width: Width_convert(375 - 34),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginTop: Height_convert(15),
                    marginBottom: Height_convert(15),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(13),
                    color: '#000000',
                  }}>
                  작업관리에 들어가서 등록한 작업을 수정하려고 하는데 수정오류가
                  있습니다.
                </Text>
              </View>
            </View>

            <View
              style={{
                minHeight: Height_convert(110),
              }}>
              <View
                style={{
                  marginTop: Height_convert(15),
                  marginBottom: Height_convert(15),
                  marginLeft: Width_convert(17),
                  marginRight: Width_convert(17),
                  width: Width_convert(375 - 34),
                }}>
                <View
                  style={{
                    height: Height_convert(20),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Enter></Enter>
                  <View
                    style={{
                      width: Width_convert(375 - 34 - 11),
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: Height_convert(5),
                      marginLeft: Width_convert(11),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(11),
                        fontWeight: '700',
                        color: '#37A0DB',
                      }}>
                      답변 튜닝 담당자
                    </Text>
                    <Text
                      style={{
                        marginRight: Width_convert(17),
                        textAlign: 'right',
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(8),
                        fontWeight: '400',
                        color: '#9F9F9F',
                      }}>
                      2020년 7월 30일
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    width: Width_convert(375 - 34 - 11 - 11),
                    marginLeft: Width_convert(17 + 11),
                    marginTop: Height_convert(15),
                    marginBottom: Height_convert(15),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(13),
                    color: '#000000',
                  }}>
                  작업관리에 들어가서 등록한 작업을 수정하려고 하는데 수정오류가
                  있습니다.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OneOnOneView;
