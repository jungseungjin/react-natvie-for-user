import React, {useRef} from 'react';
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

const SearchScreenDetail = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [showModal, setShowModel] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModel(text);
  const [searchText, setSearchText] = React.useState(
    props.route?.params?.searchText || null,
  );
  const [resentSearch, setResentSearch] = React.useState(
    props.route?.params?.resentSearch || null,
  );
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [statusBar, setStatusBar] = React.useState(0);
  const [statusBarSafeAreaView, setStatusBarSafeAreaView] = React.useState(0);
  const [resultWorkList, setresultWorkList] = React.useState([]);
  const [resultStoreList, setresultStoreList] = React.useState([]);
  const [pickButton, setPickButton] = React.useState('work');
  const ButtonChangeValue = (text) => {
    setPickButton(text);
    setPickFilter(false);
  };
  const [pickFilter, setPickFilter] = React.useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = React.useState(
    reduxState.loginDataCheck?.login?.location?.legalcode
      ? '가까운 순 '
      : false,
  );
  //정렬
  const SortChangeValue = (text) => {
    //
    setPickSort(text);
    if (text !== false) {
      let ArrayList = resultWorkList.slice();
      let ArrayList2 = resultStoreList.slice();
      if (text === '가까운 순 ') {
        //거리 가까운것부터
        ArrayList.sort(function (a, b) {
          return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
        });
        ArrayList2.sort(function (a, b) {
          return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
        });
      } else if (text === '별점 순 ') {
        //별점 높은것부터
        ArrayList.sort(function (a, b) {
          return a.reviewGrade < b.reviewGrade
            ? 1
            : a.reviewGrade > b.reviewGrade
            ? -1
            : 0;
        });
        ArrayList2.sort(function (a, b) {
          return a.reviewGrade < b.reviewGrade
            ? 1
            : a.reviewGrade > b.reviewGrade
            ? -1
            : 0;
        });
      } else if (text === '후기많은 순 ') {
        ArrayList.sort(function (a, b) {
          return a.reviewCount < b.reviewCount
            ? 1
            : a.reviewCount > b.reviewCount
            ? -1
            : 0;
        });
        ArrayList2.sort(function (a, b) {
          return a.reviewCount < b.reviewCount
            ? 1
            : a.reviewCount > b.reviewCount
            ? -1
            : 0;
        });
      } else if (text === '찜 많은 순 ') {
        ArrayList.sort(function (a, b) {
          return a.userCount < b.userCount
            ? 1
            : a.userCount > b.userCount
            ? -1
            : 0;
        });
        ArrayList2.sort(function (a, b) {
          return a.userCount < b.userCount
            ? 1
            : a.userCount > b.userCount
            ? -1
            : 0;
        });
      } else if (text === '우리가게공임표 공개 ') {
        ArrayList.sort(function (a, b) {
          return a.store_work_total_cost < b.store_work_total_cost
            ? 1
            : a.store_work_total_cost > b.store_work_total_cost
            ? -1
            : 0;
        });
        ArrayList2.sort(function (a, b) {
          return a.store_badge.indexOf('4') != -1 &&
            b.store_badge.indexOf('4') == -1
            ? -1
            : a.store_badge.indexOf('4') == -1 &&
              b.store_badge.indexOf('4') != -1
            ? 1
            : 0;
        });
      }
      setresultWorkList(ArrayList);
      setresultStoreList(ArrayList2);
    }
  };
  //검색한 값으로 데이터 가져오기
  const [searchRandomNumber, setSearchRandomNumber] = React.useState(0);
  const getData = (searchText, sort, randomNumber) => {
    try {
      setPickFilter(false);
      let result;
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
      let url = `${Domain}searchlist/?searchText=${searchText}&longitude=${reduxState?.loginDataCheck?.login?.location?.location?.longitude}&latitude=${reduxState?.loginDataCheck?.login?.location?.location?.latitude}&sort=${sort}&random=${randomNumber}`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoadingAndModal(1);
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setresultWorkList(result.data[0].WorkList);
            setresultStoreList(result.data[0].StoreList);
            setSearchRandomNumber(result.data[0].randomNumber);
          } else {
            console.log(result.data[0]);
          }
          setIsLoadingAndModal(0);
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  //검색한 값 저장
  const addData = async (searchValue) => {
    try {
      if (resentSearch.indexOf(searchValue) != -1) {
      } else {
        const list = [...resentSearch, searchValue];
        setResentSearch(list);
        await AsyncStorage.setItem('resentSearch', JSON.stringify(list));
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(
    () =>
      props.navigation.addListener('focus', () => {
        if (pickSort != false) {
          getData(searchText, pickSort, searchRandomNumber);
        }
      }),
    [pickSort],
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = (text, randomNumber) => {
    setRefreshing(true);
    setPickSort(
      reduxState.loginDataCheck?.login?.location?.legalcode
        ? '가까운 순 '
        : false,
    );
    if (text) {
      getData(text, false, randomNumber || searchRandomNumber);
    } else {
      getData(searchText.trim(), false, randomNumber || searchRandomNumber);
    }
    setRefreshing(false);
  };
  const textInputRef = useRef();
  const handleClick = () => {
    textInputRef.current.focus();
  };
  React.useEffect(() => {
    getData(props.route?.params?.searchText, pickSort, searchRandomNumber);
  }, []);
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
                if (searchText.trim()) {
                  //검색함수 ㄲ
                  addData(searchText.trim());
                  onRefresh(searchText.trim(), searchRandomNumber);
                } else {
                  showToast('검색어를 입력해주세요.', 500);
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
                if (searchText.trim()) {
                  addData(searchText.trim());
                  onRefresh(searchText.trim(), searchRandomNumber);
                } else {
                  showToast('검색어를 입력해주세요.', 500);
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
              Length={resultWorkList.length}
              nowValue={pickButton}
              ButtonChangeValue={ButtonChangeValue}></PickButton>
            <PickButton
              Title={'튜닝샵'}
              Length={resultStoreList.length}
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{minHeight: Height_convert(812)}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={
                pickButton == 'work'
                  ? resultWorkList
                  : pickButton == 'store'
                  ? resultStoreList
                  : null
              }
              windowSize={2}
              initialNumToRender={10}
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
