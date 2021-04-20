import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import LocationSetting from '../../../components/Home/Setting/locationSetting.js';
import axios from 'axios';
import Domain from '../../../../key/Domain';
import NetInfo from '@react-native-community/netinfo';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const InfoCar = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [page, setPage] = React.useState('car');
  // const [brandList, setBrandList] = React.useState([]);
  // const [category, setCategory] = React.useState('domestic');
  // const CategoryChangeValue = (text) => setCategory(text);
  // const [pickBrand, setPickBrand] = React.useState({}); //디비에서 가져온 브랜드값
  // const PickBrandChangeValue = (object) => setPickBrand(object);
  // const [pickModel, setPickModel] = React.useState({}); //디비에서 가져온 모델값
  // const PickModelChangeValue = (object) => setPickModel(object);
  // const [pickModelDetail, setPickModelDetail] = React.useState({}); //디비에서 가져온 상세모델값
  // const PickModelDetailChangeValue = (object) => setPickModelDetail(object);

  const [brandList1, setBrandList1] = useState([]);
  const [brandList2, setBrandList2] = useState([]);
  const [categoryPick, setCategoryPick] = useState('domestic');
  const CategoryPickChangeValue = (text) => setCategoryPick(text);
  const [brandPick, setBrandPick] = useState();
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
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        left={'X'}
        Title={'차량선택'}
        navigation={props.navigation}></Tabbar>
      <View style={{borderTopWidth: 1, borderTopColor: '#DBDBDB'}}></View>

      <CarSetting
        // from={props?.route?.name}
        // nowValue={category}
        // CategoryChangeValue={CategoryChangeValue}
        // PickBrandValue={pickBrand}
        // PickBrandChangeValue={PickBrandChangeValue}
        // PickModelValue={pickModel}
        // PickModelChangeValue={PickModelChangeValue}
        // PickModelDetail={pickModelDetail}
        // PickModelDetailChangeValue={PickModelDetailChangeValue}

        PageChangeValue={PageChangeValue}
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
        ModelDetailPickChangeValue={ModelDetailPickChangeValue}></CarSetting>
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
    </SafeAreaView>
  );
};

export default InfoCar;
