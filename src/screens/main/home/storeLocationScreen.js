import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';

import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import GoBackWhite from '../../../../assets/home/goBackWhite.svg';
import IsLoading from '../../../components/ActivityIndicator';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import GPS from '../../../../assets/home/gps.svg';
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import Geolocation from 'react-native-geolocation-service';
const StoreLocationScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [P0, setP0] = React.useState({
    latitude: parseFloat(props.route.params.item.store_location.coordinates[1]),
    longitude: parseFloat(
      props.route.params.item.store_location.coordinates[0],
    ),
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
        setP0({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
        if (error.message.indexOf('permission denied') != -1) {
          //권한은 허용되어있으나 gps가 꺼져있을때
          setLocationModal(true);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <StatusBar
          translucent
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(94) - StatusBarHeight,
            position: 'absolute',
            flexDirection: 'row',
            top: StatusBarHeight,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={{}}
              onPress={() => {
                props.navigation.goBack();
              }}>
              <GoBackWhite
                fill={'#000000'}
                style={{
                  marginLeft: Width_convert(22),
                }}></GoBackWhite>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
                textAlign: 'center',
              }}>
              {props.route.params.item.store_name}
            </Text>
          </View>
          <View
            style={{
              marginRight: Width_convert(17),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: 'row',
              }}
              onPress={() => {}}>
              <Text style={{color: '#ffffff'}}>완료</Text>
              {/* <HeartWhite
          fill={'#000000'}></HeartWhite>
        <Text
          style={[
            {
              marginTop: 'auto',
              marginBottom: 0,
              fontFamily: Fonts?.NanumSquareRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(6),
            },
            scrollValue > Width_convert(240) - StatusBarHeight
              ? {color: '#000000'}
              : {color: '#FFFFFF'},
          ]}>
          123
        </Text> */}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height:
              Height_convert(812) - (Height_convert(94) - StatusBarHeight),
            position: 'absolute',
            top: Height_convert(94),
          }}>
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
            // onCameraChange={(e) =>
            //   setP0({
            //     latitude: parseFloat(e.latitude),
            //     longitude: parseFloat(e.longitude),
            //   })
            // }
            //onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
          >
            <Marker coordinate={P0} pinColor={'green'} onClick={() => {}} />
          </NaverMapView>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
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
              bottom: Width_convert(50),
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
        </View>
      </SafeAreaView>
      {locationModal ? (
        <ButtonTwoModal
          Title={'지역 설정을 위해 위치서비스를 켜 주세요'}
          navigation={props.navigation}
          ShowModalChangeValue={LocationModalChangeValue}
          LeftButtonTitle={'닫기'}
          RightButtonTitle={'설정'}></ButtonTwoModal>
      ) : null}
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
export default StoreLocationScreen;
