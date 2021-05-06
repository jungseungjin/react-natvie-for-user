import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Pick/Tabbar/tabbarBottom.js';
import WorkPick from '../../../components/Pick/Work/workPick.js';
import StorePick from '../../../components/Pick/Store/storePick.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {connect, useSelector} from 'react-redux';
import ActionCreator from '../../../actions';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import LoginModal from '../../../components/Modal/LoginModal.js';

import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';

import Forfunction from './forFunction.js';
import _ from 'lodash';
import SetRecentList from '../../../components/setRecentList.js';
const PickScreen = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(true);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [page, setPage] = useState('work');
  const [workList, setWorkList] = useState([]);
  const [workListDel, setWorkListDel] = useState([]);
  const WorkListDelChangeValue = (text) => setWorkListDel(text);
  const [storeList, setStoreList] = useState([]);
  const [storeListDel, setStoreListDel] = useState([]);
  const StoreListDelChangeValue = (text) => setStoreListDel(text);
  const PageChangeValue = (text) => {
    if (text === 'work') {
      scrollRef.current?.scrollToIndex({
        animated: false,
        index: 0,
      });
    } else {
      scrollRef.current?.scrollToIndex({
        animated: false,
        index: 1,
      });
    }
    setPage(text);
  };
  //로그인 되어 있으면 찜한데이터 가져오기
  const [deleteModal, setDeleteModal] = useState(false);
  const DeleteModalChangeValue = (text) => setDeleteModal(text);
  const ToStore = (item_id) => {
    try {
      let url = `${Domain}api/store/get/one`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              userid: reduxState?.loginDataCheck?.login?._id,
              storeid: item_id,
            },
          });
          if (result.data.success === true) {
            SetRecentList('store', result.data.results[1]._id);
            props.navigation.navigate('StoreDetail', {
              item: result.data.results[1],
              pick: result.data.results[0],
            });
          } else {
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
  const throttleGetDataWork = _.throttle(
    (Number) => get_pickData(true, 'work'),
    300,
    {
      leading: true,
      trailing: false,
    },
  );
  const throttleGetDataStore = _.throttle(
    (Number) => get_pickData(true, 'store'),
    300,
    {
      leading: true,
      trailing: false,
    },
  );
  const [backendPageStore, setBackendPageStore] = useState(1);
  const [backendPageWork, setBackendPageWork] = useState(1);
  const get_pickData = (Scrolling, type) => {
    try {
      let page;
      if (type === 'work') {
        if (Scrolling) page = backendPageWork;
      } else if (type === 'store') {
        if (Scrolling) page = backendPageStore;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          if (!reduxState.loginDataCheck.login._id) {
            return false;
          }
          let url = `${Domain}api/work/get/pick`;
          let work = 'ok';
          let store = 'ok';
          if (Scrolling) {
            if (type === 'work') store = '';
            else if (type === 'store') work = '';
          }
          let result = await axios.get(url, {
            params: {
              userid: reduxState.loginDataCheck?.login?._id,
              work: work,
              store: store,
              page: page,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            if (Scrolling) {
              if (type === 'work') {
                if (result.data.results[0].length > 0) {
                  setWorkList([...workList, ...result.data.results[0]]);
                  setBackendPageWork((prevState) => {
                    return prevState + 1;
                  });
                }
              } else if (type === 'store') {
                if (result.data.results[1].length > 0) {
                  setStoreList([...storeList, ...result.data.results[1]]);
                  setBackendPageStore((prevState) => {
                    return prevState + 1;
                  });
                }
              }
            } else {
              setWorkList(result.data.results[0]);
              setStoreList(result.data.results[1]);
              // setBackendPageStore(1);
              // setBackendPageWork(1);
            }
          } else {
            setWorkList([]);
            setStoreList([]);
            setIsLoadingAndModal(3);
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  const delete_data = () => {
    try {
      props.updateEditMode(!reduxState.editModeCheck.editMode);
      if (reduxState.loginDataCheck.login._id != '') {
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let url = `${Domain}api/work/delete/pick`;
            let data = {
              userid: reduxState.loginDataCheck.login._id,
              workid: workListDel,
              storeid: storeListDel,
            };
            let result = await axios.post(url, data, {
              headers: {},
            });
            if (result.data.success === true) {
              setWorkListDel();
              setStoreListDel();
              setBackendPageStore(1);
              setBackendPageWork(1);
              get_pickData();
            } else {
              //setRecentWorkList([]);
            }
          } else {
            setIsLoadingAndModal(2);
          }
        });
      } else {
        //로그인모달띄우기
        setShowModal(true);
        setWorkList([]);
        setStoreList([]);
        setWorkListDel();
        setStoreListDel();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   get_pickData();
  //   setRefreshing(false);
  // }, []);
  const [forFunctionBoo, setForFunctionBoo] = useState(true);
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      console.log('찜한페이지');
      let m = Math.random();
      setForFunctionBoo(m);
      setShowModal(true);
      setBackendPageStore(1);
      setBackendPageWork(1);
      get_pickData();
    });
    props.navigation.addListener('blur', () => {
      setShowModal(false);
      // setWorkList([]);
      // setStoreList([]);
      setBackendPageStore(1);
      setBackendPageWork(1);
    });
  }, []);
  const scrollRef = useRef();

  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / Width_convert(375),
    );
    if (newPage === 0) setPage('work');
    else setPage('store');
  };
  const renderItem = (id, itemList, delList) => {
    return (
      <FlatList
        bounces={false}
        alwaysBounceVertical={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        data={
          reduxState.loginDataCheck.login.login == false
            ? [{message: '로그인이 필요합니다.'}]
            : id === '1' && itemList.length > 0
            ? itemList
            : id === '2' && itemList.length > 0
            ? itemList
            : id === '1'
            ? [{message: '찜한 작업이 없습니다.'}]
            : id === '2'
            ? [{message: '찜한 샵이 없습니다.'}]
            : null
        }
        onEndReached={
          id === '1' && itemList.length > 0
            ? throttleGetDataWork
            : id === '2' && itemList.length > 0 && throttleGetDataStore
        }
        onEndReachedThreshold={50}
        windowSize={2}
        initialNumToRender={10}
        renderItem={({item}) =>
          item.message ? (
            <View
              style={{
                width: Width_convert(375),
                height: Height_convert(812) - Height_convert(94 + 48),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(16),
                  fontWeight: '700',
                  color: '#000000',
                }}>
                {item.message}
              </Text>
            </View>
          ) : id === '1' && itemList.length > 0 ? (
            <WorkPick
              navigation={props.navigation}
              getIndex={itemList.indexOf(item) + 1}
              workListLength={itemList.length}
              WorkListDelChangeValue={WorkListDelChangeValue}
              workListDel={delList}
              key={item._id}
              item={item}
              editMode={reduxState.editModeCheck.editMode}></WorkPick>
          ) : id === '2' && itemList.length > 0 ? (
            <StorePick
              navigation={props.navigation}
              getIndex={itemList.indexOf(item) + 1}
              storeListLength={itemList.length}
              ToStore={ToStore}
              StoreListDelChangeValue={StoreListDelChangeValue}
              storeListDel={delList}
              key={item._id}
              item={item}
              editMode={reduxState.editModeCheck.editMode}></StorePick>
          ) : null
        }
        keyExtractor={(item) => String(item._id)}></FlatList>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          Title={'찜한작업'}
          WorkListDelChangeValue={WorkListDelChangeValue}
          StoreListDelChangeValue={StoreListDelChangeValue}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={[
            {title: '튜닝작업', value: 'work'},
            {title: '튜닝샵', value: 'store'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>

        <FlatList
          bounces={false}
          ref={scrollRef}
          style={{
            height: '100%',
            width: '100%',
          }}
          automaticallyAdjustContentInsets={false}
          data={[
            {id: '1', dataItem: workList, delItem: workListDel},
            {id: '2', dataItem: storeList, delItem: storeListDel},
          ]}
          decelerationRate="fast"
          horizontal
          keyExtractor={(item) => String(item.id)}
          onScroll={onScroll}
          pagingEnabled
          renderItem={(item, index) => {
            return (
              <>
                <View key={item.item.id}>
                  {renderItem(
                    item.item.id,
                    item.item.dataItem,
                    item.item.delItem,
                  )}
                </View>
              </>
            );
          }}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: Width_convert(375),
            offset: Width_convert(375) * index,
            index,
          })}
          initialScrollIndex={0}
        />

        {/*하단 초기화 삭제하기버튼 시작*/}
        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        {reduxState.editModeCheck.editMode ? (
          <>
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(55) + Height_convert(insets.bottom),
                position: 'absolute',
                bottom: 0,
              }}>
              <View
                style={{
                  height: Width_convert(55),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setWorkListDel([]);
                    setStoreListDel([]);
                  }}
                  style={{
                    height: Width_convert(55),
                    width: Width_convert(375) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#818181',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(15),
                      fontWeight: '700',
                      color: '#FFFFFF',
                    }}>
                    초기화
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (reduxState.editModeCheck.editMode) {
                      setDeleteModal(true);
                    }
                  }}
                  style={{
                    height: Width_convert(55),
                    width: Width_convert(375) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#946AEF',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(15),
                      fontWeight: '700',
                      color: '#EEEEEE',
                    }}>
                    삭제하기
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: Height_convert(insets.bottom),
                  backgroundColor: '#FFFFFF',
                }}></View>
            </View>
          </>
        ) : null}
        {/*하단 초기화 삭제하기버튼 끝*/}
        {deleteModal ? (
          <AlertModal2
            type={1}
            ShowModalChangeValue={DeleteModalChangeValue}
            Delete={delete_data}
            navigation={props.navigation}
            Title={'찜한 항목을 삭제하시겠습니까?'}
            //BottomText={''}
            //CenterButtonText={'확인'}
            LeftButtonTitle={'취소'}
            RightButtonTitle={'확인'}></AlertModal2>
        ) : null}
        {reduxState.loginDataCheck.login.login === false && showModal ? (
          <LoginModal
            ShowModalChangeValue={ShowModalChangeValue}
            navigation={props.navigation}></LoginModal>
        ) : reduxState.loginDataCheck.login.login === true ? (
          <Forfunction
            get_pickData={get_pickData}
            Boo={forFunctionBoo}></Forfunction>
        ) : null}
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

function mapStateToProps(state) {
  return {
    editMode: state.editMode,
    login: {
      login: state.loginDataCheck.login.login,
      iu_car: state.loginDataCheck.login.iu_car,
      location: state.loginDataCheck.login.location,
      _id: state.loginDataCheck.login._id,
      data: state.loginDataCheck.login.data,
    },
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEditMode: (boo) => {
      dispatch(ActionCreator.editModeCheck(boo));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PickScreen);
