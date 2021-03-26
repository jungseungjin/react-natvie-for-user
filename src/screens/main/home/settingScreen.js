import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
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
const SettingScreen = (props) => {
  const unsubscribe = props.navigation.addListener('focus', async () => {
    if (props.route?.params?.PickLocation) {
      setPickLocation(props.route.params.PickLocation);
      setPickBrand(props.route.params.PickBrandValue);
      setPickModel(props.route.params.PickModelValue);
      setPickModelDetail(props.route.params.PickModelDetail);
    }
  });
  React.useEffect(() => {
    unsubscribe;
  }, [props.navigation]);
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [page, setPage] = React.useState('car');
  const [brandList, setBrandList] = React.useState([]);
  const [category, setCategory] = React.useState(
    reduxState.loginDataCheck.login.iu_car.length > 0
      ? reduxState.loginDataCheck.login.iu_car[0].pickBrand === 'all'
        ? 'all'
        : reduxState.loginDataCheck.login.iu_car[0].pickBrand.brand_type == 1
        ? 'domestic'
        : 'import'
      : 'domestic',
  );
  const CategoryChangeValue = (text) => {
    setCategory(text);
    setPickBrand({});
    setPickModel({});
    setPickModelDetail({});
  };
  const [pickBrand, setPickBrand] = React.useState(
    reduxState.loginDataCheck.login.iu_car.length > 0
      ? reduxState.loginDataCheck.login.iu_car[0].pickBrand
      : {},
  ); //디비에서 가져온 브랜드값
  const PickBrandChangeValue = (object) => setPickBrand(object);
  const [pickModel, setPickModel] = React.useState({}); //디비에서 가져온 모델값
  const PickModelChangeValue = (object) => setPickModel(object);
  const [pickModelDetail, setPickModelDetail] = React.useState({}); //디비에서 가져온 상세모델값
  const PickModelDetailChangeValue = (object) => setPickModelDetail(object);
  const [pickLocation, setPickLocation] = React.useState({});
  const PickLocationChangeValue = (object) => setPickLocation(object);
  React.useEffect(() => {
    try {
      if (reduxState.loginDataCheck.login.iu_car.length > 0) {
        if (reduxState.loginDataCheck.login.iu_car[0].pickModel == 'all') {
          setCategory('all');
        } else {
          //setPickBrand(reduxState.loginDataCheck.login.iu_car[0].pickBrand);
          setPickModel(reduxState.loginDataCheck.login.iu_car[0].pickModel);
          setPickModelDetail(
            reduxState.loginDataCheck.login.iu_car[0].pickModelDetail,
          );
        }
      }
      if (reduxState.loginDataCheck.login.location?.legalcode) {
        setPickLocation(reduxState.loginDataCheck.login.location);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  {
    /*선택하면 여기에서는 국산인지 수입인지 // 선택한 브랜드가 무엇인지 // 선택한 모델이 무엇인지 // 선택한 디테일모델이 무엇인지까지 가져옴. */
  }
  const PageChangeValue = (text) => setPage(text);
  const PushReduxData = () => {
    try {
      if (
        ((pickBrand?.brand &&
          pickModel?.model &&
          pickModelDetail?.model_detail) ||
          category == 'all') &&
        pickLocation.legalcode
      ) {
        if (
          pickLocation.legalcode ==
          '요청한 데이타의 결과가 없습니다. 지역을 직접 입력해주세요.'
        ) {
          setShowModal(true);
          return false;
        }
        if (category != 'all') {
          props.updateIuCar([
            {
              pickBrand: pickBrand,
              pickModel: pickModel,
              pickModelDetail: pickModelDetail,
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
          legalcode:
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
          legalcode:
            '요청한 데이타의 결과가 없습니다. 지역을 직접 입력해주세요.',
        });
        //네이버 맵에 없음
      }
    } catch (err) {
      setIsLoadingAndModal(3);
      console.log(err);
    }
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
            {title: '차량선택', value: 'car'},
            {title: '지역설정', value: 'location'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        {page == 'car' ? (
          <CarSetting
            from={props?.route?.name}
            nowValue={category}
            CategoryChangeValue={CategoryChangeValue}
            PickBrandValue={pickBrand}
            PickBrandChangeValue={PickBrandChangeValue}
            IsLoadingAndModalChangeValue={IsLoadingAndModalChangeValue}
            PickModelValue={pickModel}
            PickModelChangeValue={PickModelChangeValue}
            PickModelDetail={pickModelDetail}
            PickModelDetailChangeValue={
              PickModelDetailChangeValue
            }></CarSetting>
        ) : (
          <LocationSetting
            navigation={props.navigation}
            from={'Setting'}
            PickBrandValue={pickBrand}
            PickModelValue={pickModel}
            PickModelDetail={pickModelDetail}
            IsLoadingAndModalChangeValue={IsLoadingAndModalChangeValue}
            handleLocationPermission={handleLocationPermission}
            LocationModalChangeValue={LocationModalChangeValue}
            CurrentPosition={CurrentPosition}
            pickLocation={pickLocation}
            PickLocationChangeValue={PickLocationChangeValue}></LocationSetting>
        )}
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
