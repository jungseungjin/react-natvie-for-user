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
  RefreshControl,
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
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import {useSelector} from 'react-redux';
import LoginModal from '../../../components/Modal/LoginModal.js';
import moment from 'moment';
import 'moment/locale/ko';
const ReviewManage = (props) => {
  moment.locale('ko');
  const reduexState = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginModal, setLoginModal] = React.useState(false);
  const LoginModalChangeValue = (text) => setLoginModal(text);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const DeleteModalChangeValue = (text) => setDeleteModal(text);
  const [deleteItem, setDeleteItem] = React.useState('');
  const DeleteItemChangeValue = (Object) => setDeleteItem(Object);
  const [refreshing, setRefreshing] = React.useState(false);
  const [reviewList, setReviewList] = React.useState([]);
  const [reviewCount, setReviewCount] = React.useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);
  const getData = () => {
    try {
      let result;
      let url = Domain2 + 'reviewList/user';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              _id: reduexState.loginDataCheck.login.data._id,
            },
          });
          if (result.data[0].message == 'ok') {
            setReviewList(result.data[0].result);
            setReviewCount(result.data[0].result.length);
          } else {
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const DeleteReview = () => {
    try {
      let url = Domain2 + 'review/delete';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let data = {
            item_id: deleteItem._id,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            onRefresh();
          } else {
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getDataAndNavigate = (type, item_id) => {
    try {
      let result;
      let url = Domain2 + 'reviewList/navigate/' + type;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              item_id: item_id,
            },
          });
          if (result.data[0].message == 'ok') {
            if (type === 'work') {
              props.navigation.navigate('WorkDetail', {
                item: result.data[0].result[0],
              });
            } else if (type === 'store') {
              props.navigation.navigate('StoreDetail', {
                item: result.data[0].result[0],
              });
            }
          } else {
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    props.navigation.addListener('focus', async () => {
      onRefresh();
    });
  }, []);

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
              내가 작성한 후기 {reviewCount}개
            </Text>
          </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{width: Width_convert(375)}}
          data={reviewList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <Review
              key={item}
              item={item}
              getDataAndNavigate={getDataAndNavigate}
              DeleteModalChangeValue={DeleteModalChangeValue}
              DeleteItemChangeValue={DeleteItemChangeValue}
              navigation={props.navigation}></Review>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
        {deleteModal ? (
          <AlertModal2
            type={1}
            Title={'후기를 삭제하시겠습니까?'}
            navigation={props.navigation}
            ShowModalChangeValue={DeleteModalChangeValue}
            DeleteReview={DeleteReview}
            LeftButtonTitle={'취소'}
            RightButtonTitle={'확인'}></AlertModal2>
        ) : null}
        {networkModal ? (
          <AlertModal1
            type={1}
            ShowModalChangeValue={NetworkModalChangeValue}
            navigation={props.navigation}
            Title={'인터넷 연결을 확인해주세요.'}
            //BottomText={''}
            CenterButtonText={'확인'}></AlertModal1>
        ) : null}
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default ReviewManage;
