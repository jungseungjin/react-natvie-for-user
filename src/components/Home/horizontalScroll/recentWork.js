import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Height_convert from '../../Width_convert.js';
import Width_convert from '../../Width_convert.js';
import PropTypes from 'prop-types';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';

const RecentWork = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.navigation.navigate('WorkDetail', {item: props.item});
      }}
      style={props.Index == 0 ? styles.view_index0 : styles.view}>
      <FastImage
        style={styles.fastImage}
        source={{
          uri: props.item.store_thumbnail[0],
          //headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}></FastImage>
      <Text style={styles.text}>{props.item.store_work_name}</Text>
      <View style={styles.view2}>
        <Text style={styles.text2}>{props.item.info_store[0].store_name}</Text>
        <Star style={styles.star}></Star>
        <Text style={styles.text3}>
          {props.item.reviewCount > 0
            ? parseFloat(
                props.item.reviewTotal / props.item.reviewCount,
              ).toFixed(1)
            : '0.0'}
        </Text>
        <Text style={styles.text3}>
          후기
          {props.item.reviewCount
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <Text style={styles.text4}>
        주소 : {props.item.info_store[0].store_address}
      </Text>
      <View style={styles.view3}>
        <Text style={styles.text5}>
          {props.item.store_work_total_cost
            ? props.item.store_work_total_cost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원'
            : '업체문의'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  view: {
    width: Width_convert(160),
    height: Height_convert(185),
    marginRight: Width_convert(11),
  },
  view_index0: {
    width: Width_convert(160),
    height: Height_convert(185),
    marginRight: Width_convert(11),
    marginLeft: Width_convert(19),
  },
  view2: {
    flexDirection: 'row',
    marginLeft: Width_convert(1),
    marginTop: Height_convert(5),
    alignItems: 'center',
  },
  view3: {
    marginTop: Height_convert(19),
    alignItems: 'flex-end',
  },
  fastImage: {
    width: Width_convert(160),
    height: Width_convert(90),
    borderRadius: 6,
  },
  text: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(12),
    color: '#000000',
    marginTop: Height_convert(11),
  },
  text2: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(9),
    color: '#000000',
    marginRight: Width_convert(6),
  },
  text3: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(9),
    color: '#000000',
    marginRight: Width_convert(4),
  },
  text4: {
    marginTop: Height_convert(5),
    marginLeft: Width_convert(1),
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '400',
    fontSize: Font_normalize(9),
    color: '#000000',
  },
  text5: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(13),
    color: '#FF5858',
  },
  star: {
    width: Width_convert(8),
    height: Height_convert(8),
    marginRight: Width_convert(3),
  },
});
RecentWork.propTypes = {};
export default RecentWork;
