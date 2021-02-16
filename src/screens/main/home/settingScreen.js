import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import SignUp from '../../../components/Home/SignUp/signUp.js';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import LocationSetting from '../../../components/Home/Setting/locationSetting.js';
import IsLoading from '../../../components/ActivityIndicator';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import ButtonTwoModal from '../../../components/Modal/ButtonTwoModal.js';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
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
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [locationModal, setLocationModal] = React.useState(false);
  const LocationModalChangeValue = (text) => setLocationModal(text);
  const [page, setPage] = React.useState('car');
  const [brandList, setBrandList] = React.useState([]);
  const [category, setCategory] = React.useState('domestic');
  const CategoryChangeValue = (text) => setCategory(text);
  const [pickBrand, setPickBrand] = React.useState({}); //디비에서 가져온 브랜드값
  const PickBrandChangeValue = (object) => setPickBrand(object);
  const [pickModel, setPickModel] = React.useState({}); //디비에서 가져온 모델값
  const PickModelChangeValue = (object) => setPickModel(object);
  const [pickModelDetail, setPickModelDetail] = React.useState({}); //디비에서 가져온 상세모델값
  const PickModelDetailChangeValue = (object) => setPickModelDetail(object);
  const [pickLocation, setPickLocation] = React.useState({});
  const PickLocationChangeValue = (object) => setPickLocation(object);
  React.useEffect(() => {
    try {
      if (reduexState.loginDataCheck.login.iu_car.length > 0) {
        setPickBrand(reduexState.loginDataCheck.login.iu_car[0].pickBrand);
        setPickModel(reduexState.loginDataCheck.login.iu_car[0].pickModel);
        setPickModelDetail(
          reduexState.loginDataCheck.login.iu_car[0].pickModelDetail,
        );
      }
      if (reduexState.loginDataCheck.login.location?.legalcode) {
        setPickLocation(reduexState.loginDataCheck.login.location);
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
        pickBrand?.brand &&
        pickModel?.model &&
        pickModelDetail?.model_detail &&
        pickLocation
      ) {
        if (
          pickLocation.legalcode ==
          '요청한 데이타의 결과가 없습니다. 지역을 직접 입력해주세요.'
        ) {
          setShowModal(true);
          return false;
        }
        props.updateIuCar([
          {
            pickBrand: pickBrand,
            pickModel: pickModel,
            pickModelDetail: pickModelDetail,
          },
        ]);
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
      setIsLoading(true);
      position.coords.longitude = 126.70528; //지워야함
      position.coords.latitude = 37.45639; //지워야함
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
        setIsLoading(false); ////여기부터 만져라
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
        setIsLoading(false);
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
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
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
            IsLoadingChangeValue={IsLoadingChangeValue}
            PickModelValue={pickModel}
            PickModelChangeValue={PickModelChangeValue}
            PickModelDetail={pickModelDetail}
            PickModelDetailChangeValue={
              PickModelDetailChangeValue
            }></CarSetting>
        ) : (
          <LocationSetting
            navigation={props.navigation}
            PickBrandValue={pickBrand}
            PickModelValue={pickModel}
            PickModelDetail={pickModelDetail}
            handleLocationPermission={handleLocationPermission}
            LocationModalChangeValue={LocationModalChangeValue}
            CurrentPosition={CurrentPosition}
            pickLocation={pickLocation}
            PickLocationChangeValue={PickLocationChangeValue}></LocationSetting>
        )}
        {reduexState.loginDataCheck.login?.login ? null : (
          <SignUp navigation={props.navigation}></SignUp>
        )}
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
        <ButtonOneModal
          ShowModalChangeValue={ShowModalChangeValue}
          navigation={props.navigation}
          Title={'차량과 지역을 모두 선택해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
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
