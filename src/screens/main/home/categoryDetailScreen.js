import React, {useState} from 'react';
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
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AlertModal1 from '../../../components/Modal/AlertModal1';
import AlertModal2 from '../../../components/Modal/AlertModal2';

import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';

const CategoryDetailScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [page, setPage] = useState(props.route.params.Page.type || null);
  const PageChangeValue = (text) => setPage(text);
  const [backendPage, setBackendPage] = useState(1);
  const [randomLocation, setRandomLocation] = useState({});
  const throttleGetData = _.throttle(
    (Number) =>
      getData(
        pickSecond,
        pickThird,
        reduxState.loginDataCheck?.login?.location?.longitude ||
          randomLocation.longitude,
        reduxState.loginDataCheck?.login?.location?.latitude ||
          randomLocation.latitude,
        reduxState.loginDataCheck?.login.iu_car[0] || undefined,
        backendPage,
        pickSort,
      ),
    300,
    {
      leading: true,
      trailing: false,
    },
  );
  const [secondList, setSecondList] = useState(
    props.route.params.Page.category || [],
  );
  const [pickSecond, setPickSecond] = useState(
    props.route.params.pickSecondCategory || {},
  );
  const [thirdList, setThirdList] = useState(
    props.route.params.pickSecondCategory.category || [],
  );
  const [pickThird, setPickThird] = useState(
    props.route.params.pickThirdCategory || {},
  );
  const [viewWorkList, setViewWorkList] = useState([]);
  const [pickFilter, setPickFilter] = useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = useState(
    reduxState.loginDataCheck?.login?.location?.legalcode
      ? '가까운 순 '
      : false,
  );
  const [showModal, setShowModel] = useState(false);
  const ShowModalChangeValue = (text) => setShowModel(text);
  const [refreshing, setRefreshing] = useState(false);
  ///중분류 새로 선택 -> 중분류선택시키기, 소분류리스트 변경하기, 선택한 소분류초기화, 결과리스트 초기화, 페이지초기화하고 데이터가져오기
  const PickSecondChangeValue = (text) => {
    props.route.params.Page.category.map((item, index) => {
      if (item._id === text) {
        setPickSecond(item);
        setThirdList(item.category);
        setPickThird(item.category[0]);
        //setViewWorkList([]);
        setBackendPage(0);
        getData(
          item,
          false,
          reduxState.loginDataCheck?.login?.location?.longitude ||
            randomLocation.longitude,
          reduxState.loginDataCheck?.login?.location?.latitude ||
            randomLocation.latitude,
          reduxState.loginDataCheck?.login.iu_car[0] || undefined,
          0,
          pickSort,
        );
      }
    });
  };
  ///소분류 새로 선택 -> 소분류선택시키기, 결과리스트 초기화, 페이지초기화하고 데이터가져오기
  const PickThirdChangeValue = (text) => {
    pickSecond.category.map((item, index) => {
      if (item._id === text) {
        setPickThird(item);
        //setViewWorkList([]);
        setBackendPage(0);
        getData(
          pickSecond,
          item,
          reduxState.loginDataCheck?.login?.location?.longitude ||
            randomLocation.longitude,
          reduxState.loginDataCheck?.login?.location?.latitude ||
            randomLocation.latitude,
          reduxState.loginDataCheck?.login.iu_car[0] || undefined,
          0,
          pickSort,
        );
      }
    });
  };
  //필터값 변경 -> 지금찍힌곳에서 결과리스트 초기화, 페이지초기화하고 데이터가져오기
  const SortChangeValue = (text) => {
    setPickSort(text);
    setBackendPage(0);
    getData(
      pickSecond,
      pickThird,
      reduxState.loginDataCheck?.login?.location?.longitude ||
        randomLocation.longitude,
      reduxState.loginDataCheck?.login?.location?.latitude ||
        randomLocation.latitude,
      reduxState.loginDataCheck?.login.iu_car[0] || undefined,
      0,
      text,
    );
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const getData = (
    SecondCategory,
    ThirdCategory,
    Longitude,
    Latitude,
    Car,
    Page,
    Sort,
  ) => {
    try {
      setIsLoadingAndModal(1);
      let second;
      let third;
      let longitude;
      let latitude;
      let car;
      let page;
      let sort;
      if (SecondCategory) {
        second = SecondCategory._id;
      }
      if (ThirdCategory) {
        third = ThirdCategory._id;
      }
      if (Longitude) {
        longitude = Longitude;
      }
      if (Latitude) {
        latitude = Latitude;
      }
      if (Car) {
        car = Car?.pickModelDetail?._id;
      }
      if (Page) {
        page = Page;
      }
      if (Sort) {
        let type = '';
        if (Sort === '가까운 순 ') {
          type = 'distance';
        } else if (Sort === '별점 순 ') {
          type = 'grade';
        } else if (Sort === '후기많은 순 ') {
          type = 'review';
        } else if (Sort === '찜 많은 순 ') {
          type = 'pick';
        }
        sort = type;
      }
      let url = `${Domain}api/work/get/category`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              second: second,
              third: third,
              longitude: longitude,
              latitude: latitude,
              car: car,
              page: page,
              sort: sort,
            },
          });
          if (result.data.success === true) {
            if (page) {
              setViewWorkList([...viewWorkList, ...result.data.result]);
            } else {
              setViewWorkList([...result.data.result]);
            }
            setBackendPage((prevData) => {
              return prevData + 1;
            });
            setIsLoadingAndModal(0);
            if (!randomLocation.longitude) {
              setRandomLocation({
                longitude: result.data.longitude,
                latitude: result.data.latitude,
              });
            }
          } else {
            console.log(result.data.err);
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  React.useEffect(() => {
    getData(
      props.route.params.pickSecondCategory,
      props.route.params.pickThirdCategory,
      reduxState.loginDataCheck?.login?.location?.longitude ||
        randomLocation.longitude,
      reduxState.loginDataCheck?.login?.location?.latitude ||
        randomLocation.latitude,
      reduxState.loginDataCheck?.login.iu_car[0] || undefined,
      0,
      pickFilter,
    );
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
          left={'back'}
          Title={
            page === 1
              ? '드레스업'
              : page === 2
              ? '퍼포먼스'
              : page === 3
              ? '편의장치'
              : page === 4
              ? '캠핑카'
              : '드레스업'
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
          SecondCategory={secondList}
          PickSecond={pickSecond}
          PickSecondChangeValue={PickSecondChangeValue}
          ThirdCategory={thirdList}
          PickThird={pickThird}
          PickThirdChangeValue={PickThirdChangeValue}
          FilterValue={pickFilter}
          FilterChangeValue={PickChangeValue}></TabBarBottom>

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
                height: Width_convert(162 - 32),
                backgroundColor: '#FFFFFF',
              }}>
              <FilterView
                index={0}
                Title={'가까운 순 '}
                nowValue={pickSort}
                ShowModalChangeValue={ShowModalChangeValue}
                location={
                  reduxState.loginDataCheck?.login?.location?.legalcode || null
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
              {/* <FilterView
                index={4}
                Title={'우리가게공임표 공개 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView> */}
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
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={{flex: 1}}
                onPress={() => {
                  setPickFilter(false);
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
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
              style={{minHeight: Height_convert(812)}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              bounces={false}
              data={viewWorkList}
              windowSize={2}
              initialNumToRender={10}
              onEndReached={throttleGetData}
              onEndReachedThreshold={10}
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
              // width: Width_convert(245),
              // height: Height_convert(812 - 184),
              // marginLeft: Width_convert(65),
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
                textAlign: 'center',
              }}>
              {
                '원하시는 검색결과가 나올 수 있도록\n 노력하는 투닝이 되겠습니다 🔥'
              }
            </Text>
          </View>
        )}
      </SafeAreaView>
      {showModal ? (
        <AlertModal1
          type={3}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={
            "'홈화면 > 설정' 에서 지역설정을 해주셔야만 가까운 순 필터 사용이 가능합니다."
          }
          // LeftButtonTitle={'아니오'}
          // RightButtonTitle={'네'}
          CenterButtonText={'확인'}
          BottomText={'설정하러가기'}></AlertModal1>
      ) : null}
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
    </>
  );
};
export default CategoryDetailScreen;
