import React from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fonts from '../../Fonts';
import Font_normalize from '../../Font_normalize.js';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Purple_dot from '../../../../assets/home/purple_dot.svg';
import Black_dot from '../../../../assets/home/black_dot.svg';
import CarSettingModelDetail from './carSettingModelDetail.js';
import Domain from '../../../../key/Domain.js';
import axios from 'axios';

const CarSettingModel = (props) => {
  const [modelDetailList, setModelDetailList] = React.useState([]);
  const get_model_detail_data = async (props) => {
    try {
      if (props?.PickBrandValue?.brand && props?.PickModelValue?.model) {
        //이 요청이 많이들어온다 수정해야됨 -> 이 페이지 자체가 여러번 렌더돼서 그래.
        let url =
          Domain +
          'model_detail_list/' +
          props?.PickBrandValue?.brand +
          '/' +
          props?.PickModelValue?.model;
        //props.IsLoadingChangeValue(true);
        let result = await axios.get(url);
        if (result.data[0].type) {
          //get에서 type이 있으면 잘못된거
          alert(result.data[0].message);
          //props.IsLoadingChangeValue(false);
        } else {
          setModelDetailList(result.data);
          //props.IsLoadingChangeValue(false);
        }
      }
    } catch (err) {
      console.log(err);
      alert('잠시 후에 다시해주세요');
    }
  };
  React.useEffect(() => {
    if (props?.PickModelValue?.model == props?.item?.model) {
      get_model_detail_data(props);
    }
  }, [props?.PickModelValue]);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.PickModelChangeValue(props.item);
          props.PickModelDetailChangeValue({});
        }}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: Width_convert(31),
          },
          props.index == 0
            ? {marginTop: Height_convert(28)}
            : {marginTop: Height_convert(19)},
        ]}>
        {props?.PickModelValue?.model == props.item.model ? (
          <Purple_dot style={{marginRight: Width_convert(9)}}></Purple_dot>
        ) : (
          <Black_dot style={{marginRight: Width_convert(9)}}></Black_dot>
        )}
        <Text
          style={[
            {
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
            },
            props?.PickModelValue?.model == props.item.model
              ? {
                  color: '#946AEF',
                }
              : {
                  color: '#000000',
                },
          ]}>
          {props.item.model}
        </Text>
      </TouchableOpacity>
      {props?.PickModelValue?.model == props.item.model ? (
        <View
          style={{
            width: Width_convert(199),
            borderRadius: Font_normalize(4),
            backgroundColor: '#F2EEFA',
            marginLeft: Width_convert(40),
            marginTop: Height_convert(5),
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}
            data={modelDetailList}
            windowSize={2}
            initialNumToRender={10}
            renderItem={({item}) => (
              <CarSettingModelDetail
                item={item}
                PageChangeValue={props.PageChangeValue}
                from={props.from}
                PickModelDetail={
                  props.PickModelDetail?._id == item?._id
                    ? props.PickModelDetail
                    : null
                }
                PickModelDetailChangeValue={
                  props.PickModelDetailChangeValue
                }></CarSettingModelDetail>
            )}
            keyExtractor={(item) => String(item._id)}></FlatList>
        </View>
      ) : null}
    </View>
  );
};
export default React.memo(CarSettingModel);
