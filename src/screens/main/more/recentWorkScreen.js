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
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import TabBarBottom from '../../../components/Pick/Tabbar/tabbarBottom.js';
import WorkPick from '../../../components/Pick/Work/workPick.js';
import StorePick from '../../../components/Pick/Store/storePick.js';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import StatusBarHeight from '../../../components/StatusBarHeight';
import AlertModal1 from '../../../components/Modal/AlertModal1';
import AlertModal2 from '../../../components/Modal/AlertModal2';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const RecentWork = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const reduexState = useSelector((state) => state);
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState('work');
  const PageChangeValue = (text) => setPage(text);

  const [workList, setWorkList] = React.useState([]);
  const [workListDel, setWorkListDel] = React.useState([]);
  const WorkListDelChangeValue = (text) => setWorkListDel(text);
  const [storeList, setStoreList] = React.useState([]);
  const [storeListDel, setStoreListDel] = React.useState([]);
  const StoreListDelChangeValue = (text) => setStoreListDel(text);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const DeleteModalChangeValue = (text) => setDeleteModal(text);

  //최근 본 작업 - 작업 데이터 가져오기
  const get_recentWorkList = async () => {
    try {
      let value = await AsyncStorage.getItem('recentWorkList');
      if (value == null) {
        setWorkList([]);
      } else {
        let new_data = value.split(',');
        let new_arr = [];
        let new_str = '';
        for (var a = 0; a < new_data.length; a++) {
          if (a == 0) {
            new_str = new_data[a];
          } else {
            new_str = new_str + ',' + new_data[a];
          }
        }
        let result;
        let url = Domain2 + 'recentWorkList';

        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let result = await axios.get(url, {
              params: {
                workid: new_str,
              },
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].message == 'ok') {
              setWorkList(result.data[0].result);
            } else {
              setWorkList([]);
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
            setIsLoadingAndModal(2);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //최근 본 작업 - 가게 데이터 가져오기
  const get_recentStoreList = async () => {
    try {
      let value = await AsyncStorage.getItem('recentStoreList');
      if (value == null) {
        setStoreList([]);
      } else {
        let new_data = value.split(',');
        let new_arr = [];
        let new_str = '';
        for (var a = 0; a < new_data.length; a++) {
          if (a == 0) {
            new_str = new_data[a];
          } else {
            new_str = new_str + ',' + new_data[a];
          }
        }
        let result;
        let url = Domain2 + 'recentStoreList';

        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let result = await axios.get(url, {
              params: {
                storeid: new_str,
              },
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (result.data[0].message == 'ok') {
              setStoreList(result.data[0].result);
            } else {
              setStoreList([]);
            }
          } else {
            //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
            setIsLoadingAndModal(2);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //데이터 삭제하기
  const delete_data = async () => {
    try {
      props.updateEditMode(!reduexState.editModeCheck.editMode);
      let Workvalue = await AsyncStorage.getItem('recentWorkList');
      let newValue = Workvalue;
      for (var a = 0; a < workListDel.length; a++) {
        newValue = newValue.replace(workListDel[a], '');
        newValue = newValue.replace(',,', ',');
      }
      await AsyncStorage.setItem('recentWorkList', newValue);
      let Storevalue = await AsyncStorage.getItem('recentStoreList');
      let newStoreValue = Storevalue;
      for (var a = 0; a < storeListDel.length; a++) {
        newStoreValue = newStoreValue.replace(storeListDel[a], '');
        newStoreValue = newStoreValue.replace(',,', ',');
      }
      await AsyncStorage.setItem('recentStoreList', newStoreValue);
      if (newValue != Workvalue || newStoreValue != Storevalue) {
        onRefresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get_recentWorkList();
    get_recentStoreList();
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    get_recentWorkList();
    get_recentStoreList();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'최근 본 작업'} navigation={props.navigation}></Tabbar>
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
            page == 'work' && workList.length > 0
              ? workList
              : page == 'store' && storeList.length > 0
              ? storeList
              : page == 'work'
              ? [{message: '최근 본 작업이 없습니다.'}]
              : page == 'store'
              ? [{message: '최근 본 샵이 없습니다.'}]
              : null
          }
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) =>
            page == 'work' && workList.length > 0 ? (
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
            ) : page == 'work' || page == 'store' ? (
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
      </SafeAreaView>
      {deleteModal ? (
        <AlertModal2
          type={1}
          ShowModalChangeValue={DeleteModalChangeValue}
          Delete={delete_data}
          navigation={props.navigation}
          Title={'최근 본 항목을 삭제하시겠습니까?'}
          //BottomText={''}
          //CenterButtonText={'확인'}
          LeftButtonTitle={'취소'}
          RightButtonTitle={'확인'}></AlertModal2>
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

function mapStateToProps(state) {
  return {
    editMode: state.editMode,
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEditMode: (boo) => {
      dispatch(ActionCreator.editModeCheck(boo));
    },
    // updateFirst:(num) => {
    //     dispatch(ActionCreator.updateSumValueFirst(num));

    // },
    // updateSecond:(num) => {
    //     dispatch(ActionCreator.updateSumValueSecond(num));
    // }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RecentWork);
