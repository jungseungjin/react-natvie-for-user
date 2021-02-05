import React from 'react';
import {
  StatusBar,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';

import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import ReviewRegister from '../../../../assets/home/reviewRegister.svg';
import IsLoading from '../../../components/ActivityIndicator';
import Review from '../../../components/More/Review/review.js';
const ReviewManage = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [scrollValue, setScrollValue] = React.useState(0);
  const [reviewList, setReviewList] = React.useState([{_id: 'dfdfd'}]);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'후기관리'} navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(161 - 94),
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginTop: Height_convert(28),
                marginLeft: Width_convert(21),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(20),
                color: '#000000',
                marginRight: Width_convert(8),
              }}>
              내가 작성한 후기 9개
            </Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{width: Width_convert(375)}}
          data={reviewList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <Review item={item} navigation={props.navigation}></Review>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default ReviewManage;
