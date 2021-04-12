import React from 'react';
import {TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';
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
import NetInfo from '@react-native-community/netinfo';
import IsLoading from '../../../components/ActivityIndicator';
const styles = StyleSheet.create({
  dot: {
    marginRight: Width_convert(9),
  },
  touch: (props) => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: Width_convert(31),
      marginTop: props.index === 0 ? Height_convert(28) : Height_convert(19),
    };
  },
  text: (props) => {
    return {
      fontFamily: Fonts?.NanumSqureRegular || null,
      fontWeight: '700',
      fontSize: Font_normalize(15),
      color:
        props?.PickModelValue?.model === props.item.model
          ? '#946AEF'
          : '#000000',
    };
  },
  view: {
    width: Width_convert(199),
    borderRadius: Font_normalize(4),
    backgroundColor: '#F2EEFA',
    marginLeft: Width_convert(40),
    marginTop: Height_convert(5),
  },
});
const CarSettingModel = (props) => {
  const [modelDetailList, setModelDetailList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const get_model_detail_data = (props) => {
    try {
      if (props?.PickBrandValue?.brand && props?.PickModelValue?.model) {
        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            props.IsLoadingAndModalChangeValue(1);
            //이 요청이 많이들어온다 수정해야됨 -> 이 페이지 자체가 여러번 렌더돼서 그래.
            let url =
              Domain +
              'model_detail_list/' +
              props?.PickBrandValue?.brand +
              '/' +
              props?.PickModelValue?.model;
            //props.IsLoadingAndModalChangeValue(1);
            let result = await axios.get(url);
            props.IsLoadingAndModalChangeValue(0);
            if (result.data[0].status == 'ok') {
              setModelDetailList(result.data[0].result);
              //props.IsLoadingAndModalChangeValue(0);
            } else {
              //get에서 type이 있으면 잘못된거
              alert(result.data[0].message);
              //props.IsLoadingAndModalChangeValue(0);
            }
          } else {
            props.IsLoadingAndModalChangeValue(2);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    if (props?.PickModelValue?.model === props?.item?.model) {
      get_model_detail_data(props);
    }
  }, [props?.PickModelValue]);
  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.PickModelChangeValue(props.item);
            props.PickModelDetailChangeValue({});
          }}
          style={styles.touch(props)}>
          {props?.PickModelValue?.model === props.item.model ? (
            <Purple_dot style={styles.dot}></Purple_dot>
          ) : (
            <Black_dot style={styles.dot}></Black_dot>
          )}
          <Text style={styles.text(props)}>{props.item.model}</Text>
        </TouchableOpacity>
        {props?.PickModelValue?.model === props.item.model && (
          <View style={styles.view}>
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
                    props.PickModelDetail?._id === item?._id &&
                    props.PickModelDetail
                  }
                  PickModelDetailChangeValue={
                    props.PickModelDetailChangeValue
                  }></CarSettingModelDetail>
              )}
              keyExtractor={(item) => String(item._id)}></FlatList>
          </View>
        )}
      </View>
    </>
  );
};
export default React.memo(CarSettingModel);
