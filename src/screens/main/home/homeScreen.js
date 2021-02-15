import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ShadowPropTypesIOS,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
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
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import {useSelector} from 'react-redux';
const HomeScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [topSliderImageList, setTopSliderImageList] = React.useState([
    {URL: 'https://unsplash.it/400/400?image=1'},
    {URL: 'https://unsplash.it/400/400?image=2'},
    {URL: 'https://unsplash.it/400/400?image=3'},
  ]);
  const [ownersWokrVideoList, setOwnersWokrVideoList] = React.useState([
    {
      URL: 'https://unsplash.it/400/400?image=1',
      Title:
        '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈',
      OwnersStore: '모토리 튜닝샵',
      OwnersImage: 'https://unsplash.it/400/400?image=1',
    },
    {
      URL: 'https://unsplash.it/400/400?image=2',
      Title:
        '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈',
      OwnersStore: '모토리 튜닝샵',
      OwnersImage: 'https://unsplash.it/400/400?image=2',
    },
    {
      URL: 'https://unsplash.it/400/400?image=3',
      Title:
        '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈',
      OwnersStore: '모토리 튜닝샵',
      OwnersImage: 'https://unsplash.it/400/400?image=3',
    },
  ]);
  const [recentWorkList, setRecentWorkList] = React.useState([
    {
      URL: 'https://unsplash.it/400/400?image=4',
      Title: '아우디 Q7 ABTLINE 바디킷',
      OwnersStore: '모토리 튜닝샵',
      Average: 4.8,
      Review: 343,
      Address: '서울특별시 강남구 청담동',
      Price: 30000,
    },
    {
      URL: 'https://unsplash.it/400/400?image=5',
      Title: '아우디 Q7 ABTLINE 바디킷',
      OwnersStore: '모토리 튜닝샵2',
      Average: 4,
      Review: 2,
      Address: '서울특별시 강남구 청동',
      Price: 1000000,
    },
    {
      URL: 'https://unsplash.it/400/400?image=6',
      Title: '아우디 Q7 ABTLINE 바디킷',
      OwnersStore: '모토리 튜닝샵3',
      Average: 4.2,
      Review: 214,
      Address: '서울특별시 강남구 담동',
      Price: 70000000,
    },
  ]);
  const [showInformation, setShowInformation] = React.useState(false);
  const scrollRef = useRef();
  const handleClick = () => {
    scrollRef.current.scrollToEnd({
      animated: true,
    });
  };
  console.log(reduexState.loginDataCheck.login);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          <Tabbar Title={'투닝'}></Tabbar>
          {/*상단 슬라이드 이미지 시작 */}
          <Swiper
            style={{height: Height_convert(211)}}
            autoplay={true}
            autoplayTimeout={4.5}
            dot={<Dot></Dot>}
            activeDot={<ActiveDot></ActiveDot>}>
            {topSliderImageList.length > 0
              ? topSliderImageList.map((item) => (
                  <SwiperImage
                    key={item.URL}
                    from={'home'}
                    image={item.URL}></SwiperImage>
                ))
              : null}
          </Swiper>
          {/*상단 슬라이드 이미지 끝 */}
          {/*슬라이드 이미지 아래부터 튜닝샵검색까지 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(313),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            {/*슬라이드 이미지 밑 설정버튼 차종/지역 시작 */}
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
                  Type={'car/location'}
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={
                    reduexState.loginDataCheck.login.iu_car.length > 0 &&
                    reduexState.loginDataCheck.login.location.legalcode
                      ? reduexState.loginDataCheck.login.iu_car[0]
                          .pickModelDetail.model_detail +
                        ' / ' +
                        reduexState.loginDataCheck.login.location.legalcode
                      : reduexState.loginDataCheck.login.iu_car.length > 0
                      ? reduexState.loginDataCheck.login.iu_car[0]
                          .pickModelDetail.model_detail + ' / 지역'
                      : reduexState.loginDataCheck.login.location.legalcode
                      ? '차종 / ' +
                        reduexState.loginDataCheck.login.location.legalcode
                      : '차종 / 지역'
                  }
                  Type={'car'}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*슬라이드 이미지 밑 설정버튼 차종/지역 끝 */}
            {/*드레스업 퍼포먼스 버튼 시작 */}
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
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={'퍼포먼스'}
                  Type={'workDetail'}
                  SubTitle={'내 차의 성능을 높이고 싶을 때'}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*드레스업 퍼포먼스 버튼 끝 */}
            {/*편의장치 캠핑카 튜닝 버튼 시작 */}
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
                  navigation={props.navigation}></SettingButton>
                <SettingButton
                  Title={'캠핑카 튜닝'}
                  Type={'workDetail'}
                  SubTitle={'캠핑을 위한 튜닝을 하고 싶을 때'}
                  navigation={props.navigation}></SettingButton>
              </View>
            </View>
            {/*편의장치 캠핑카 튜닝 버튼 끝 */}
            {/*튜닝부품 or 작업, 튜닝샵 검색 버튼 시작 */}
            <Search navigation={props.navigation} route={props.route}></Search>
            {/*튜닝부품 or 작업, 튜닝샵 검색 버튼 끝 */}
          </View>
          {/*슬라이드 이미지 아래부터 튜닝샵검색까지 끝 */}
          {/*사장님의 작업영상 시작 */}
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
              <TabMore
                Title={'사장님의 작업영상'}
                navigation={props.navigation}></TabMore>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: Height_convert(16),
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {ownersWokrVideoList.length > 0
                  ? ownersWokrVideoList.map((item) => (
                      <OwnersWork
                        key={item.URL}
                        From={'home'}
                        Title={item.Title}
                        ImageUrl={item.URL}
                        OwnersImage={item.OwnersImage}
                        OwnersStore={item.OwnersStore}
                        navigation={props.navigation}
                        Index={ownersWokrVideoList.indexOf(item)}></OwnersWork>
                    ))
                  : null}
              </ScrollView>
            </View>
          </View>
          {/*사장님의 작업영상 끝 */}
          {/*최근 본 작업 시작 */}
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
              <TabMore
                Title={'최근 본 작업'}
                navigation={props.navigation}></TabMore>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                width: Width_convert(375),
                height: Height_convert(185),
                marginTop: Height_convert(16),
              }}>
              {recentWorkList.length > 0
                ? recentWorkList.map((item) => (
                    <RecentWork
                      key={item.URL}
                      Title={item.Title}
                      ImageUrl={item.URL}
                      OwnersStore={item.OwnersStore}
                      Average={item.Average}
                      Review={item.Review}
                      Address={item.Address}
                      Price={item.Price}
                      Index={recentWorkList.indexOf(item)}
                      navigation={props.navigation}></RecentWork>
                  ))
                : null}
            </ScrollView>
          </View>
          {/*최근 본 작업 끝 */}
          {/*투닝 정보 시작 */}
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(155),
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                marginLeft: Width_convert(12),
                marginTop: Height_convert(11),
                width: Width_convert(351),
                height: Height_convert(144),
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
          {/*투닝 정보 끝*/}
        </ScrollView>
      </SafeAreaView>
      {showModal ? (
        <ButtonTwoModal
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={
            '차종과 지역설정을 하지 않은 경우에는 임의의 작업이 검색됩니다.'
          }
          BottomText={'설정하러가기'}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></ButtonTwoModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
const styles = StyleSheet.create({});
export default HomeScreen;
