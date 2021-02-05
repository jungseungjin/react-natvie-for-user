import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacityBase,
  FlatList,
} from 'react-native';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Gray_checkBox from '../../../../assets/home/gray_checkBox.svg';
import Purple_checkBox from '../../../../assets/home/purple_checkBox.svg';
import Purple_dot from '../../../../assets/home/purple_dot.svg';
import Black_dot from '../../../../assets/home/black_dot.svg';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Domain from '../../../../key/Domain.js';
import CarSettingBrand from './carSettingBrand.js';
import CarSettingModel from './carSettingModel.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const CarSetting = (props) => {
  const insets = useSafeAreaInsets();
  const [brandList, setBrandList] = React.useState([]);
  const [modelList, setModelList] = React.useState([]);
  const get_brand_data = async function (props) {
    try {
      let brandSeach;
      if (props.nowValue == 'domestic') {
        //국산차 브랜드 조회
        brandSeach = '1';
      } else if (props.nowValue == 'import') {
        //수입차 브랜드 조회
        brandSeach = '2';
      } else {
        //전체
        setBrandList([]);
        return false;
      }
      setModelList([]);
      let url = Domain + 'brand_list/' + brandSeach;
      props.IsLoadingChangeValue(true);
      let result = await axios.get(url);
      if (result.data[0].type) {
        //get에서 type이 있으면 잘못된거
        alert(result.data[0].message);
        props.IsLoadingChangeValue(false);
      } else {
        setBrandList(result.data);
        props.IsLoadingChangeValue(false);
      }
    } catch (err) {
      console.log(err);
      alert('잠시 후에 다시해주세요');
    }
  };
  const get_model_data = async function (props) {
    try {
      if (props?.PickBrandValue?.brand) {
        let url = Domain + 'model_list/' + props.PickBrandValue.brand;
        //props.IsLoadingChangeValue(true);
        let result = await axios.get(url);
        if (result.data[0].type) {
          //get에서 type이 있으면 잘못된거
          alert(result.data[0].message);
          //props.IsLoadingChangeValue(false);
        } else {
          setModelList(result.data);
          //props.IsLoadingChangeValue(false);
        }
      }
    } catch (err) {
      console.log(err);
      alert('잠시 후에 다시해주세요');
    }
  };
  React.useEffect(() => {
    get_brand_data(props);
  }, [props.nowValue]);
  React.useEffect(() => {
    get_model_data(props);
  }, [props.PickBrandValue]);

  return (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/*왼쪽 뷰 시작 */}
        <View
          style={{
            width: Width_convert(99),
            borderRightWidth: 1,
            borderRightColor: '#DBDBDB',
            justifyContent: 'space-between',
          }}>
          {/*국산 수입 전체 선택하기 시작*/}
          <View
            style={[
              {
                borderBottomWidth: 1,
                borderBottomColor: '#DBDBDB',
              },
              props.from == 'InfoCar'
                ? {
                    height: Width_convert(71),
                  }
                : {
                    height: Width_convert(99),
                  },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (props.nowValue == 'domestic') {
                } else {
                  props.CategoryChangeValue('domestic');
                }
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: Height_convert(14),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(15),
                  color: '#1D1D1D',
                  marginLeft: Width_convert(20),
                }}>
                국산
              </Text>
              {props.nowValue == 'domestic' ? (
                <Purple_checkBox
                  style={{marginRight: Width_convert(22)}}></Purple_checkBox>
              ) : (
                <Gray_checkBox
                  style={{marginRight: Width_convert(22)}}></Gray_checkBox>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (props.nowValue == 'import') {
                } else {
                  props.CategoryChangeValue('import');
                }
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: Height_convert(9),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(15),
                  color: '#1D1D1D',
                  marginLeft: Width_convert(20),
                }}>
                수입
              </Text>
              {props.nowValue == 'import' ? (
                <Purple_checkBox
                  style={{marginRight: Width_convert(22)}}></Purple_checkBox>
              ) : (
                <Gray_checkBox
                  style={{marginRight: Width_convert(22)}}></Gray_checkBox>
              )}
            </TouchableOpacity>
            {props.from == 'InfoCar' ? null : (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (props.nowValue == 'all') {
                  } else {
                    props.CategoryChangeValue('all');
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: Height_convert(9),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(15),
                    color: '#1D1D1D',
                    marginLeft: Width_convert(20),
                  }}>
                  전체
                </Text>
                {props.nowValue == 'all' ? (
                  <Purple_checkBox
                    style={{marginRight: Width_convert(22)}}></Purple_checkBox>
                ) : (
                  <Gray_checkBox
                    style={{marginRight: Width_convert(22)}}></Gray_checkBox>
                )}
              </TouchableOpacity>
            )}
          </View>
          {/*국산 수입 전체 선택하기 끝*/}
          {/*브랜드 나열 시작 */}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}
            data={brandList}
            windowSize={2}
            initialNumToRender={10}
            renderItem={({item}) => (
              <CarSettingBrand
                item={item}
                PickBrandValue={
                  props.PickBrandValue == item ? props.PickBrandValue : null
                }
                PickBrandChangeValue={props.PickBrandChangeValue}
                PickModelChangeValue={props.PickModelChangeValue}
                PickModelDetailChangeValue={
                  props.PickModelDetailChangeValue
                }></CarSettingBrand>
            )}
            keyExtractor={(item) => String(item._id)}></FlatList>
          {/*브랜드 나열 끝 */}
        </View>
        {/*왼쪽 뷰 끝 */}
        {/*오른쪽 뷰 시작 */}
        <FlatList
          style={{width: Width_convert(275)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          data={modelList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <CarSettingModel
              index={brandList.indexOf(item)}
              item={item}
              PickBrandValue={props.PickBrandValue}
              PickModelValue={
                props.PickModelValue == item ? props.PickModelValue : null
              }
              PickModelChangeValue={props.PickModelChangeValue}
              PickModelDetail={props.PickModelDetail}
              PickModelDetailChangeValue={props.PickModelDetailChangeValue}
              IsLoadingChangeValue={
                props.IsLoadingChangeValue
              }></CarSettingModel>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
        {/*오른쪽 뷰 끝 */}
      </View>
      {/*하단 버튼만큼의 공간 띄우기 시작 */}
      <View
        style={{
          width: Width_convert(375),
          height: Height_convert(insets.bottom),
          backgroundColor: '#FFFFFF',
        }}></View>
      {/*하단 버튼만큼의 공간 띄우기 끝 */}
    </>
  );
};
export default CarSetting;
