import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import SignUp from '../../../components/Home/SignUp/signUp.js';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import LocationSetting from '../../../components/Home/Setting/locationSetting.js';
import IsLoading from '../../../components/ActivityIndicator';
import axios from 'axios';
const SettingScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
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
  console.log('pickBrand' + pickBrand?.brand);
  console.log('pickModel' + pickModel?.model);
  console.log('pickModelDetail' + pickModelDetail?.model_detail);
  {
    /*선택하면 여기에서는 국산인지 수입인지 // 선택한 브랜드가 무엇인지 // 선택한 모델이 무엇인지 // 선택한 디테일모델이 무엇인지까지 가져옴. */
  }
  const PageChangeValue = (text) => setPage(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'설정'} navigation={props.navigation}></Tabbar>
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
          <LocationSetting navigation={props.navigation}></LocationSetting>
        )}
        <SignUp navigation={props.navigation}></SignUp>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default SettingScreen;
