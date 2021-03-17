import React from 'react';
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
import Tabbar from '../../../components/Pick/Tabbar/tabbar.js';
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
import Domain2 from '../../../../key/Domain2.js';
import LoginModal from '../../../components/Modal/LoginModal.js';

import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';

import Forfunction from './forFunction.js';
const PickScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = React.useState(true);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [page, setPage] = React.useState('work');
  const [workList, setWorkList] = React.useState([]);
  const [workListDel, setWorkListDel] = React.useState([]);
  const WorkListDelChangeValue = (text) => setWorkListDel(text);
  const [storeList, setStoreList] = React.useState([]);
  const [storeListDel, setStoreListDel] = React.useState([]);
  const StoreListDelChangeValue = (text) => setStoreListDel(text);
  const PageChangeValue = (text) => setPage(text);
  //로그인 되어 있으면 찜한데이터 가져오기
  const [deleteModal, setDeleteModal] = React.useState(false);
  const DeleteModalChangeValue = (text) => setDeleteModal(text);

  const get_pickData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          if (!reduexState.loginDataCheck.login._id) {
            return false;
          }
          let url = `${Domain2}pickData`;
          let result = await axios.get(url, {
            params: {
              _id: reduexState.loginDataCheck.login._id,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            if (result.data[0].workList != 0 && result.data[0].workList) {
              setWorkList(result.data[0].workList);
            } else {
              setWorkList([]);
            }
            if (result.data[0].storeList != 0 && result.data[0].storeList) {
              setStoreList(result.data[0].storeList);
            } else {
              setStoreList([]);
            }
          } else {
            //setRecentWorkList([]);
            setWorkList([]);
            setStoreList([]);
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const delete_data = () => {
    try {
      props.updateEditMode(!reduexState.editModeCheck.editMode);
      if (reduexState.loginDataCheck.login._id != '') {
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let url = Domain2 + 'pickData';
            let data = {
              _id: reduexState.loginDataCheck.login._id,
              workListDel: workListDel,
              storeListDel: storeListDel,
            };
            let result = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].message == 'ok') {
              onRefresh();
              setWorkListDel();
              setStoreListDel();
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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get_pickData();
    setRefreshing(false);
  }, []);
  const [forFunctionBoo, setForFunctionBoo] = React.useState(true);
  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      let m = Math.random();
      setForFunctionBoo(m);
      setShowModal(true);
    });
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'찜한작업'}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={[
            {title: '튜닝작업', value: 'work'},
            {title: '튜닝샵', value: 'store'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        <FlatList
          alwaysBounceVertical={
            page == 'work' && workList.length == 0
              ? false
              : page == 'store' && storeList.length == 0
              ? false
              : true
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          data={
            reduexState.loginDataCheck.login.login == false
              ? [{message: '로그인이 필요합니다.'}]
              : page == 'work' && workList.length > 0
              ? workList
              : page == 'store' && storeList.length > 0
              ? storeList
              : page == 'work'
              ? [{message: '찜한 작업이 없습니다.'}]
              : page == 'store'
              ? [{message: '찜한 샵이 없습니다.'}]
              : null
          }
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
            ) : page == 'work' && workList.length > 0 ? (
              <WorkPick
                navigation={props.navigation}
                getIndex={workList.indexOf(item) + 1}
                workListLength={workList.length}
                WorkListDelChangeValue={WorkListDelChangeValue}
                workListDel={workListDel}
                key={item._id}
                item={item}
                editMode={reduexState.editModeCheck.editMode}></WorkPick>
            ) : page == 'store' && storeList.length > 0 ? (
              <StorePick
                navigation={props.navigation}
                getIndex={storeList.indexOf(item) + 1}
                storeListLength={storeList.length}
                StoreListDelChangeValue={StoreListDelChangeValue}
                storeListDel={storeListDel}
                key={item._id}
                item={item}
                editMode={reduexState.editModeCheck.editMode}></StorePick>
            ) : null
          }
          keyExtractor={(item) => String(item._id)}></FlatList>
        {/*하단 초기화 삭제하기버튼 시작*/}
        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        {reduexState.editModeCheck.editMode ? (
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
                    if (reduexState.editModeCheck.editMode) {
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
        {reduexState.loginDataCheck.login.login === false && showModal ? (
          <LoginModal
            ShowModalChangeValue={ShowModalChangeValue}
            navigation={props.navigation}></LoginModal>
        ) : reduexState.loginDataCheck.login.login === true ? (
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
