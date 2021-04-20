import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
const SignUpInformation = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [agree, setAgree] = React.useState(props.route.params.agree);
  const [phoneNumber, setPhoneNumber] = React.useState(
    props?.route?.params?.phoneNumber || null,
  );
  const [page, setPage] = React.useState('SignUp');
  const PageChangeValue = (text) => {
    setPage(text);
  };
  const [car, setCar] = React.useState('');

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
      {Platform.OS === 'android' && props.route.params.fromNav === 'home' ? (
        <View style={{height: StatusBarHeight}}></View>
      ) : null}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar
        left={'back'}
        fromNav={
          Platform.OS === 'android' && props.route.params.fromNav === 'home'
            ? 'home'
            : null
        }
        Title={'회원가입2'}
        Page={page}
        PageChangeValue={PageChangeValue}
        navigation={props.navigation}
        phoneNumber={phoneNumber}
        pickBrand={brandPick}
        pickModel={modelPick}
        pickModelDetail={modelDetailPick}
        agree={agree}></Tabbar>
      {page == 'SignUp' ? (
        <View
          style={{
            marginLeft: Width_convert(24),
            marginRight: Width_convert(24),
            marginTop: Height_convert(50),
            width: Width_convert(327),
            height: Width_convert(95),
          }}>
          {/*차량검색 */}
          <View
            style={{
              width: Width_convert(327),
              height: Width_convert(35),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPage('car');
              }}
              style={{
                borderBottomWidth: 1,
                width: Width_convert(285),
                height: Width_convert(35),
              }}>
              <Text
                style={[
                  {
                    marginTop: Height_convert(10),
                    height: Width_convert(40),
                    paddingLeft: Width_convert(5),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(14),
                    fontWeight: '400',
                  },
                  brandPick?.brand == undefined
                    ? {
                        color: '#CCCCCC',
                      }
                    : {
                        color: '#000000',
                      },
                ]}>
                {brandPick?.brand == undefined
                  ? '회원님의 소중한 차량은 무엇인가요?'
                  : modelDetailPick?.modelDetail == undefined
                  ? brandPick?.brand + ' ' + modelPick?.model
                  : brandPick?.brand + ' ' + modelDetailPick?.modelDetail}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPage('car');
              }}
              style={{
                width: Width_convert(35),
                height: Width_convert(35),
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomColor: '#CCCCCC',
                borderTopColor: '#CCCCCC',
                borderLeftColor: '#CCCCCC',
                borderRightColor: '#CCCCCC',
                borderRadius: Font_normalize(3),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Search></Search>
            </TouchableOpacity>
          </View>
          {/*차량검색 */}
        </View>
      ) : (
        <>
          <View style={{borderTopWidth: 1, borderTopColor: '#DBDBDB'}}></View>
          <CarSetting
            from={'SignUp'}
            PageChangeValue={PageChangeValue}
            // nowValue={category}
            // CategoryChangeValue={CategoryChangeValue}
            // PickBrandValue={pickBrand}
            // PickBrandChangeValue={PickBrandChangeValue}
            // IsLoadingAndModalChangeValue={IsLoadingAndModalChangeValue}
            // PickModelValue={pickModel}
            // PickModelChangeValue={PickModelChangeValue}
            // PickModelDetail={pickModelDetail}
            // PickModelDetailChangeValue={
            //   PickModelDetailChangeValue
            // }

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
        </>
      )}
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
export default SignUpInformation;
