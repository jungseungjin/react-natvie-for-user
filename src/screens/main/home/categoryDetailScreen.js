import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  FlatList,
  RefreshControl,
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
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import axios from 'axios';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import {useSelector} from 'react-redux';
const CategoryDetailScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(props.route.params.Page || null);
  const PageChangeValue = (text) => setPage(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);

  const [middleList, setMiddleList] = React.useState(
    props.route.params.MiddleCategory,
  );
  const [pickMiddle, setPickMiddle] = React.useState(
    props.route.params.PickMiddle,
  );

  ///중분류 새로 선택하면 그에 맞게 값 나오게 -> 뒤에서 데이터 가져오기
  const PickMiddleChangeValue = (text) => {
    setPickMiddle(text);
    setPickSmall('');
    getData(text);
  };

  const getData = (text) => {
    //-> 작업분류값은 가져올필요 없음
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = `${Domain2}categoryworklist/second`;
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              middle: text,
              iu_car:
                reduexState.loginDataCheck.login.iu_car[0].pickModelDetail
                  .info_car_id || undefined,
              longitude:
                reduexState.loginDataCheck.login.location.location.longitude ||
                undefined,
              latitude:
                reduexState.loginDataCheck.login.location.location.latitude ||
                undefined,
            },
          });
          if (result.data[0].status == 'ok') {
            setresultWorkList(result.data[0].WorkList);
            setViewWorkList(result.data[0].WorkList);
          } else {
          }
        } else {
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [smallList, setSmallList] = React.useState(
    props.route.params.SmallCategory,
  );
  const [pickSmall, setPickSmall] = React.useState(
    props.route.params.PickSmall,
  );
  ///소분류 새로 선택하면 한바퀴 둘러
  const PickSmallChangeValue = (text) => {
    setPickSmall(text);
    let newArr = [];
    for (var a = 0; a < resultWorkList.length; a++) {
      if (resultWorkList[a].store_info_work.includes(text)) {
        newArr.push(resultWorkList[a]);
      }
    }
    setViewWorkList(newArr);
  };

  const [resultWorkList, setresultWorkList] = React.useState(
    props.route.params.WorkList,
  );
  const [viewWorkList, setViewWorkList] = React.useState([]);

  const [pickFilter, setPickFilter] = React.useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = React.useState(false);
  const SortChangeValue = (text) => setPickSort(text);
  const [showModal, setShowModel] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModel(text);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);
  React.useEffect(() => {
    //중분류만 찍혀있으면 찍힌 중분류 모두 나오게 -> 받은 값 모두 나옴
    if (props.route.params.PickSmall === undefined) {
      setViewWorkList(props.route.params.WorkList);
    } else {
      //소분류 찍혀있으면 소분류만 나오게 -> 한바퀴 둘러
      let newArr = [];
      for (var a = 0; a < props.route.params.WorkList.length; a++) {
        if (
          props.route.params.WorkList[a].store_info_work.includes(
            props.route.params.PickSmall,
          )
        ) {
          newArr.push(props.route.params.WorkList[a]);
        }
      }
      setViewWorkList(newArr);
    }
  }, []);
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
          MiddleCategory={middleList}
          PickMiddle={pickMiddle}
          PickMiddleChangeValue={PickMiddleChangeValue}
          SmallCategory={smallList}
          PickSmall={pickSmall}
          PickSmallChangeValue={PickSmallChangeValue}
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
                location={
                  reduexState.loginDataCheck?.login?.location?.location || null
                }
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
        {viewWorkList.length > 0 ? (
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(812 - 184),
            }}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{minHeight: Height_convert(812)}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={viewWorkList}
              windowSize={2}
              initialNumToRender={10}
              renderItem={({item}) => (
                <>
                  <SearchWork
                    key={item._id}
                    item={item}
                    navigation={props.navigation}></SearchWork>
                  {viewWorkList.indexOf(item) == viewWorkList.length - 1 ? (
                    <View style={{height: Height_convert(390)}}></View>
                  ) : null}
                </>
              )}
              keyExtractor={(item) => String(item._id)}></FlatList>
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
        {networkModal ? (
          <ButtonOneModal
            ShowModalChangeValue={NetworkModalChangeValue}
            navigation={props.navigation}
            Title={'인터넷 연결을 확인해주세요'}
            //BottomText={''}
            CenterButtonText={'닫기'}></ButtonOneModal>
        ) : null}
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
