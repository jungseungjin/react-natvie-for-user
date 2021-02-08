import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Height_convert from '../../../components/Height_convert.js';
import SearchWork from '../../../components/Home/Search/searchWork.js';
import FilterView from '../../../components/Home/Search/filterView.js';
import IsLoading from '../../../components/ActivityIndicator';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModel.js';
const CategoryDetailScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(props.route.params.Page || null);
  const PageChangeValue = (text) => setPage(text);

  const [resultWorkList, setresultWorkList] = React.useState([
    {tt: 'tt'},
    {tt: 'tt'},
    {tt: 'tt'},
    {tt: 'tt'},
  ]);
  const [pickFilter, setPickFilter] = React.useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = React.useState(false);
  const SortChangeValue = (text) => setPickSort(text);
  const [showModal, setShowModel] = React.useState(true);
  const ShowModalChangeValue = (text) => setShowModel(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={[
            {
              width: Width_convert(375),
              position: 'absolute',
              borderTopWidth: 2,
              borderTopColor: '#DBDBDB',
            },
            Platform.OS == 'ios'
              ? {top: Height_convert(94) + Height_convert(48)}
              : {
                  top:
                    Height_convert(94) - StatusBarHeight + Height_convert(48),
                },
          ]}></View>
        <Tabbar
          Title={
            page == 'dressup'
              ? '드레스업'
              : page == 'perfomance'
              ? '퍼포먼스'
              : page == 'convenience'
              ? '편의장치'
              : page == 'camping'
              ? '캠핑카'
              : null
          }
          navigation={props.navigation}></Tabbar>
        <TabBarBottom
          from={'categoryDetail'}
          Title={[
            {title: '드레스업', value: 'dressup'},
            {title: '퍼포먼스', value: 'perfomance'},
            {title: '편의장치', value: 'convenience'},
            {title: '캠핑카', value: 'camping'},
          ]}
          FilterValue={pickFilter}
          FtilerChangeValue={PickChangeValue}></TabBarBottom>

        {pickFilter ? (
          <View
            style={[
              {
                width: Width_convert(375),
                height: Height_convert(812),
                position: 'absolute',
                zIndex: 1,
              },
              Platform.OS == 'ios'
                ? {top: Height_convert(140 + 48)}
                : {
                    top: Height_convert(139 + 48) - StatusBarHeight,
                  },
            ]}>
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(162),
                backgroundColor: '#FFFFFF',
              }}>
              <FilterView
                index={0}
                Title={'가까운 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              <FilterView
                index={1}
                Title={'별점 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              <FilterView
                index={2}
                Title={'후기많은 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              <FilterView
                index={3}
                Title={'찜 많은 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              <FilterView
                index={4}
                Title={'우리가게공임표 공개'}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
            </View>
            <View
              opacity={0.3}
              style={{
                width: Width_convert(375),
                height: Height_convert(656),
                backgroundColor: '#202020',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={() => {
                  //setPickFilter(false);
                }}></TouchableOpacity>
            </View>
          </View>
        ) : null}
        {resultWorkList.length > 0 ? (
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(812 - 184),
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SearchWork></SearchWork>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(31),
                }}></View>
              <SearchWork></SearchWork>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(31),
                }}></View>
              <SearchWork></SearchWork>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(50),
                }}></View>
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(812 - 184),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              원하시는 검색결과가 나올 수 있도록 {'\n'}노력하는 투닝이
              되겠습니다 🔥
            </Text>
          </View>
        )}
        {showModal ? (
          <ButtonOneModal
            ShowModalChangeValue={ShowModalChangeValue}
            navigation={props.navigation}
            Title={
              "'홈화면 > 설정' 에서 지역설정을 해주셔야 가까운 순 필터 사용이 가능합니다."
            }
            BottomText={'설정하러가기'}
            CenterButtonText={'확인'}></ButtonOneModal>
        ) : null}
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default CategoryDetailScreen;
