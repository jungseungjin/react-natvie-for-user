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
const OneOnOne = (props) => {
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
              문의내역
            </Text>
          </View>
          <View
            style={{
              width: Width_convert(90),
              backgroundColor: '#FFFFFF',
              marginRight: 0,
              marginLeft: 'auto',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate('OneOnOneRegister');
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: Width_convert(22),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                  color: '#946AEF',
                }}>
                문의작성
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*탑바 대체 끝 */}
        {/*문의 리스트 시작 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: Height_convert(20),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('OneOnOneView');
            }}
            style={{
              width: Width_convert(375),
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginLeft: Width_convert(12),
                marginRight: Width_convert(12),
                width: Width_convert(375 - 24), //351
                height: Height_convert(93),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: Width_convert(250)}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(16),
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                  작업시간이 수정이 안되요.
                </Text>
                <Text
                  style={{
                    marginTop: Height_convert(10),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(10),
                    fontWeight: '400',
                    color: '#393939',
                  }}>
                  2020년 7월 30일
                </Text>
              </View>
              <View style={{width: Width_convert(100)}}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(16),
                    color: '#37A0DB',
                  }}>
                  답변완료
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('OneOnOneView');
            }}
            style={{
              width: Width_convert(375),
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginLeft: Width_convert(12),
                marginRight: Width_convert(12),
                width: Width_convert(375 - 24), //351
                height: Height_convert(93),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: Width_convert(250)}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(16),
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                  작업시간이 수정이 안되요.
                </Text>
                <Text
                  style={{
                    marginTop: Height_convert(10),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(10),
                    fontWeight: '400',
                    color: '#393939',
                  }}>
                  2020년 7월 30일
                </Text>
              </View>
              <View style={{width: Width_convert(100)}}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(16),
                    color: '#37A0DB',
                  }}>
                  답변완료
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {/*문의 리스트 끝 */}
      </SafeAreaView>
    </>
  );
};

export default OneOnOne;
