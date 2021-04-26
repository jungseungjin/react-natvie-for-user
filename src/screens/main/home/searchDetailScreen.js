import React, {useRef, useCallback, useState, useEffect} from 'react';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Width_convert.js';
import Height_convert_real from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X_grayRound from '../../../../assets/home/x_grayRound.svg';
import Filter from '../../../../assets/home/filter.svg';
import BlankBox from '../../../../assets/home/blank_box.svg';
import QuestionRound from '../../../../assets/home/question_round.svg';
import DisabledBox from '../../../../assets/home/disabled_box.svg';
import CheckedBox from '../../../../assets/home/checked_box.svg';
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
  Platform,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import SearchStore from '../../../components/Home/Search/searchStore.js';
import SearchNull from '../../../components/Home/Search/searchNull.js';
import SearchWork from '../../../components/Home/Search/searchWork.js';
import FilterIcon from '../../../components/Home/Search/filterIcon.js';
import FilterView from '../../../components/Home/Search/filterView.js';
import PickButton from '../../../components/Home/Search/pickButton.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import {useSelector} from 'react-redux';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import AlertModal1 from '../../../components/Modal/AlertModal1';
import AlertModal2 from '../../../components/Modal/AlertModal2';

import IsLoading from '../../../components/ActivityIndicator';
import Lottie from '../../../components/Lottie';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';

const SearchScreenDetail = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [showModal, setShowModel] = useState(false);
  const ShowModalChangeValue = (text) => setShowModel(text);
  const [searchText, setSearchText] = useState(
    props.route?.params?.searchText || null,
  );
  const [resentSearch, setResentSearch] = useState(
    props.route?.params?.resentSearch || null,
  );
  const [statusBar, setStatusBar] = useState(0);
  const [statusBarSafeAreaView, setStatusBarSafeAreaView] = useState(0);
  const [resultWorkList, setResultWorkList] = useState([]);
  const [workCount, setWorkCount] = useState(0);
  const [resultStoreList, setResultStoreList] = useState([]);
  const [storeCount, setStoreCount] = useState(0);
  const [pickButton, setPickButton] = useState('work');
  const ButtonChangeValue = (text) => {
    scrollToTop();
    setPickButton(text);
  };
  const scrollRef = useRef();
  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollToOffset({animated: false, offset: 0});
  }, [resultWorkList, resultStoreList]);
  const [pickFilter, setPickFilter] = useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = useState(
    reduxState.loginDataCheck?.login?.location?.legalcode
      ? '가까운 순 '
      : false,
  );
  //정렬
  const SortChangeValue = (text) => {
    setPickSort(text);
    setBackendWorkPage(1);
    setBackendStorePage(1);
    scrollToTop();
    getData(
      searchText,
      reduxState.loginDataCheck?.login?.location?.longitude ||
        randomLocation?.longitude,
      reduxState.loginDataCheck?.login?.location?.latitude ||
        randomLocation?.latitude,
      0,
      text,
    );
  };
  //검색한 값으로 데이터 가져오기
  const [backendWorkPage, setBackendWorkPage] = useState(1);
  const [backendStorePage, setBackendStorePage] = useState(1);
  const [randomLocation, setRandomLocation] = useState({});
  const throttleGetDataWork = _.throttle(
    (Number) =>
      getData(
        searchText,
        reduxState.loginDataCheck?.login?.location?.longitude ||
          randomLocation?.longitude,
        reduxState.loginDataCheck?.login?.location?.latitude ||
          randomLocation?.latitude,
        backendWorkPage,
        pickSort,
        'work',
      ),
    300,
    {
      leading: true,
      trailing: false,
    },
  );
  const throttleGetDataStore = _.throttle(
    (Number) =>
      getData(
        searchText,
        reduxState.loginDataCheck?.login?.location?.longitude ||
          randomLocation?.longitude,
        reduxState.loginDataCheck?.login?.location?.latitude ||
          randomLocation?.latitude,
        backendStorePage,
        pickSort,
        'store',
      ),
    300,
    {
      leading: true,
      trailing: false,
    },
  );
  const getData = (Search, Longitude, Latitude, Page, Sort, type) => {
    try {
      //검색어, 페이지 ,필터값, 지역
      let search;
      let longitude;
      let latitude;
      let page;
      let sort;
      if (Search) {
        search = Search;
      }
      if (Longitude) {
        longitude = Longitude;
      }
      if (Latitude) {
        latitude = Latitude;
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
      let url = `${Domain}api/work/get/search`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              search: search,
              longitude: longitude,
              latitude: latitude,
              page: page,
              sort: sort,
              type: type,
            },
          });
          if (result.data.success === true) {
            if (type === 'work') {
              if (Page) {
                if (result.data.result[0][0]?.totalData.length > 0) {
                  let newArr = [];
                  let prevArr = [];
                  resultWorkList.map((item) => {
                    prevArr.push(item._id);
                  });
                  result.data.result[0][0]?.totalData.map((item) => {
                    if (prevArr.includes(item._id) === false) {
                      newArr.push(item);
                    }
                  });
                  setResultWorkList([...resultWorkList, ...newArr]);
                  setBackendWorkPage((prevData) => {
                    return prevData + 1;
                  });
                }
              } else {
                setWorkCount(
                  result.data.result[0][0]?.totalCount[0]?.count || 0,
                );
                setResultWorkList(result.data.result[0][0]?.totalData || []);
              }
            } else if (type === 'store') {
              if (Page) {
                if (result.data.result[1][0]?.totalData.length > 0) {
                  let newArr = [];
                  let prevArr = [];
                  resultStoreList.map((item) => {
                    prevArr.push(item._id);
                  });
                  result.data.result[1][0]?.totalData.map((item) => {
                    if (prevArr.includes(item._id) === false) {
                      newArr.push(item);
                    }
                  });
                  setResultStoreList([...resultStoreList, ...newArr]);
                  setBackendStorePage((prevData) => {
                    return prevData + 1;
                  });
                }
              } else {
                setStoreCount(
                  result.data.result[1][0]?.totalCount[0]?.count || 0,
                );
                setResultStoreList(result.data.result[1][0]?.totalData || []);
              }
            } else {
              setWorkCount(result.data.result[0][0]?.totalCount[0]?.count || 0);
              setStoreCount(
                result.data.result[1][0]?.totalCount[0]?.count || 0,
              );
              setResultStoreList(result.data.result[1][0]?.totalData || []);
              setResultWorkList(result.data.result[0][0]?.totalData || []);
              setRandomLocation({
                longitude: result.data.longitude,
                latitude: result.data.latitude,
              });
            }
            setIsLoadingAndModal(0);
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
  //검색한 값 저장 및 데이터 새로불러오기
  const addData = async (searchValue) => {
    try {
      if (resentSearch.indexOf(searchValue) != -1) {
      } else {
        const list = [...resentSearch, searchValue];
        setResentSearch(list);
        await AsyncStorage.setItem('resentSearch', JSON.stringify(list));
      }
      setBackendWorkPage(1);
      setBackendStorePage(1);
      scrollToTop();
      getData(
        searchValue,
        reduxState.loginDataCheck?.login?.location?.longitude ||
          randomLocation?.longitude,
        reduxState.loginDataCheck?.login?.location?.latitude ||
          randomLocation?.latitude,
        0,
        pickSort,
        false,
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //검색어, longitude, latitude, page,sort
    getData(
      props.route?.params?.searchText,
      reduxState.loginDataCheck?.login?.location?.longitude ||
        randomLocation?.longitude,
      reduxState.loginDataCheck?.login?.location?.latitude ||
        randomLocation?.latitude,
      0,
      pickSort,
      false,
    );
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const textInputRef = useRef();
  const handleClick = () => {
    textInputRef.current.focus();
  };
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <DismissKeyboard>
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View
            style={{
              height:
                StatusBarHeight < 40
                  ? Height_convert(88) - 44
                  : Height_convert(88) - StatusBarHeight,
              width: Width_convert(375),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.goBack();
              }}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={{
                marginLeft: Width_convert(22),
                marginRight: Width_convert(15),
                width: Width_convert(14),
                height: Height_convert(16),
              }}>
              <GoBack fill={'#000000'}></GoBack>
            </TouchableOpacity>
            <TextInput
              ref={textInputRef}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => {
                setSearchText(text);
              }}
              onFocus={() => {
                setPickFilter(false);
              }}
              defaultValue={searchText}
              returnKeyType={'search'}
              onSubmitEditing={() => {
                let text = searchText.trim();
                if (text.length > 1) {
                  addData(text);
                  //onRefresh(text, searchRandomNumber);
                } else {
                  showToast('검색어를 두 글자 이상 입력해주세요.', 500);
                }
              }}
              style={{
                width: Width_convert(249),
                fontSize: Font_normalize(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholderTextColor="#A1A1A1"
              placeholder={'튜닝부품 or 작업, 튜닝샵 검색'}
              //onKeyPress={this.handleKeyDown}
              // /handleKeyDown: function(e) {
              //   if(e.nativeEvent.key == "Enter"){
              //     dismissKeyboard();
              // }
            ></TextInput>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
              onPress={() => {
                setPickFilter(false);
                setSearchText('');
                handleClick();
              }}
              style={{
                marginRight: Width_convert(15),
                width: Width_convert(16),
                height: Height_convert(16),
              }}>
              <X_grayRound></X_grayRound>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={{
                marginRight: Width_convert(22),
                width: Width_convert(20),
                height: Height_convert(20),
              }}
              onPress={() => {
                let text = searchText.trim();
                if (text.length > 1) {
                  addData(text);
                  //onRefresh(text, searchRandomNumber);
                } else {
                  showToast('검색어를 두 글자 이상 입력해주세요.', 500);
                }
              }}>
              <Search></Search>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(51),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <PickButton
              Title={'튜닝작업'}
              Length={workCount}
              nowValue={pickButton}
              ButtonChangeValue={ButtonChangeValue}></PickButton>
            <PickButton
              Title={'튜닝샵'}
              Length={storeCount}
              nowValue={pickButton}
              ButtonChangeValue={ButtonChangeValue}></PickButton>
            <FilterIcon
              PickChangeValue={PickChangeValue}
              nowValue={pickFilter}></FilterIcon>
          </View>
          {pickFilter ? (
            <View
              style={[
                Platform.OS == 'android'
                  ? {top: Height_convert(138) - StatusBarHeight}
                  : {top: Height_convert(138)},
                {
                  width: Width_convert(375),
                  height: Height_convert(818),
                  position: 'absolute',
                  zIndex: 1,
                },
              ]}>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(162 - 32),
                  backgroundColor: '#FFFFFF',
                }}>
                <FilterView
                  index={0}
                  Title={'가까운 순 '}
                  nowValue={pickSort}
                  ShowModalChangeValue={ShowModalChangeValue}
                  location={
                    reduxState.loginDataCheck?.login?.location?.legalcode ||
                    null
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
          {(pickButton == 'work' && resultWorkList.length == 0) ||
          (pickButton == 'store' && resultStoreList.length == 0) ? (
            <SearchNull></SearchNull>
          ) : (
            <FlatList
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
              ref={scrollRef}
              style={{minHeight: Height_convert(812)}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={
                pickButton === 'work'
                  ? resultWorkList
                  : pickButton === 'store'
                  ? resultStoreList
                  : null
              }
              windowSize={2}
              initialNumToRender={10}
              onEndReached={
                pickButton === 'work'
                  ? throttleGetDataWork
                  : pickButton === 'store'
                  ? throttleGetDataStore
                  : null
              }
              onEndReachedThreshold={1}
              renderItem={({item}) =>
                pickButton == 'work' ? (
                  <>
                    {resultWorkList.indexOf(item) != 0 ? (
                      <View style={{height: Height_convert(15)}}></View>
                    ) : null}
                    <SearchWork
                      key={item._id}
                      item={item}
                      navigation={props.navigation}></SearchWork>
                    {resultWorkList.indexOf(item) ==
                    resultWorkList.length - 1 ? (
                      <View style={{height: Height_convert(390)}}></View>
                    ) : null}
                  </>
                ) : pickButton == 'store' ? (
                  <>
                    <SearchStore
                      key={item._id}
                      item={item}
                      navigation={props.navigation}></SearchStore>
                    {resultStoreList.indexOf(item) ==
                    resultStoreList.length - 1 ? (
                      <View style={{height: Height_convert(390)}}></View>
                    ) : null}
                  </>
                ) : null
              }
              keyExtractor={(item) => String(item._id)}></FlatList>
          )}
          <Toast
            ref={(toast) => (toastRef = toast)}
            style={{
              backgroundColor: '#474747',
              paddingTop: Height_convert(16),
              paddingBottom: Height_convert(16),
              paddingRight: Width_convert(20),
              paddingLeft: Width_convert(20),
              borderRadius: Font_normalize(7),
            }}
            position="center"
            //opacity={0.8}
            textStyle={{color: '#FFFFFF'}}
          />
        </SafeAreaView>
      </DismissKeyboard>
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
        <Lottie></Lottie>
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
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    //borderBottomColor: 'rgba(219,219,219,1)',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
});
export default SearchScreenDetail;
