import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Width_convert.js';
import {Fonts} from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Swiper from 'react-native-swiper';
import Width_convert from '../../../components/Width_convert';
import Star from '../../../../assets/home/star.svg';
import BraketUp from '../../../../assets/home/braket_up.svg';
import BraketDown from '../../../../assets/home/braket_down.svg';
import Vertical_bar from '../../../../assets/home/vertical_bar.svg';

import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Dot from '../../../components/Home/Swiper/dot.js';
import ActiveDot from '../../../components/Home/Swiper/activeDot.js';
import SwiperImage from '../../../components/Home/Swiper/swiperImage.js';
import SettingButton from '../../../components/Home/Setting/settingButton.js';
import BottomInformationOpen from '../../../components/Home/BottomInformation/bottomInformationOpen.js';
import BottomInformationDefault from '../../../components/Home/BottomInformation/bottomInformationDefault.js';
import TabMore from '../../../components/Home/TabMore/tabMore.js';
import OwnersWork from '../../../components/Home/horizontalScroll/ownersWork';
import RecentWork from '../../../components/Home/horizontalScroll/recentWork.js';
import Search from '../../../components/Home/Search/search.js';

const HomeScreen = ({navigation, route}) => {
  /*
<StatusBar barStyle="dark-content" />
<StatusBar barStyle="light-content" />
Default status bar style (dark for iOS, light for Android)
*/
  const [isLoading, setIsLoading] = React.useState(false);
  const [showInformation, setShowInformation] = React.useState(false);

  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollToEnd({
      animated: true,
    });
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          <Tabbar Title={'투닝'}></Tabbar>
          <Swiper
            style={{height: Height_convert(211)}}
            autoplay={true}
            autoplayTimeout={4.5}
            dot={<Dot></Dot>}
            activeDot={<ActiveDot></ActiveDot>}>
            <SwiperImage
              from={'home'}
              image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
            <SwiperImage
              from={'home'}
              image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
            <SwiperImage
              from={'home'}
              image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
          </Swiper>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(313),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(18),
                marginTop: Height_convert(32),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(18),
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <SettingButton
                  Title={'설정'}
                  Type={'work'}
                  navigation={navigation}></SettingButton>
                <SettingButton
                  Title={'차종 / 지역'}
                  Type={'car'}
                  navigation={navigation}></SettingButton>
              </View>
            </View>

            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(74),
                marginTop: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(74),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <SettingButton
                  Title={'드레스업'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 외장을 꾸미고 싶을 때'}
                  navigation={navigation}></SettingButton>
                <SettingButton
                  Title={'퍼포먼스'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 성능을 높이고 싶을 때'}
                  navigation={navigation}></SettingButton>
              </View>
            </View>
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(74),
                marginTop: Height_convert(12),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: Width_convert(337),
                  height: Height_convert(74),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <SettingButton
                  Title={'편의장치'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 풍부한 옵션이 필요할 때'}
                  navigation={navigation}></SettingButton>
                <SettingButton
                  Title={'캠핑카 튜닝'}
                  Type={'workDetail'}
                  SubTitle={'캠핑을 위한 튜닝을 하고 싶을 때'}
                  navigation={navigation}></SettingButton>
              </View>
            </View>
            <Search navigation={navigation} route={route}></Search>
          </View>

          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(370),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginTop: Height_convert(32),
                width: Width_convert(375),
                height: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TabMore Title={'사장님의 작업영상'}></TabMore>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: Height_convert(16),
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <OwnersWork
                  Title={
                    '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈'
                  }
                  ImageUrl={'https://unsplash.it/400/400?image=1'}
                  OwnersImage={'https://unsplash.it/400/400?image=1'}
                  OwnersStore={'모토리 튜닝샵'}
                  Index={0}></OwnersWork>
                <OwnersWork
                  Title={
                    '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈'
                  }
                  ImageUrl={'https://unsplash.it/400/400?image=1'}
                  OwnersImage={'https://unsplash.it/400/400?image=1'}
                  OwnersStore={'모토리 튜닝샵'}
                  Index={1}></OwnersWork>
                <OwnersWork
                  Title={
                    '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈'
                  }
                  ImageUrl={'https://unsplash.it/400/400?image=1'}
                  OwnersImage={'https://unsplash.it/400/400?image=1'}
                  OwnersStore={'모토리 튜닝샵'}
                  Index={2}></OwnersWork>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(315),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginTop: Height_convert(32),
                width: Width_convert(375),
                height: Height_convert(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TabMore Title={'최근 본 작업'}></TabMore>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                width: Width_convert(375),
                height: Height_convert(185),
                marginTop: Height_convert(16),
              }}>
              <RecentWork
                Title={'아우디 Q7 ABTLINE 바디킷'}
                ImageUrl={'https://unsplash.it/400/400?image=1'}
                OwnersStore={'모토리 튜닝샵'}
                Average={4.8}
                Review={10}
                Address={'서울특별시 강남구 청담동'}
                Price={300}
                Index={0}
                navigation={navigation}></RecentWork>
              <RecentWork
                Title={'아우디 Q7 ABTLINE 바디킷'}
                ImageUrl={'https://unsplash.it/400/400?image=1'}
                OwnersStore={'모토리 튜닝샵'}
                Average={4.8}
                Review={10}
                Address={'서울특별시 강남구 청담동'}
                Price={300}
                Index={1}></RecentWork>
              <RecentWork
                Title={'아우디 Q7 ABTLINE 바디킷'}
                ImageUrl={'https://unsplash.it/400/400?image=1'}
                OwnersStore={'모토리 튜닝샵'}
                Average={4.8}
                Review={10}
                Address={'서울특별시 강남구 청담동'}
                Price={300}
                Index={2}></RecentWork>
            </ScrollView>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(155),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}
            //{showInformation ? {height : Height_convert(216)} : {height :Height_convert(155)}}
          >
            <View
              style={{
                marginLeft: Width_convert(12),
                marginTop: Height_convert(11),
                width: Width_convert(351),
                height: Height_convert(144),
                //{showInformation ? {height : Height_convert(205)} : {height :Height_convert(144)}}
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (!showInformation) {
                    handleClick();
                  }
                  setShowInformation(!showInformation);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(9),
                    color: '#3F3F3F',
                    marginRight: Width_convert(5),
                  }}>
                  투닝
                </Text>
                {showInformation ? (
                  <BraketDown></BraketDown>
                ) : (
                  <BraketUp></BraketUp>
                )}
              </TouchableOpacity>
              {showInformation ? (
                <BottomInformationOpen></BottomInformationOpen>
              ) : null}
              <BottomInformationDefault></BottomInformationDefault>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
const styles = StyleSheet.create({});
export default HomeScreen;
