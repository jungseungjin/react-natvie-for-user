import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
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
  NativeModules,
  Platform,
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
const {StatusBarManager} = NativeModules;
const SearchScreenDetail = ({navigation, route}) => {
  //기본으로 데이터받아오는 검색부터 진행해야됨.
  //데이터 받아와야하니까 로딩걸린다잉
  const [searchText, setSearchText] = React.useState(
    route?.params?.searchText || null,
  );
  const [resentSearch, setResentSearch] = React.useState(
    route?.params?.resentSearch || null,
  );
  const [statusBar, setStatusBar] = React.useState(0);
  const [statusBarSafeAreaView, setStatusBarSafeAreaView] = React.useState(0);
  const [resultWorkList, setresultWorkList] = React.useState([
    {tt: 'tt'},
    {tt: 'tt'},
    {tt: 'tt'},
    {tt: 'tt'},
  ]);
  const [resultStoreList, setresultStoreList] = React.useState([]);
  const [pickButton, setPickButton] = React.useState('work');
  const ButtonChangeValue = (text) => setPickButton(text);
  const [pickFilter, setPickFilter] = React.useState(false);
  const PickChangeValue = () => setPickFilter(!pickFilter);
  const [pickSort, setPickSort] = React.useState(false);
  const SortChangeValue = (text) => setPickSort(text);
  const addData = async (searchValue) => {
    try {
      if (resentSearch.indexOf(searchValue) != -1) {
      } else {
        const list = [...resentSearch, searchValue];
        setResentSearch(list);
        console.log(list);
        await AsyncStorage.setItem('resentSearch', JSON.stringify(list));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
      setStatusBarSafeAreaView(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);
  const textInputRef = useRef();
  const handleClick = () => {
    textInputRef.current.focus();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          height: Height_convert(88) - statusBar,
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
            navigation.goBack();
          }}
          style={{
            marginLeft: Width_convert(22),
            marginRight: Width_convert(15),
            width: Width_convert(14),
            height: Height_convert(16),
          }}>
          <GoBack></GoBack>
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
          defaultValue={searchText}
          returnKeyType={'search'}
          onSubmitEditing={() => {
            if (searchText.trim()) {
              //검색함수 ㄲ
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
          onPress={() => {
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
          style={{
            marginRight: Width_convert(22),
            width: Width_convert(20),
            height: Height_convert(20),
          }}
          onPress={() => {
            if (searchText.trim()) {
              //검색함수 ㄲ
              addData(searchText);
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
          style={{
            width: Width_convert(375),
            height: Height_convert(818),
            top: Height_convert(138) - statusBarSafeAreaView,
            position: 'absolute',
            zIndex: 1,
          }}>
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(162),
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
                setPickFilter(false);
              }}></TouchableOpacity>
          </View>
        </View>
      ) : null}
      {resultWorkList.length == 0 && resultStoreList.length == 0 ? (
        <SearchNull></SearchNull>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {resultStoreList ? <SearchStore></SearchStore> : null}
          {resultWorkList ? <SearchWork></SearchWork> : null}
        </ScrollView>
      )}
    </SafeAreaView>
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
