import React from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import StarGrey from '../../../../assets/home/star_grey.svg';
import Store from '../../../../assets/home/Store.svg';
import BraketRight from '../../../../assets/home/braket_right.svg';
import ReviewImage from './reviewImage.js';
import ReviewButton from './reviewButton.js';
const Review = (props) => {
  const StarRender = (grade) => {
    let newArr = [];
    for (var a = 1; a < 6; a++) {
      if (a <= grade) {
        newArr.push({value: 1, index: a});
      } else {
        newArr.push({value: 0, index: a});
      }
    }
    return newArr.map((item) =>
      item.value == 1 ? (
        <Star
          key={item.index}
          width={Width_convert(9)}
          height={Width_convert(9)}
          style={{marginRight: Width_convert(4)}}></Star>
      ) : (
        <StarGrey
          key={item.index}
          width={Width_convert(9)}
          height={Width_convert(9)}
          style={{marginRight: Width_convert(4)}}></StarGrey>
      ),
    );
  };
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
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => {
            props.getDataAndNavigate('store', props.item._id);
          }}
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
            {props.item.info_store[0].store_name}
          </Text>
          <Store
          //가게정보로 이동
          ></Store>
        </TouchableOpacity>
        <View
          style={{
            marginRight: Width_convert(11),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ReviewButton
            Title={'수정'}
            item={props.item}
            navigation={props.navigation}></ReviewButton>
          <ReviewButton
            Title={'삭제'}
            item={props.item}
            DeleteModalChangeValue={props.DeleteModalChangeValue}
            DeleteItemChangeValue={props.DeleteItemChangeValue}
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
            activeOpacity={1}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              props.getDataAndNavigate('work', props.item._id);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(11),
                color: '#A1A1A1',
                marginRight: Width_convert(4),
              }}>
              {props.item.store_work[0].store_work_name}
            </Text>
            <BraketRight></BraketRight>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: Height_convert(4)}}>
          {StarRender(props.item.review_reply_grade)}
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
          {props.item.review_reply_contents}
        </Text>
      </View>
      <View style={{marginTop: Height_convert(21)}}>
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{width: Width_convert(375)}}
          data={props.item.review_reply_image}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) =>
            typeof item == 'number' ? null : (
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => {
                  props.VisibleChangeValue(true);
                  props.VisibleImageChangeValue(props.item.review_reply_image);
                  props.VisibleIndexChangeValue(
                    props.item.review_reply_image.indexOf(item),
                  );
                }}>
                <ReviewImage
                  key={item}
                  item={item}
                  index={props.item.review_reply_image.indexOf(
                    item,
                  )}></ReviewImage>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item) => String(item)}></FlatList>
      </View>
    </View>
  );
};

export default React.memo(Review);
