import React, {useRef} from 'react';
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
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
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
  Keyboard,
} from 'react-native';

import StatusBarHeight from '../../../components/StatusBarHeight.js';
import Toast, {DURATION} from 'react-native-easy-toast';

import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';

const MapScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const [searchText, setSearchText] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);
  const [searchOn, setSearchOn] = React.useState(false);
  const SearchAddr = async () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //setIsLoadingAndModal(1);
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
            Keyboard.dismiss();
          } else {
          }
          setSearchOn(true);
          //setIsLoadingAndModal(0);
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      setIsLoadingAndModal(3);
      console.log(err);
    }
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            width: '100%',
            height:
              StatusBarHeight < 40
                ? Height_convert(88) - 44
                : Height_convert(88) - StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '30%',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                props.navigation.goBack();
              }}>
              <X fill={'#000000'} style={{marginLeft: Width_convert(22)}}></X>
            </TouchableOpacity>
          </View>
          <View style={{width: '40%', alignItems: 'center'}}>
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
          </View>
          <View style={{width: '30%'}}></View>
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
            onSubmitEditing={() => {
              if (searchText) {
                SearchAddr();
              } else {
                showToast('검색어를 입력해주세요.', 1000);
              }
            }}
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
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
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
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              if (searchText) {
                SearchAddr();
              } else {
                showToast('검색어를 입력해주세요.', 1000);
              }
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
              // width: Width_convert(375),
              // height: Height_convert(642) + 2 * StatusBarHeight,
              flex: 1,
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
                ? '검색 결과가 없습니다 지역을 다시 검색해주세요.'
                : '고객님이 튜닝작업 받기 원하시는 지역을 검색해주세요.'}
            </Text>
          </View>
        ) : (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {searchList.map((item) => (
              <View
                key={item.jibunAddress || item.roadAddress}
                style={{height: Height_convert(44), justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (props.route.params.from == 'Setting') {
                      props.navigation.navigate('Map', {
                        from: props.route.params.from,
                        PickLocation: item,
                        PickBrandValue: props.route.params.PickBrandValue,
                        PickModelValue: props.route.params.PickModelValue,
                        PickModelDetail: props.route.params.PickModelDetail,
                      });
                    } else if (
                      props.route.params.from == 'SignUpInformation4'
                    ) {
                      props.navigation.navigate('Map_more', {
                        from: props.route.params.from,
                        PickLocation: item,
                      });
                    }
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
                    {item.jibunAddress || item.roadAddress}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
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
