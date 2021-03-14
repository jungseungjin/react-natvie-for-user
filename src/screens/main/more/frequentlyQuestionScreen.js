import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  LayoutAnimation,
} from 'react-native';
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
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const FrequentlyQuestionScreen = (props) => {
  const [page, setPage] = React.useState('TOP5');
  const PageChangeValue = (text) => setPage(text);
  const [dataList, setDataList] = React.useState([]);
  const [opneIndex, setOpneIndex] = React.useState(0);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'자주 묻는 질문'} navigation={props.navigation}></Tabbar>
        {/*상단 TOP5~기타 버튼 시작 */}
        <View
          style={{
            marginTop: Height_convert(12),
            marginLeft: Width_convert(17),
            width: Width_convert(341),
            height: Width_convert(115),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Width_convert(341),
              height: Width_convert(57),
              borderTopColor: '#EEEEEE',
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderLeftColor: '#EEEEEE',
            }}>
            <FrequentlyQuestionMenu
              Title={'TOP5'}
              index={0}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'회원정보'}
              index={1}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'예약관리'}
              index={2}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Width_convert(341),
              height: Width_convert(57),
              borderTopColor: '#EEEEEE',
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderLeftColor: '#EEEEEE',
            }}>
            <FrequentlyQuestionMenu
              Title={'후기관련'}
              index={0}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'이용문의'}
              index={1}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'기타'}
              index={2}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
          </View>
        </View>
        {/*상단 TOP5~기타 버튼 끝 */}
        <ScrollView
          style={{
            marginTop: Height_convert(20),
          }}>
          {opneIndex == 0 ? (
            <>
              <View
                style={{
                  marginTop: Height_convert(24),
                  width: Width_convert(375),
                  borderBottomWidth: 1,
                  borderBottomColor: '#EEEEEE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: Height_convert(24),
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setOpneIndex(1);
                  }}
                  style={{
                    width: Width_convert(340),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    작업시간이 수정이 안되요.
                  </Text>
                  <BracketDown
                    width={Width_convert(21)}
                    height={Width_convert(10)}></BracketDown>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: Height_convert(24),
                  width: Width_convert(375),
                  borderBottomWidth: 1,
                  borderBottomColor: '#EEEEEE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: Height_convert(24),
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setOpneIndex(1);
                  }}
                  style={{
                    width: Width_convert(340),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '700',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    }}>
                    작업시간이 수정이 안되요.
                  </Text>
                  <BracketDown
                    width={Width_convert(21)}
                    height={Width_convert(10)}></BracketDown>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                marginTop: Height_convert(24),
                width: Width_convert(375),
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setOpneIndex(0);
                }}
                style={{
                  width: Width_convert(340),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
                    color: '#000000',
                  }}>
                  작업시간이 수정이 안되요.
                </Text>
                <BracketDown
                  width={Width_convert(21)}
                  height={Width_convert(10)}></BracketDown>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  width: Width_convert(345),
                  paddingTop: Height_convert(15),
                  paddingBottom: Height_convert(15),
                  paddingLeft: Width_convert(10),
                  paddingRight: Width_convert(10),
                  backgroundColor: '#F0F0F0',
                  marginBottom: Height_convert(24),
                  marginTop: Height_convert(24),
                }}>
                <Text
                  style={{
                    width: Width_convert(323),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(12),
                    fontWeight: '700',
                    color: '#000000',
                    textAlign: 'justify',
                    lineHeight: Font_normalize(15),
                  }}>
                  가끔씩 트래픽이 몰릴시 수정이 안되는 경우가 있으니, 작업시간이
                  수정이 안될시 070-111-1111에 연락주시면 튜닝의순정에서
                  해결해드리도록 하겠습니다.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
          <IsLoading></IsLoading>
        ) : isLoadingAndModal === 2 ? (
          <NetworkErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NetworkErrModal>
        ) : isLoadingAndModal === 3 ? (
          <NormalErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NormalErrModal>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default FrequentlyQuestionScreen;
