import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X_grayRound from '../../../../assets/home/x_grayRound.svg';
import Filter from '../../../../assets/home/filter.svg';
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
import FastImage from 'react-native-fast-image';

const {StatusBarManager} = NativeModules;
const SearchScreenDetail = ({navigation, route}) => {
  //여기서 새로 검색한것도 어싱크 스토리지에 넣고
  //기본으로 데이터받아오는 검색부터 진행해야됨.
  //데이터 받아와야하니까 로딩걸린다잉

  const [resentSearch, setResentSearch] = React.useState(
    route?.params?.resentSearch || null,
  );
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
  const textInputRef = useRef();
  const handleClick = () => {
    textInputRef.current.focus();
  };
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
  React.useEffect(() => {
    getValue();
  }, []);
  const [searchText, setSearchText] = React.useState(
    route?.params?.searchText || null,
  );
  console.log(searchText);

  React.useEffect(() => {}, []);
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
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: Width_convert(60),
            height: Height_convert(22),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: Width_convert(22),
            backgroundColor: '#946AEF',
            borderRadius: Font_normalize(3),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '800',
              fontSize: Font_normalize(10),
              color: '#FFFFFF',
            }}>
            튜닝작업(4)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: Width_convert(41),
            height: Height_convert(22),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: Width_convert(16),
            //backgroundColor: '#946AEF',
            //borderRadius: Font_normalize(3),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(10),
              color: '#000000',
            }}>
            튜냥샵(3)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{marginLeft: 'auto', marginRight: Width_convert(19)}}>
          <Filter></Filter>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: Width_convert(375),
            height: Width_convert(423),
          }}>
          <FastImage
            style={{width: Width_convert(375), height: Width_convert(240)}}
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}></FastImage>
          <View
            style={{
              width: Width_convert(362),
              height: Height_convert(16),
              marginTop: Height_convert(18),
              marginLeft: Width_convert(13),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: Font_normalize(2),
                backgroundColor: '#FFA740',
                marginRight: Width_convert(5),
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingTop: Width_convert(3),
                  paddingBottom: Width_convert(3),
                  paddingLeft: Width_convert(4),
                  paddingRight: Width_convert(4),
                  fontSize: Font_normalize(9),
                  fontWeight: '700',
                  fontFamily: Fonts?.NanumSqureRegular,
                  color: '#ffffff',
                }}>
                인기추천
              </Text>
            </View>
            <View
              style={{
                borderRadius: Font_normalize(2),
                backgroundColor: '#1A74FC',
                marginRight: Width_convert(5),
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingTop: Width_convert(3),
                  paddingBottom: Width_convert(3),
                  paddingLeft: Width_convert(4),
                  paddingRight: Width_convert(4),
                  fontSize: Font_normalize(9),
                  fontWeight: '700',
                  fontFamily: Fonts?.NanumSqureRegular,
                  color: '#ffffff',
                }}>
                우리가게 공임표 공개
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(423),
          }}></View>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(423),
          }}></View>
      </ScrollView>
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
