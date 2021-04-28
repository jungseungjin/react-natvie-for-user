import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import Review from '../../../components/More/Review/review.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import AlertModal2 from '../../../components/Modal/AlertModal2.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import {useSelector} from 'react-redux';
import LoginModal from '../../../components/Modal/LoginModal.js';
import moment from 'moment';
import 'moment/locale/ko';
import ImageView from 'react-native-image-viewing';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';
const ReviewManage = (props) => {
  moment.locale('ko');
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const reduxState = useSelector((state) => state);
  const [loginModal, setLoginModal] = useState(false);
  const LoginModalChangeValue = (text) => setLoginModal(text);
  const [deleteModal, setDeleteModal] = useState(false);
  const DeleteModalChangeValue = (text) => setDeleteModal(text);
  const [deleteItem, setDeleteItem] = useState('');
  const DeleteItemChangeValue = (Object) => setDeleteItem(Object);
  const [refreshing, setRefreshing] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   getData();
  //   setRefreshing(false);
  // }, []);

  const throttleGetData = _.throttle((Number) => getData(backendPage), 300, {
    leading: true,
    trailing: false,
  });
  const [backendPage, setBackendPage] = useState(1);
  const getData = (Page) => {
    try {
      let page;
      if (Page) page = backendPage;
      let url = `${Domain}api/review/get/user`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              id: reduxState.loginDataCheck.login.data._id,
              page: page,
            },
          });
          if (result.data.success === true) {
            if (Page) {
              if (result.data.results[0].totalData.length > 0) {
                setReviewList([
                  ...reviewList,
                  ...result.data.results[0].totalData,
                ]);
                setBackendPage((prevState) => {
                  return (prevState += 1);
                });
              }
            } else {
              setReviewList(result.data.results[0].totalData);
              setReviewCount(result.data.results[0].totalCount[0]?.count || 0);
            }
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  const scrollRef = useRef();
  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollToOffset({animated: false, offset: 0});
  }, []);
  const DeleteReview = () => {
    try {
      let url = `${Domain}api/review/delete`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let data = {
            reviewid: deleteItem._id,
            workid: deleteItem.work,
            storeid: deleteItem.store,
            reviewgrade: deleteItem.grade,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            setBackendPage(1);
            scrollToTop();
            getData();
          } else {
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getDataAndNavigate = (type, workid, storeid) => {
    try {
      let url = `${Domain}api/${type}/get/one`;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              workid: workid,
              userid: reduxState?.loginDataCheck?.login?._id,
              storeid: storeid,
            },
          });
          if (result.data.success === true) {
            if (type === 'work') {
              props.navigation.navigate('WorkDetail', {
                item: result.data.results[0],
              });
            } else if (type === 'store') {
              props.navigation.navigate('StoreDetail', {
                item: result.data.results[1],
                pick: result.data.results[0],
              });
            }
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      getData();
    });
  }, []);
  // useEffect(() => {
  //   getData();
  // }, []);
  const getImageSource = (image) => {
    let newArr = [];
    image.map((item) => {
      if (typeof item == 'number') {
      } else {
        newArr.push({
          uri: item.toString(),
          source: item,
        });
      }
    });
    return newArr;
  };
  const [visible, setIsVisible] = useState(false);
  const VisibleChangeValue = (text) => setIsVisible(text);
  const [visibleImage, setVisibleImage] = useState([]);
  const VisibleImageChangeValue = (text) => setVisibleImage(text);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const VisibleIndexChangeValue = (text) => setVisibleIndex(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          left={'back'}
          Title={'후기관리'}
          navigation={props.navigation}></Tabbar>
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
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          bounces={false}
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{width: Width_convert(375)}}
          data={reviewList}
          windowSize={2}
          initialNumToRender={10}
          onEndReached={throttleGetData}
          onEndReachedThreshold={10}
          renderItem={({item}) => (
            <Review
              key={item}
              item={item}
              getDataAndNavigate={getDataAndNavigate}
              DeleteModalChangeValue={DeleteModalChangeValue}
              DeleteItemChangeValue={DeleteItemChangeValue}
              VisibleChangeValue={VisibleChangeValue}
              VisibleImageChangeValue={VisibleImageChangeValue}
              VisibleIndexChangeValue={VisibleIndexChangeValue}
              navigation={props.navigation}></Review>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
        <ImageView
          images={getImageSource(visibleImage)}
          imageIndex={visibleIndex}
          presentationStyle="overFullScreen"
          visible={visible}
          onRequestClose={() => setIsVisible(false)}></ImageView>
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
        {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
          <IsLoading></IsLoading>
        ) : isLoadingAndModal === 2 ? (
          <NetworkErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NetworkErrModal>
        ) : isLoadingAndModal === 3 ? (
          <NormalErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NormalErrModal>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default ReviewManage;
