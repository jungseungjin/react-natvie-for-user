import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  RefreshControl,
  FlatList,
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
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
const StoreWorkList = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [page, setPage] = React.useState('dressup');
  const PageChangeValue = (text) => {
    setPage(text);
    setPickFilter(false);
  };

  const [middleList, setMiddleList] = React.useState([]);
  const [pickMiddle, setPickMiddle] = React.useState('');
  const PickMiddleChangeValue = (text) => {
    setPickMiddle(text);
    setPickFilter(false);
  };

  const [smallList, setSmallList] = React.useState([]);
  const [pickSmall, setPickSmall] = React.useState('');
  const PickSmallChangeValue = (text) => {
    setPickSmall(text);
    setPickFilter(false);
    let newArr = [];
    for (var a = 0; a < resultWorkList.length; a++) {
      if (resultWorkList[a].store_info_work.includes(text)) {
        newArr.push(resultWorkList[a]);
      }
    }
    if (pickSort !== false) {
      if (pickSort === '가까운 순 ') {
        //거리 가까운것부터
        newArr.sort(function (a, b) {
          return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
        });
      } else if (pickSort === '별점 순 ') {
        //별점 높은것부터
        newArr.sort(function (a, b) {
          return a.reviewGrade < b.reviewGrade
            ? 1
            : a.reviewGrade > b.reviewGrade
            ? -1
            : 0;
        });
      } else if (pickSort === '후기많은 순 ') {
        newArr.sort(function (a, b) {
          return a.reviewCount < b.reviewCount
            ? 1
            : a.reviewCount > b.reviewCount
            ? -1
            : 0;
        });
      } else if (pickSort === '찜 많은 순 ') {
        newArr.sort(function (a, b) {
          return a.userCount < b.userCount
            ? 1
            : a.userCount > b.userCount
            ? -1
            : 0;
        });
      } else if (pickSort === '우리가게공임표 공개 ') {
        newArr.sort(function (a, b) {
          return a.store_work_total_cost < b.store_work_total_cost
            ? 1
            : a.store_work_total_cost > b.store_work_total_cost
            ? -1
            : 0;
        });
      }
    }
    setViewWorkList(newArr);
  };
  const [resultWorkList, setresultWorkList] = React.useState([]);
  const [viewWorkList, setViewWorkList] = React.useState([]);
  const [pickFilter, setPickFilter] = React.useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = React.useState(false);
  const SortChangeValue = (text) => {
    setPickSort(text);
    let newArr = viewWorkList.slice() || [];
    if (text !== false) {
      if (text === '가까운 순 ') {
        //거리 가까운것부터
        newArr.sort(function (a, b) {
          return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
        });
      } else if (text === '별점 순 ') {
        //별점 높은것부터
        newArr.sort(function (a, b) {
          return a.reviewGrade < b.reviewGrade
            ? 1
            : a.reviewGrade > b.reviewGrade
            ? -1
            : 0;
        });
      } else if (text === '후기많은 순 ') {
        newArr.sort(function (a, b) {
          return a.reviewCount < b.reviewCount
            ? 1
            : a.reviewCount > b.reviewCount
            ? -1
            : 0;
        });
      } else if (text === '찜 많은 순 ') {
        newArr.sort(function (a, b) {
          return a.userCount < b.userCount
            ? 1
            : a.userCount > b.userCount
            ? -1
            : 0;
        });
      } else if (text === '우리가게공임표 공개 ') {
        newArr.sort(function (a, b) {
          return a.store_work_total_cost < b.store_work_total_cost
            ? 1
            : a.store_work_total_cost > b.store_work_total_cost
            ? -1
            : 0;
        });
      }
    }
    setViewWorkList(newArr);
  };
  const [showModal, setShowModel] = React.useState(true);
  const ShowModalChangeValue = (text) => setShowModel(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [refreshing, setRefreshing] = React.useState(false);

  //page값. 대분류값이 변경될때만 뒤에서 데이터 가져오고
  //중분류 소분류값이 변경될때는 대분류값에서 가져온 데이터를 가지고 논다
  //-> 데이터 가져올때 작업분류에 대한 데이터도 가져와야함
  // 각 작업의 length를 어떻게 처리하나
  const getData = (page, sort) => {
    try {
      if (sort == '가까운 순 ') {
        sort = '1';
      } else if (sort == '별점 순 ') {
        sort = '2';
      } else if (sort == '후기많은 순 ') {
        sort = '3';
      } else if (sort == '찜 많은 순 ') {
        sort = '4';
      } else if (sort == '우리가게공임표 공개 ') {
        sort = '5';
      } else {
        sort = '0';
      }
      let url = `${Domain2}storeworklist`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              item_id: props.route.params.item._id,
              page: page,
              sort: sort,
            },
          });
          if (result.data[0].message == 'ok') {
            setresultWorkList(result.data[0].WorkList);
            setMiddleList(result.data[0].MiddleCategory);
            setSmallList(result.data[0].SmallCategory);
            setPickMiddle(result.data[0].MiddleCategory[0].work_sub_type_name);
            setPickSmall(result.data[0].SmallCategory[0]._id);
            forceUpdate();
          } else {
            console.log(result.data[0]);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);
  React.useEffect(() => {
    getData(page, pickSort);
  }, []);
  React.useEffect(() => {
    getData(page, pickSort);
  }, [page]);
  React.useEffect(() => {
    //처음 화면에서 찍혀있는 바디킷 및 패지키에 대한 작업을 나타내기 위함
    // 다른페이지 찍고 다시 돌아오면 비어있음.... resultWorkList가 안들어간거로 보여서 그런듯
    let newArr = [];
    forceUpdate();
    for (var a = 0; a < resultWorkList.length; a++) {
      if (resultWorkList[a].store_info_work.includes(pickSmall)) {
        newArr.push(resultWorkList[a]);
      }
    }
    setViewWorkList(newArr);
  }, [resultWorkList]);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        {Platform.OS == 'android' ? (
          <View
            style={{width: Width_convert(375), height: StatusBarHeight}}></View>
        ) : null}
        <View
          style={[
            {
              width: Width_convert(375),
              position: 'absolute',
              borderTopWidth: 2,
              borderTopColor: '#DBDBDB',
            },
            Platform.OS == 'ios'
              ? {
                  top:
                    Height_convert(94) +
                    Height_convert(48) +
                    Height_convert(41),
                }
              : {
                  top:
                    Height_convert(94) +
                    Height_convert(48) +
                    Height_convert(41),
                },
          ]}></View>
        <Tabbar
          Title={props.route.params.item.store_name}
          navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(41),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={[
              {
                width: Width_convert(375) / 4,
                height: Height_convert(41),
                marginTop: Height_convert(23),
                borderBottomWidth: 3,
                justifyContent: 'flex-end',
              },
              page === 'dressup'
                ? {
                    borderBottomColor: '#946AEF',
                  }
                : {
                    borderBottomColor: '#AAAAAA',
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                alignItems: 'center',
                marginBottom: Height_convert(10),
              }}
              onPress={() => {
                PageChangeValue('dressup');
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(13),
                    fontWeight: '700',
                  },
                  page === 'dressup'
                    ? {
                        color: '#946AEF',
                      }
                    : {
                        color: '#AAAAAA',
                      },
                ]}>
                드레스업
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                width: Width_convert(375) / 4,
                height: Height_convert(41),
                marginTop: Height_convert(23),
                borderBottomWidth: 3,
                justifyContent: 'flex-end',
              },
              page === 'perfomance'
                ? {
                    borderBottomColor: '#946AEF',
                  }
                : {
                    borderBottomColor: '#AAAAAA',
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                alignItems: 'center',
                marginBottom: Height_convert(10),
              }}
              onPress={() => {
                PageChangeValue('perfomance');
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(13),
                    fontWeight: '700',
                  },
                  page === 'perfomance'
                    ? {
                        color: '#946AEF',
                      }
                    : {
                        color: '#AAAAAA',
                      },
                ]}>
                퍼포먼스
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                width: Width_convert(375) / 4,
                height: Height_convert(41),
                marginTop: Height_convert(23),
                borderBottomWidth: 3,
                justifyContent: 'flex-end',
              },
              page === 'convenience'
                ? {
                    borderBottomColor: '#946AEF',
                  }
                : {
                    borderBottomColor: '#AAAAAA',
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                alignItems: 'center',
                marginBottom: Height_convert(10),
              }}
              onPress={() => {
                PageChangeValue('convenience');
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(13),
                    fontWeight: '700',
                  },
                  page === 'convenience'
                    ? {
                        color: '#946AEF',
                      }
                    : {
                        color: '#AAAAAA',
                      },
                ]}>
                편의장치
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                width: Width_convert(375) / 4,
                height: Height_convert(41),
                marginTop: Height_convert(23),
                borderBottomWidth: 3,
                justifyContent: 'flex-end',
              },
              page === 'camping'
                ? {
                    borderBottomColor: '#946AEF',
                  }
                : {
                    borderBottomColor: '#AAAAAA',
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                alignItems: 'center',
                marginBottom: Height_convert(10),
              }}
              onPress={() => {
                PageChangeValue('camping');
              }}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(13),
                    fontWeight: '700',
                  },
                  page === 'camping'
                    ? {
                        color: '#946AEF',
                      }
                    : {
                        color: '#AAAAAA',
                      },
                ]}>
                캠핑카
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TabBarBottom
          from={'StoreWorkList'}
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
                ? {
                    top:
                      Height_convert(94) +
                      Height_convert(48) +
                      Height_convert(41) +
                      Height_convert(41),
                  }
                : {
                    top:
                      Height_convert(94) +
                      Height_convert(48) +
                      Height_convert(41) +
                      Height_convert(41),
                  },
            ]}>
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(162 - 24 - 32),
                backgroundColor: '#FFFFFF',
              }}>
              {/* <FilterView
                index={0}
                Title={'가까운 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView> */}
              <FilterView
                index={0}
                Title={'별점 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              <FilterView
                index={1}
                Title={'후기많은 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              <FilterView
                index={2}
                Title={'찜 많은 순 '}
                nowValue={pickSort}
                SortChangeValue={SortChangeValue}></FilterView>
              {/* <FilterView
                index={3}
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
                style={{flex: 1}}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => {
                  PickChangeValue(!pickFilter);
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
              width: Width_convert(245),
              height: Height_convert(812 - 184),
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: Width_convert(65),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
              }}>
              원하시는 검색결과가 나올 수 있도록 노력하는 투닝이 되겠습니다 🔥
            </Text>
          </View>
        )}
      </SafeAreaView>
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default StoreWorkList;
