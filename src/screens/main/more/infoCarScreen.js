import React from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import LocationSetting from '../../../components/Home/Setting/locationSetting.js';
import IsLoading from '../../../components/ActivityIndicator';
import axios from 'axios';

const InfoCar = (props) => {
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
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'차량선택'} navigation={props.navigation}></Tabbar>
      <View style={{borderTopWidth: 1, borderTopColor: '#DBDBDB'}}></View>

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
        PickModelDetailChangeValue={PickModelDetailChangeValue}></CarSetting>
    </SafeAreaView>
  );
};

export default InfoCar;
