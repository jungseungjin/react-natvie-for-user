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
} from 'react-native';

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
const MapScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [searchText, setSearchText] = React.useState('');
  const [pickLocation, setPickLocation] = React.useState(
    props.route.params.PickLocation.jibunAddress,
  );
  const [P0, setP0] = React.useState({
    latitude: parseFloat(props.route.params.PickLocation.y),
    longitude: parseFloat(props.route.params.PickLocation.x),
  });

  const getNaverLocagtion = async (position) => {
    try {
      setIsLoading(true);
      let result = await axios.get(
        'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=' +
          position.longitude +
          ',' +
          position.latitude +
          '&orders=legalcode,admcode,addr,roadaddr&&output=json',
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': '56kfacm95e',
            'X-NCP-APIGW-API-KEY': 'cyhAcOnJGtzyYZiQFDcOkWkJcsL5t0FAQ3bJldMR',
          },
        },
      );
      //legalcode admcode addr roadaddr
      //법정동 행정동 지번주소 도로명주소
      if (result.data.status.message == 'done') {
        setIsLoading(false);
        setPickLocation(
          result.data.results[0].region.area1.name +
            ' ' +
            result.data.results[0].region.area2.name +
            ' ' +
            result.data.results[0].region.area3.name,
        );
      } else {
        setIsLoading(false);
        setPickLocation('요청한 데이타의 결과가 없습니다.');
        //네이버 맵에 없음
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      alert(err);
    }
  };
  React.useEffect(() => {
    getNaverLocagtion(P0);
  }, [P0]);
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
            borderBottomColor: 'rgba(219,219,219,0.35)',
            borderBottomWidth: 1,
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
            <GoBack fill={'#000000'}></GoBack>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('MapSearch');
            }}>
            <TextInput
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              editable={false}
              keyboardType="default"
              value={pickLocation}
              onChangeText={() => {}}
              returnKeyType={'search'}
              onSubmitEditing={() => {}}
              style={{
                width: Width_convert(280),
                fontSize: Font_normalize(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholderTextColor="#A1A1A1"
              placeholder={'주소검색'}
              //onKeyPress={this.handleKeyDown}
              // /handleKeyDown: function(e) {
              //   if(e.nativeEvent.key == "Enter"){
              //     dismissKeyboard();
              // }
            ></TextInput>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('MapSearch');
            }}
            style={{
              marginRight: Width_convert(22),
              width: Width_convert(20),
              height: Height_convert(20),
            }}>
            <Search></Search>
          </TouchableOpacity>
        </View>
        <View style={{width: Width_convert(375), height: Height_convert(600)}}>
          <NaverMapView
            style={{width: '100%', height: '100%', position: 'absolute'}}
            center={{...P0, zoom: 16}}
            scaleBar={false}
            zoomControl={false}
            rotateGesturesEnabled={false}
            useTextureView={false}
            // onTouch={(e) =>
            //   console.warn('onTouch', JSON.stringify(e.nativeEvent))
            // }
            onCameraChange={(e) =>
              setP0({
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
              })
            }
            //onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
          >
            <Marker
              coordinate={P0}
              onClick={() => console.warn('onClick! p0')}
            />
          </NaverMapView>
          <TouchableOpacity
            onPress={() => {
              alert('gdgd');
            }}
            style={{
              zIndex: 9999,
              width: 60,
              height: 60,
              position: 'absolute',
              bottom: 20,
              right: 20,
              borderRadius: 30,
              backgroundColor: '#d2d2d2',
            }}>
            <Text>gdgdgd</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: Width_convert(339),
              height: Height_convert(46),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Font_normalize(3),
              backgroundColor: '#946AEF',
              marginTop: Height_convert(18),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              설정완료
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {showModal ? (
        <ButtonTwoModal
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={
            '지역 설정을 위해 고객님의 권한이 필요합니다. 권한을 허용하시겠습니까?'
          }
          //BottomText={'설정하러가기'}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></ButtonTwoModal>
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
