import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, SafeAreaView, ScrollView, View} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import Width_convert from '../../../components/Width_convert.js';
import SignUp from '../../../components/Home/SignUp/signUp.js';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import LocationSetting from '../../../components/Home/Setting/locationSetting.js';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import Domain from '../../../../key/Domain.js';
import NetInfo from '@react-native-community/netinfo';
const SettingScreen = (props) => {
  const unsubscribe = props.navigation.addListener('focus', async () => {
    if (props.route?.params?.PickLocation) {
      setPickLocation(props.route.params.PickLocation);
      setBrandPick(props.route.params.PickBrandValue);
      setModelPick(props.route.params.PickModelValue);
      setModelDetailPick(props.route.params.PickModelDetail);
    }
  });
  useEffect(() => {
    unsubscribe;
  }, [props.navigation]);
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [pickLocation, setPickLocation] = React.useState({});
  const PickLocationChangeValue = (object) => setPickLocation(object);
  useEffect(() => {
    try {
      if (reduxState.loginDataCheck.login.iu_car.length > 0) {
        if (reduxState.loginDataCheck.login.iu_car[0].pickModel == 'all') {
          setCategoryPick('all');
        } else {
          //setPickBrand(reduxState.loginDataCheck.login.iu_car[0].pickBrand);
          setModelPick(reduxState.loginDataCheck.login.iu_car[0].pickModel);
          setModelDetailPick(
            reduxState.loginDataCheck.login.iu_car[0].pickModelDetail,
          );
        }
      }
      if (reduxState.loginDataCheck.login.location?.legalCode) {
        setPickLocation(reduxState.loginDataCheck.login.location);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  {
    /*선택하면 여기에서는 국산인지 수입인지 // 선택한 브랜드가 무엇인지 // 선택한 모델이 무엇인지 // 선택한 디테일모델이 무엇인지까지 가져옴. */
  }
  const PushReduxData = () => {
    try {
      if (
        ((brandPick?.brand &&
          modelPick?.model &&
          modelDetailPick?.modelDetail) ||
          categoryPick == 'all') &&
        pickLocation.legalCode
      ) {
        if (
          pickLocation.legalCode ==
          '요청한 데이터의 결과가 없습니다. 지역을 직접 입력해주세요.'
        ) {
          setShowModal(true);
          return false;
        }
        if (categoryPick != 'all') {
          props.updateIuCar([
            {
              pickBrand: brandPick,
              pickModel: modelPick,
              pickModelDetail: modelDetailPick,
            },
          ]);
        } else {
          props.updateIuCar([
            {
              pickBrand: 'all',
              pickModel: 'all',
              pickModelDetail: 'all',
            },
          ]);
        }
        props.updateLocation(pickLocation);
        props.navigation.navigate('Home');
      } else {
        setShowModal(true);
        return false;
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

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
        getNaverLocagtion(position);
      },
      (error) => {
        console.log(error.code, error.message);
        if (error.message.indexOf('permission denied') != -1) {
          setLocationModal(true);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getNaverLocagtion = async (position) => {
    try {
      setIsLoadingAndModal(1);
      // position.coords.longitude = 126.70528; //지워야함
      // position.coords.latitude = 37.45639; //지워야함
      let result = await axios.get(
        'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=' +
          position.coords.longitude +
          ',' +
          position.coords.latitude +
          '&orders=legalcode&&output=json',
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
        setIsLoadingAndModal(0); ////여기부터 만져라
        setPickLocation({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          legalCode:
            result.data.results[0].region.area1.name +
            ' ' +
            result.data.results[0].region.area2.name +
            ' ' +
            result.data.results[0].region.area3.name,
        });
      } else {
        setIsLoadingAndModal(0);
        setPickLocation({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          legalCode:
            '요청한 데이터의 결과가 없습니다. 지역을 직접 입력해주세요.',
        });
        //네이버 맵에 없음
      }
    } catch (err) {
      setIsLoadingAndModal(3);
      console.log(err);
    }
  };

  const [brandList1, setBrandList1] = useState([]);
  const [brandList2, setBrandList2] = useState([]);
  const [categoryPick, setCategoryPick] = useState(
    reduxState.loginDataCheck.login.iu_car.length > 0
      ? reduxState.loginDataCheck.login.iu_car[0].pickBrand === 'all'
        ? 'all'
        : reduxState.loginDataCheck.login.iu_car[0].pickBrand.type == 1
        ? 'domestic'
        : 'import'
      : 'domestic',
  );
  const CategoryPickChangeValue = (text) => setCategoryPick(text);
  const [brandPick, setBrandPick] = useState(
    reduxState.loginDataCheck.login.iu_car.length > 0
      ? reduxState.loginDataCheck.login.iu_car[0].pickBrand
      : {},
  );
  const BrandPickChangeValue = (object) => setBrandPick(object);
  const [modelPick, setModelPick] = useState({});
  const ModelPickChangeValue = (object) => setModelPick(object);
  const [modelDetailPick, setModelDetailPick] = useState({});
  const ModelDetailPickChangeValue = (object) => setModelDetailPick(object);
  const getData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let Data = await axios.get(`${Domain}api/car/getdata/all`, {
            headers: {'Content-Type': 'application/json'},
          });
          let type1 = [];
          let type2 = [];
          Data.data.result.map((item, index) => {
            if (item.view !== 2) {
              if (item.type === 1) type1.push(item);
              else if (item.type === 2) type2.push(item);
            }
          });
          setBrandList1(type1);
          setBrandList2(type2);
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [page, setPage] = React.useState(0);
  const PageChangeValue = (Number) => {
    if (Number === 0) scrollRef.current.scrollTo({x: 0, animated: false});
    else scrollRef.current.scrollTo({x: Width_convert(375), animated: false});
    setPage(Number);
  };
  const scrollRef = useRef();
  const handleScroll = function (event) {
    if (event.nativeEvent.contentOffset.x < Width_convert(375) / 2) setPage(0);
    if (event.nativeEvent.contentOffset.x > Width_convert(375) / 2) setPage(1);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          left={'back'}
          Title={'설정'}
          navigation={props.navigation}
          PushReduxData={PushReduxData}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={[
            {title: '차량선택', value: 'car', _id: 0},
            {title: '지역설정', value: 'location', _id: 1},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <ScrollView
            ref={scrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
            horizontal={true}
            pagingEnabled>
            <View style={{width: Width_convert(375)}}>
              <CarSetting
                BrandPick={brandPick}
                BrandPickChangeValue={BrandPickChangeValue}
                BrandList1={brandList1}
                BrandList2={brandList2}
                CategoryPickChangeValue={CategoryPickChangeValue}
                CategoryPick={categoryPick}
                from={props?.route?.name}
                ModelPick={modelPick}
                ModelPickChangeValue={ModelPickChangeValue}
                ModelDetailPick={modelDetailPick}
                ModelDetailPickChangeValue={
                  ModelDetailPickChangeValue
                }></CarSetting>
            </View>
            <View style={{width: Width_convert(375)}}>
              <LocationSetting
                navigation={props.navigation}
                from={'Setting'}
                PickBrandValue={brandPick}
                PickModelValue={modelPick}
                PickModelDetail={modelDetailPick}
                IsLoadingAndModalChangeValue={IsLoadingAndModalChangeValue}
                handleLocationPermission={handleLocationPermission}
                LocationModalChangeValue={LocationModalChangeValue}
                CurrentPosition={CurrentPosition}
                pickLocation={pickLocation}
                PickLocationChangeValue={
                  PickLocationChangeValue
                }></LocationSetting>
            </View>
          </ScrollView>
        </View>
        {reduxState.loginDataCheck.login?.login ? null : (
          <SignUp navigation={props.navigation}></SignUp>
        )}
      </SafeAreaView>
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
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
        <AlertModal1
          type={1}
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={'차종과 지역을 설정해주세요.'}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
    </>
  );
};

function mapStateToProps(state) {
  return {
    login: {
      login: state.loginDataCheck.login.login,
      iu_car: state.loginDataCheck.login.iu_car,
      location: state.loginDataCheck.login.location,
    },
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLoginStatus: (boo) => {
      dispatch(ActionCreator.loginDataCheckAction(boo));
    },
    updateIuCar: (Array) => {
      dispatch(ActionCreator.loginDataIuCarCheckAction(Array));
    },
    updateLocation: (Object) => {
      dispatch(ActionCreator.loginDataLocationCheckAction(Object));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
