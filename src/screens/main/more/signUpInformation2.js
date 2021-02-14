import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {TextInput} from 'react-native-gesture-handler';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import IsLoading from '../../../components/ActivityIndicator';
const SignUpInformation = (props) => {
  const [agree, setAgree] = React.useState(props.route.params.agree);
  const [phoneNumber, setPhoneNumber] = React.useState(
    props?.route?.params?.phoneNumber || null,
  );
  const [page, setPage] = React.useState('SignUp');
  const PageChangeValue = (text) => {
    setPage(text);
  };
  const [car, setCar] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const IsLoadingChangeValue = (text) => setIsLoading(text);
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
      <Tabbar
        Title={'회원가입2'}
        navigation={props.navigation}
        phoneNumber={phoneNumber}
        pickBrand={pickBrand}
        pickModel={pickModel}
        pickModelDetail={pickModelDetail}
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
            <View
              style={{
                borderBottomWidth: 1,
                width: Width_convert(285),
                height: Width_convert(35),
              }}>
              <TextInput
                placeholder="회원님의 소중한 차량은 무엇인가요?"
                placeholderTextColor="#CCCCCC"
                editable={false}
                value={
                  pickModelDetail?.brand == undefined
                    ? null
                    : pickModelDetail?.model_detail == undefined
                    ? pickModelDetail?.brand + ' ' + pickModelDetail?.model
                    : pickModelDetail?.brand +
                      ' ' +
                      pickModelDetail?.model_detail
                }
                onChangeText={(value) => {
                  //setPhoneNumber(value);
                }}
                placeholderStyle={{
                  paddingLeft: Width_convert(10),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                  lineHeight: Font_normalize(14),
                }}
                style={{
                  height: Width_convert(40),
                  paddingLeft: Width_convert(5),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(14),
                  fontWeight: '400',
                  color: '#000000',
                  lineHeight: Font_normalize(14),
                }}></TextInput>
            </View>
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
        </>
      )}
    </SafeAreaView>
  );
};
export default SignUpInformation;
