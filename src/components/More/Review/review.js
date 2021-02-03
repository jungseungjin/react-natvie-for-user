import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import Store from '../../../../assets/home/Store.svg';
import BraketRight from '../../../../assets/home/braket_right.svg';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ReviewImage from './reviewImage.js';
import ReviewButton from './reviewButton.js';
const Review = (props) => {
  const [reviewImageList, setReviewImageList] = React.useState([
    //props로 전달받을거임
    {_id: 'gdgsd'},
    {_id: 'gdg2d'},
    {_id: 'gdgdd'},
    {_id: 'gddgsd'},
  ]);
  return (
    <View
      style={{
        width: Width_convert(375),
        paddingBottom: Height_convert(35),
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
      }}>
      <View
        style={{
          marginTop: Height_convert(21),
          flexDirection: 'row',
          marginLeft: Width_convert(21),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '700',
              color: '#000000',
              marginRight: Width_convert(3),
            }}>
            MOTION튜닝샵
          </Text>
          <Store></Store>
        </View>
        <View
          style={{
            marginRight: Width_convert(11),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ReviewButton
            Title={'수정'}
            navigation={props.navigation}></ReviewButton>
          <ReviewButton
            Title={'삭제'}
            navigation={props.navigation}></ReviewButton>
        </View>
      </View>
      <View
        style={{
          marginTop: Height_convert(11),
          marginLeft: Width_convert(21),
        }}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#A1A1A1',
                marginRight: Width_convert(4),
              }}>
              G70 카나드콘 립 에어댐
            </Text>
            <BraketRight></BraketRight>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: Height_convert(4)}}>
          <Star style={{marginRight: Width_convert(4)}}></Star>
          <Star style={{marginRight: Width_convert(4)}}></Star>
          <Star style={{marginRight: Width_convert(4)}}></Star>
          <Star style={{marginRight: Width_convert(4)}}></Star>
          <Star></Star>
        </View>
      </View>
      <View
        style={{
          marginTop: Height_convert(11),
          marginLeft: Width_convert(21),
          width: Width_convert(265),
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontSize: Font_normalize(12),
            color: '#000000',
            fontWeight: '400',
          }}>
          정말 친절하시고 실력까지 좋은 가게입니다. 다른분들께 강력추천드립니다!
        </Text>
      </View>
      <View style={{marginTop: Height_convert(21)}}>
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{width: Width_convert(375)}}
          data={reviewImageList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <ReviewImage
              item={item}
              index={reviewImageList.indexOf(item)}></ReviewImage>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
      </View>
    </View>
  );
};

export default React.memo(Review);
