import React, {useState, useEffect, useCallback} from 'react';
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
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';
const StoreWorkList = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [page, setPage] = useState('dressup');
  const PageChangeValue = (text) => {
    setPage(text);
    setBackendPage(1);
    getData(text, null, null, null, pickSort);
  };

  const [secondList, setSecondList] = useState([]);
  const [pickSecond, setPickSecond] = useState({});
  const PickSecondChangeValue = (object) => {
    //중분류 변경 -> 데이터 다시 가져오기 페이지 초기화
    //소분류 리스트 변경. 0번인덱스를 찍어놓지는 않음(아이디값)
    secondList.map((item, index) => {
      if (item._id === object._id) {
        setThirdList(item.category);
        //setPickThird(item.category[0]._id);
      }
    });
    setPickSecond(object);
    setPickThird({});
    setBackendPage(1);
    getData(page, object, null, null, pickSort);
  };

  const [thirdList, setThirdList] = useState([]);
  const [pickThird, setPickThird] = useState({});
  const PickThirdChangeValue = (object) => {
    setPickThird(object);
    setBackendPage(1);
    getData(page, pickSecond, object, null, pickSort);
  };
  const [resultWorkList, setResultWorkList] = useState([]);
  const [pickFilter, setPickFilter] = useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = useState(false);
  const SortChangeValue = (text) => {
    setPickSort(text);
    getData(page, pickSecond, pickThird, null, text);
  };
  const [showModal, setShowModel] = useState(true);
  const ShowModalChangeValue = (text) => setShowModel(text);
  const [refreshing, setRefreshing] = useState(false);

  const throttleGetData = _.throttle(
    (Number) => getData(page, pickSecond, pickThird, backendPage, pickSort),
    300,
    {
      leading: true,
      trailing: false,
    },
  );
  //처음 들어가면 드레스업이 찍혀있다.
  //백엔드에서 카테고리 메뉴와 함께 드레스업 작업데이터를 불러온다. 백엔드에서 중분류,소분류값에 숫자 넣어준다.
  //대분류의 값을 변경하면 백엔드에서 카테고리 메뉴와 함께 드레스업 작업데이터를 불러온다. 백엔드에서 중분류,소분류값에 숫자 넣어준다.

  //중분류 값 변경하면
  //1. 대분류에서 백엔드 값을 모조리 가져와서 중분류 아이디값에 맞게 보여준다
  //2. 대분류에서 백엔드에서 데이터 갯수는 확인하고 중분류 찍으면
  //SecondCategory
  //ThirdCategory
  const [pages, setPages] = useState([]);
  const [backendPage, setBackendPage] = useState(1);
  //대분류 중분류 소분류 페이지 정렬이 필요함
  const getData = (
    FirstCategory,
    SecondCategory,
    ThirdCategory,
    Page,
    Sort,
  ) => {
    try {
      //가게 아이디값 카테고리메뉴 페이지 정렬값
      let first = '';
      let second = '';
      let third = '';
      let page = '';
      let sort = '';
      if (FirstCategory) {
        first = FirstCategory;
      }
      if (SecondCategory) {
        second = SecondCategory._id;
      }
      if (ThirdCategory) {
        third = ThirdCategory._id;
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
      let url = `${Domain}api/work/get/store`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              storeid: props.route.params.item._id,
              first: first,
              second: second,
              third: third,
              page: page,
              sort: sort,
            },
          });
          if (result.data.success === true) {
            if (!second) {
              //대분류찍은거면 카테고리를 리스트에 넣고, 중분류1번째 찍고, 넘어온 결과작업을 넣으면됨

              setSecondList(result.data.category);
              setPickSecond(result.data.category[0]);
              setThirdList(result.data.category[0].category);
              //setPickThird(result.data.category[0].category[0]);//소분류 1번째 찍기.  안함
              if (Page) {
                setResultWorkList([...resultWorkList, ...result.data.result]);
              } else {
                setResultWorkList(result.data.result);
              }
            } else {
              //중분류 찍은거면 중분류,소분류는 찍혀서 넘어왔으니 넘어온 결과작업을 넣으면 됨 페이지를 사용했으면 페이지에 1추가
              if (Page) {
                setResultWorkList([...resultWorkList, ...result.data.result]);
                setBackendPage((prevData) => {
                  return prevData + 1;
                });
              } else {
                setResultWorkList(result.data.result);
              }
            }
          } else {
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
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setRefreshing(false);
  // }, []);
  useEffect(() => {
    getData(page); //처음은 드레스업에 중분류없고 소분류없고 페이지없고 정렬없음
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        {/* {Platform.OS == 'android' ? (
          <View
            style={{
              width: Width_convert(375),
              height: StatusBarHeight,
              backgroundColor: '#000000',
            }}></View>
        ) : null} */}
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
                    Height_convert(41) -
                    StatusBarHeight,
                },
          ]}></View>
        <Tabbar
          left={'back'}
          Title={props.route.params.item.name}
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
                      Height_convert(41) -
                      StatusBarHeight,
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
        {resultWorkList.length > 0 ? (
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
              data={resultWorkList}
              windowSize={2}
              initialNumToRender={10}
              onEndReached={throttleGetData}
              onEndReachedThreshold={1}
              renderItem={({item}) => (
                <>
                  <SearchWork
                    key={item._id}
                    item={item}
                    navigation={props.navigation}></SearchWork>
                  {resultWorkList.indexOf(item) == resultWorkList.length - 1 ? (
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
export default StoreWorkList;
