import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
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
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const {StatusBarManager} = NativeModules;
const SearchScreen = ({navigation, route}) => {
  const unsubscribe = navigation.addListener('focus', async () => {
    let list = await AsyncStorage.getItem('resentSearch');
    if (list !== null) {
      setResentSearch(JSON.parse(list));
    }
  });
  const [statusBar, setStatusBar] = React.useState(0);
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
    }
  };
  const [resentSearch, setResentSearch] = React.useState([]);
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
  React.useEffect(() => {
    getValue();
    getData();
  }, []);
  React.useEffect(() => {
    unsubscribe;
  }, [navigation]);

  const [searchText, setSearchText] = React.useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          height: Height_convert(88) - statusBar,
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
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          keyboardType="default"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          returnKeyType={'search'}
          onSubmitEditing={() => {
            if (searchText.trim()) {
              navigation.navigate('SearchDetail', {
                searchText: searchText,
                resentSearch: resentSearch,
              });
              addData(searchText);
            } else {
              alert('검색어를 입력해주세요.');
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
          onPress={() => {
            if (searchText.trim()) {
              navigation.navigate('SearchDetail', {
                searchText: searchText,
                resentSearch: resentSearch,
              });
              addData(searchText);
            } else {
              alert('검색어를 입력해주세요.');
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
                activeOpacity={1}
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
export default SearchScreen;