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
import GPS from '../../../../assets/home/gps.svg';
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

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
const MapScreen = (props) => {
  const [P0, setP0] = React.useState({
    latitude: parseFloat(props.route.params.PickLocation.y),
    longitude: parseFloat(props.route.params.PickLocation.x),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [pageLoading, setPageLoading] = React.useState(0);
  const [searchText, setSearchText] = React.useState('');
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [pickLocation, setPickLocation] = React.useState({
    // latitude: parseFloat(props.route.params.PickLocation.y),
    // longitude: parseFloat(props.route.params.PickLocation.x),
    // legalcode:
    //   props.route.params?.PickLocation?.jibunAddress ||
    //   props.route.params?.PickLocation?.roadAddress,
  });

  //위치정보사용 퍼미션
  const handleLocationPermission = async (Type) => {
    if (Type == 'ios') {
      const res = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (res === RESULTS.GRANTED) {
        return true;
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (res2 === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (res === RESULTS.GRANTED) {
        return true;
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (res2 === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  //위치정보 가져오기(경위도, 네이버지도에서 주소까지)
  const CurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // position.coords.longitude = 126.70528; //지워야함
        // position.coords.latitude = 37.45639; //지워야함
        getNaverLocagtion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
        if (error.message.indexOf('permission denied') != -1) {
          setLocationModal(true);
        } else if (error.message.includes('permission not granted')) {
          setShowModal(true);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getNaverLocagtion = (position) => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          //setIsLoading(true);
          let result = await axios.get(
            'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=' +
              position.longitude +
              ',' +
              position.latitude +
              '&orders=legalcode,admcode,addr,roadaddr&&output=json',
            {
              headers: {
                'X-NCP-APIGW-API-KEY-ID': '56kfacm95e',
                'X-NCP-APIGW-API-KEY':
                  'cyhAcOnJGtzyYZiQFDcOkWkJcsL5t0FAQ3bJldMR',
              },
            },
          );

          //legalcode admcode addr roadaddr
          //법정동 행정동 지번주소 도로명주소
          if (result.data.status.message == 'done') {
            //setIsLoading(false);
            setPickLocation({
              latitude: parseFloat(position.latitude),
              longitude: parseFloat(position.longitude),
              legalcode:
                result.data.results[0].region.area1.name +
                ' ' +
                result.data.results[0].region.area2.name +
                ' ' +
                result.data.results[0].region.area3.name,
            });
            setP0({
              latitude: parseFloat(position.latitude),
              longitude: parseFloat(position.longitude),
            });
          } else {
            //setIsLoading(false);
            setPickLocation({
              latitude: parseFloat(position.latitude),
              longitude: parseFloat(position.longitude),
              legalcode: '요청한 데이타의 결과가 없습니다.',
            });
            //네이버 맵에 없음
          }
          forceUpdate();
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
  React.useEffect(() => {
    getNaverLocagtion(P0);
    setPageLoading(1);
  }, []);
  return (
    <>
      <View style={{width: '100%', height: '100%', position: 'absolute'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"></StatusBar>
        <NaverMapView
          style={{width: '100%', height: '100%', position: 'absolute'}}
          center={{
            latitude: parseFloat(props.route.params.PickLocation.y),
            longitude: parseFloat(props.route.params.PickLocation.x),
            zoom: 16,
          }}
          scaleBar={false}
          zoomControl={false}
          rotateGesturesEnabled={false}
          useTextureView={false}
          //onTouch={(e) => {}}
          onCameraChange={(e) => {
            if (Platform.OS === 'ios') {
              getNaverLocagtion({
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
              });
            }
          }}
          onMapClick={(e) => {
            if (Platform.OS === 'android') {
              getNaverLocagtion({
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
              });
            }
          }}>
          <Marker coordinate={P0} pinColor={'green'} onClick={() => {}} />
        </NaverMapView>
        <View
          style={{
            height: Height_convert(88) + StatusBarHeight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{
              marginRight: Width_convert(25),
              marginTop: Height_convert(4),
              padding: Width_convert(5),
              paddingRight: Width_convert(15),
              paddingTop: Width_convert(10),
              paddingBottom: Width_convert(10),
              marginLeft: Width_convert(17),
            }}>
            <GoBack
              style={{
                width: Width_convert(14),
                height: Height_convert(16),
              }}
              fill={'#000000'}></GoBack>
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={1}
            style={{}}
            onPress={() => {
              props.navigation.navigate('MapSearch');
            }}></TouchableOpacity> */}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (handleLocationPermission(Platform.OS)) {
              //위치정보 사용 ok 현재위치를 가져와야합니다. 어디서?? 네이버에서
              CurrentPosition(); //경위도 찍고
            } else {
              //위치정보 켜달라는 모달 띄우기
              LocationModalChangeValue(true);
            }
          }}
          style={{
            zIndex: 9999,
            width: Width_convert(42),
            height: Width_convert(42),
            position: 'absolute',
            bottom: Width_convert(174),
            right: Width_convert(22),
            borderRadius: Width_convert(21),
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',

            shadowColor: '#000000', //그림자색
            shadowOpacity: 0.3, //그림자 투명도
            shadowOffset: {width: 2, height: 2}, //그림자 위치
            //ANDROID
            elevation: 5,
          }}>
          <GPS></GPS>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: Width_convert(174 - 65),
            width: Width_convert(375),
            height: Height_convert(65),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(339),
              height: Height_convert(65),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Font_normalize(3),
              backgroundColor: '#FFFFFF',
              marginTop: Height_convert(18),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(19),
                fontWeight: '700',
                color: '#946AEF',
              }}>
              {pickLocation?.legalcode}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: Width_convert(174 - 65 - 46 - 10),
            width: Width_convert(375),
            height: Height_convert(46),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (props.route.params?.from == 'Setting') {
                props.navigation.navigate('Setting', {
                  PickLocation: pickLocation,
                  PickBrandValue: props.route.params.PickBrandValue,
                  PickModelValue: props.route.params.PickModelValue,
                  PickModelDetail: props.route.params.PickModelDetail,
                });
              } else if (props.route.params?.from == 'SignUpInformation4') {
                props.navigation.navigate('SignUpInformation4', {
                  PickLocation: pickLocation,
                });
              }
            }}
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
      </View>
      {locationModal ? (
        <AlertModal2
          type={1}
          Title={'지역 설정을 위해 위치서비스를 켜 주세요.'}
          navigation={props.navigation}
          ShowModalChangeValue={LocationModalChangeValue}
          LeftButtonTitle={'닫기'}
          RightButtonTitle={'설정'}></AlertModal2>
      ) : null}
      {showModal ? (
        <AlertModal2
          type={2}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={
            '지역 설정 검색을 위해서 권한이 필요합니다. 권한을 허용하시겠습니까?'
          }
          //BottomText={'설정하러가기'}
          LeftButtonTitle={'아니오'}
          RightButtonTitle={'네'}></AlertModal2>
      ) : null}
      {networkModal ? (
        <AlertModal1
          type={1}
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
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
