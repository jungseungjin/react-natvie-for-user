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
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import GPS from '../../../../assets/home/gps.svg';
import Geolocation from 'react-native-geolocation-service';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';

const StoreLocationScreen = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [P0, setP0] = React.useState({
    latitude: parseFloat(props.route.params.item.coordinates[1]),
    longitude: parseFloat(props.route.params.item.coordinates[0]),
  });
  const [P1, setP1] = React.useState({
    latitude: parseFloat(props.route.params.item.coordinates[1]),
    longitude: parseFloat(props.route.params.item.coordinates[0]),
    show: false,
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
        setP1({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          show: true,
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
        <Tabbar
          left={'back'}
          Title={props.route.params.title}
          StoreName={props.route.params.title}
          navigation={props.navigation}></Tabbar>
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
            center={{...P1, zoom: 16}}
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
            <Marker coordinate={P0} pinColor={'red'} onClick={() => {}} />
            {P1.show == true ? (
              <Marker coordinate={P1} pinColor={'green'} onClick={() => {}} />
            ) : null}
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
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
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
export default StoreLocationScreen;
