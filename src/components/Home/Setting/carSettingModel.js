import React, {memo, useState} from 'react';
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
const CarSettingModel = (props) => {
  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.ModelPickChangeValue(props.item);
            props.ModelDetailPickChangeValue({});
          }}
          style={styles.touch(props)}>
          {props.ModelPick?._id === props.item._id ? (
            <Purple_dot style={styles.dot}></Purple_dot>
          ) : (
            <Black_dot style={styles.dot}></Black_dot>
          )}
          <Text style={styles.text(props)}>{props.item.model}</Text>
        </TouchableOpacity>
        {props.ModelPick?._id === props.item._id && (
          <View style={styles.view}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{flex: 1}}
              data={props.ModelPick && props.ModelPick.modelDetail}
              windowSize={2}
              initialNumToRender={10}
              renderItem={({item}) => (
                <CarSettingModelDetail
                  item={item}
                  ModelDetailPick={
                    props.ModelDetailPick?._id === item?._id &&
                    props.ModelDetailPick
                  }
                  ModelDetailPickChangeValue={props.ModelDetailPickChangeValue}
                  from={props.from}></CarSettingModelDetail>
              )}
              keyExtractor={(item) => String(item._id)}></FlatList>
          </View>
        )}
      </View>
    </>
  );
};
export default memo(CarSettingModel);

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
      color: props.ModelPick?._id === props.item._id ? '#946AEF' : '#000000',
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
