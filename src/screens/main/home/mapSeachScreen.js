import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x_black.svg';
import XButton from '../../../../assets/home/x_button.svg';
import Place_check from '../../../../assets/home/place_check';
import NetInfo from '@react-native-community/netinfo';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import axios from 'axios';
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
} from 'react-native';

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
const MapScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);
  const [searchOn, setSearchOn] = React.useState(false);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const SearchAddr = async () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          setIsLoading(true);
          let result = await axios.get(
            'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' +
              searchText,
            {
              headers: {
                'X-NCP-APIGW-API-KEY-ID': '56kfacm95e',
                'X-NCP-APIGW-API-KEY':
                  'cyhAcOnJGtzyYZiQFDcOkWkJcsL5t0FAQ3bJldMR',
              },
            },
          );
          if (result.data.addresses) {
            setSearchList(result.data.addresses);
          } else {
          }
          setSearchOn(true);
          setIsLoading(false);
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      alert(err);
    }
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            height: Height_convert(88) - StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{
              marginLeft: Width_convert(22),
              marginRight: Width_convert(15),
              width: Width_convert(14),
              height: Height_convert(16),
            }}>
            <X></X>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Font_normalize(16),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              color: '#000000',
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            주소검색
          </Text>
          <View
            activeOpacity={1}
            onPress={() => {}}
            style={{
              marginRight: Width_convert(22),
              width: Width_convert(20),
              height: Height_convert(20),
            }}></View>
        </View>
        <View
          style={{
            height: Height_convert(88) - StatusBarHeight,
            marginBottom: Height_convert(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: 'rgba(219,219,219,0.35)',
            borderBottomWidth: 1,
          }}>
          <TextInput
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            keyboardType="default"
            value={searchText}
            onChangeText={(value) => {
              setSearchText(value);
            }}
            returnKeyType={'search'}
            onSubmitEditing={() => {}}
            style={{
              width: Width_convert(280),
              height: Width_convert(34),
              fontSize: Font_normalize(16),
              marginLeft: Width_convert(22),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '400',
              paddingTop: 0,
              paddingBottom: 0,
            }}
            placeholderTextColor="#A1A1A1"
            placeholder={'읍 면 동으로 간편하게 검색해주세요'}
            //onKeyPress={this.handleKeyDown}
            // /handleKeyDown: function(e) {
            //   if(e.nativeEvent.key == "Enter"){
            //     dismissKeyboard();
            // }
          ></TextInput>
          {searchText ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSearchText('');
              }}
              style={{
                height: Width_convert(34),
                justifyContent: 'center',
              }}>
              <XButton
                style={{
                  marginRight: Width_convert(10),
                }}></XButton>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              SearchAddr();
            }}
            style={{
              marginRight: Width_convert(22),
            }}>
            <Search></Search>
          </TouchableOpacity>
        </View>
        {searchList.length == 0 ? (
          <View
            style={{
              width: Width_convert(375),
              height: Height_convert(642) + 2 * StatusBarHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.Swagger || null,
                fontSize: Font_normalize(20),
                color: '#B4B4B4',
                textAlign: 'center',
              }}>
              {searchOn
                ? '검색 결과가 없습니다 지역을 다시 검색해주세요'
                : '고객님이 튜닝작업 받기 원하시는 지역을 검색해주세요'}
            </Text>
          </View>
        ) : (
          <ScrollView style={{flex: 1}}>
            {searchList.map((item) => (
              <View
                style={{height: Height_convert(44), justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate('Map', {PickLocation: item});
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: Width_convert(15),
                  }}>
                  <Place_check
                    style={{marginRight: Width_convert(12)}}></Place_check>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    {item.jibunAddress}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
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
export default MapScreen;
