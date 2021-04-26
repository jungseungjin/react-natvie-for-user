import React, {useRef, useState, useCallback, useEffect} from 'react';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Width_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x.svg';
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import StatusBarHeight from '../../../components/StatusBarHeight.js';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import Toast, {DURATION} from 'react-native-easy-toast';

import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const SearchScreen = ({navigation, route}) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  useEffect(
    () =>
      navigation.addListener('focus', async () => {
        let list = await AsyncStorage.getItem('resentSearch');
        if (list !== null) {
          setResentSearch(JSON.parse(list));
        }
      }),
    [],
  );
  const [resentSearch, setResentSearch] = useState([]);
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
  const removeData = async (searchValue) => {
    try {
      let list = [...resentSearch];
      if (list.indexOf(searchValue) != -1) {
        list.splice(list.indexOf(searchValue), 1);
      }
      await AsyncStorage.setItem('resentSearch', JSON.stringify(list));
      setResentSearch(list);
    } catch (err) {
      console.log(err);
    }
  };
  const removeAll = async () => {
    try {
      await AsyncStorage.removeItem('resentSearch');
      setResentSearch([]);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      let list = await AsyncStorage.getItem('resentSearch');
      if (list !== null) {
        setResentSearch(JSON.parse(list));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  let toastRef;
  const showToast = (text, time) => {
    toastRef.show(text, time, () => {
      // something you want to do at close
    });
  };
  const [searchText, setSearchText] = useState('');
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomColor: 'rgba(219,219,219,0.35)',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                marginLeft: Width_convert(22),
                marginRight: Width_convert(15),
                width: Width_convert(14),
                height: Height_convert(16),
              }}>
              <GoBack fill={'#000000'}></GoBack>
            </TouchableOpacity>
            <TextInput
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => {
                setSearchText(text);
              }}
              returnKeyType={'search'}
              onSubmitEditing={() => {
                let text = searchText.trim();
                if (text.length > 1) {
                  navigation.navigate('SearchDetail', {
                    searchText: searchText,
                    resentSearch: resentSearch,
                  });
                  addData(searchText);
                } else {
                  showToast('검색어를 두 글자 이상 입력해주세요.', 1000);
                }
              }}
              style={{
                width: Width_convert(280),
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
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                let text = searchText.trim();
                if (text.length > 1) {
                  navigation.navigate('SearchDetail', {
                    searchText: searchText,
                    resentSearch: resentSearch,
                  });
                  addData(searchText);
                } else {
                  showToast('검색어를 두 글자 이상 입력해주세요.', 1000);
                }
              }}
              style={{
                marginRight: Width_convert(22),
                width: Width_convert(20),
                height: Height_convert(20),
              }}>
              <Search></Search>
            </TouchableOpacity>
          </View>
          {resentSearch.length > 0 ? (
            <ScrollView style={{flex: 1}}>
              <View
                style={{
                  width: Width_convert(375),
                  height: Height_convert(44),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(14),
                    fontWeight: '400',
                    color: '#000000',
                    marginLeft: Width_convert(22),
                  }}>
                  최근 검색어
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    removeAll();
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '400',
                      color: '#BCBCBC',
                      marginRight: Width_convert(22),
                    }}>
                    전체삭제
                  </Text>
                </TouchableOpacity>
              </View>
              {resentSearch.map((item) => (
                <View
                  key={item}
                  style={{
                    width: Width_convert(375),
                    height: Height_convert(38),
                    marginBottom: Height_convert(3),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    style={{
                      width: Width_convert(320),
                    }}
                    onPress={() => {
                      navigation.navigate('SearchDetail', {
                        searchText: item,
                        resentSearch: resentSearch,
                      });
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(16),
                        fontWeight: '400',
                        color: '#000000',
                        marginLeft: Width_convert(22),
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    activeOpacity={1}
                    style={{
                      paddingLeft: Width_convert(10),
                      paddingTop: Height_convert(5),
                      paddingBottom: Height_convert(5),
                    }}
                    onPress={() => {
                      removeData(item);
                    }}>
                    <X
                      style={{
                        marginRight: Width_convert(22),
                      }}></X>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : null}
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
      </DismissKeyboard>
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
export default SearchScreen;
