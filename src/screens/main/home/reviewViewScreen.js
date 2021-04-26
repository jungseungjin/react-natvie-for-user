import React, {useState, useEffect, useCallback} from 'react';
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
  RefreshControl,
  FlatList,
} from 'react-native';

import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import StarGrey from '../../../../assets/home/star_grey.svg';
import ReviewRegister from '../../../../assets/home/reviewRegister.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import {useSelector} from 'react-redux';
import LoginModal from '../../../components/Modal/LoginModal.js';
import moment from 'moment';
import 'moment/locale/ko';
import ImageView from 'react-native-image-viewing';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';

import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';
const ReviewView = (props) => {
  moment.locale('ko');
  //해당 작업 후기 불러오기
  const reduxState = useSelector((state) => state);
  const [loginModal, setLoginModal] = useState(false);
  const LoginModalChangeValue = (text) => setLoginModal(text);
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [refreshing, setRefreshing] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [reviewCount, setReviewCount] = useState(
    props.route.params.item.reviewCount,
  );

  //작업에 대한 리뷰 기준.  가게에 대한 리뷰기준이면 가게기준으로 변경필요
  const [reviewGrade, setReviewGrade] = useState(props.route.params.item.grade);
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
      let url = `${Domain}api/review/get/${props.route.params.type}`;

      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              id: props.route.params.item._id,
              page: page,
            },
          });
          if (result.data.success === true) {
            if (Page) {
              setReviewList([...reviewList, ...result.data.result]);
              setBackendPage((prevState) => {
                return (prevState += 1);
              });
            } else {
              setReviewList(result.data.result);
            }
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
  useEffect(() => {
    getData();
  }, []);
  const StarRender = (grade) => {
    let newArr = [];
    for (var a = 1; a < 6; a++) {
      if (a <= grade) {
        newArr.push({value: 1, index: a - 1});
      } else {
        newArr.push({value: 0, index: a - 1});
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
            props.navigation.navigate('WorkDetail', {
              item: result.data.results[0],
            });
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

  const [visible, setIsVisible] = React.useState(false);
  const [visibleImage, setVisibleImage] = React.useState([]);
  const [visibleIndex, setVisibleIndex] = React.useState(0);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        {Platform.OS == 'android' ? (
          <View
            style={{width: Width_convert(375), height: StatusBarHeight}}></View>
        ) : null}
        <Tabbar
          left={'back'}
          Title={
            props.route.params.type == 'work'
              ? props.route.params.item?.name
              : props.route.params.type == 'store'
              ? props.route.params.item?.name
              : null
          }
          navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(161 - 94),
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              marginBottom: Height_convert(12),
            }}>
            <Text
              style={{
                marginLeft: Width_convert(19),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(20),
                color: '#000000',
                textAlign: 'right',
                lineHeight: Font_normalize(23),
                marginRight: Width_convert(8),
              }}>
              작업후기{'\n'}
              {reviewCount}개
            </Text>
          </View>
          <View
            style={{
              marginBottom: Height_convert(12),
            }}>
            <Text
              style={{
                borderRadius: Font_normalize(4),
                overflow: 'hidden',
                backgroundColor: '#FFC187',
                padding: Width_convert(10),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(22),
                color: '#FFFFFF',
              }}>
              {reviewGrade
                ? reviewGrade % 1 === 0
                  ? reviewGrade + '.00'
                  : parseFloat(reviewGrade.toFixed(2))
                : '0.00'}
            </Text>
          </View>
        </View>

        <FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          style={{width: Width_convert(375)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={reviewList}
          windowSize={2}
          initialNumToRender={10}
          onEndReached={throttleGetData}
          onEndReachedThreshold={10}
          renderItem={({item}) => (
            <View
              key={item._id}
              style={{
                width: Width_convert(375),
                paddingBottom: Height_convert(35),
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE',
              }}>
              <View
                style={{
                  marginTop: Height_convert(17),
                  marginLeft: Width_convert(16),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: Width_convert(34),
                    height: Width_convert(34),
                    marginRight: Width_convert(7),
                  }}>
                  <FastImage
                    style={{
                      width: Width_convert(34),
                      height: Width_convert(34),
                      borderRadius: Width_convert(34),
                    }}
                    source={{
                      uri: item.writerImage,
                      //headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}></FastImage>
                </View>
                <View>
                  <View>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(14),
                        fontWeight: '700',
                        color: '#000000',
                      }}>
                      {item.writerNickname}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Height_convert(4),
                    }}>
                    {StarRender(item.grade)}
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumGothicRegular || null,
                        fontWeight: '400',
                        fontSize: Font_normalize(9),
                        color: '#8D8D8D',
                      }}>
                      {moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss')
                        .add(9, 'h')
                        .fromNow()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => {
                      getDataAndNavigate('work', item.work, item.store);
                    }}
                    style={{marginTop: Height_convert(8)}}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(9),
                        fontWeight: '700',
                        color: '#A1A1A1',
                      }}>
                      {item.workName}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: Width_convert(265),
                      marginTop: Height_convert(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontSize: Font_normalize(12),
                        fontWeight: '400',
                        color: '#000000',
                      }}>
                      {item.comment}
                    </Text>
                  </View>
                  <ScrollView
                    style={{
                      marginTop: Height_convert(21),
                      minWidth: Width_convert(375),
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {item.image.map((imageItem) =>
                      typeof imageItem == 'number' ? null : (
                        <TouchableOpacity
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => {
                            setIsVisible(true);
                            setVisibleImage(item.image);
                            setVisibleIndex(item.image.indexOf(imageItem));
                          }}
                          key={imageItem}
                          style={{marginRight: Width_convert(7)}}>
                          <FastImage
                            style={{
                              width: Width_convert(134),
                              height: Width_convert(88),
                              borderRadius: Width_convert(3),
                            }}
                            source={{
                              uri: imageItem,
                              //headers: {Authorization: 'someAuthToken'},
                              priority: FastImage.priority.normal,
                            }}
                            resizeMode={
                              FastImage.resizeMode.stretch
                            }></FastImage>
                        </TouchableOpacity>
                      ),
                    )}
                  </ScrollView>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(imageItem) => String(imageItem._id)}></FlatList>
        {props.route.params.type == 'work' ? (
          <View
            style={{
              width: Width_convert(48),
              height: Width_convert(48),
              position: 'absolute',
              bottom: Height_convert(72),
              right: Width_convert(14),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                if (reduxState.loginDataCheck.login.login == true) {
                  props.navigation.navigate('ReviewRegister', {
                    item: props.route.params.item,
                  });
                } else {
                  setLoginModal(true);
                }
              }}
              style={{
                width: Width_convert(48),
                height: Width_convert(48),
                marginRight: Width_convert(14),
                borderRadius: Width_convert(48),
                backgroundColor: '#946AEF',
                justifyContent: 'center',
                alignItems: 'center',

                shadowColor: '#000000', //그림자색
                shadowOpacity: 0.2, //그림자 투명도
                shadowOffset: {width: 2, height: 2}, //그림자 위치
                //ANDROID
                elevation: 5,
              }}>
              <ReviewRegister
                style={{marginLeft: Width_convert(7)}}
                width={Width_convert(30)}
                height={Width_convert(30)}></ReviewRegister>
            </TouchableOpacity>
          </View>
        ) : null}
        <ImageView
          images={getImageSource(visibleImage)}
          imageIndex={visibleIndex}
          presentationStyle="overFullScreen"
          visible={visible}
          onRequestClose={() => setIsVisible(false)}></ImageView>
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
        {loginModal ? (
          <LoginModal
            fromNav={'home'}
            ShowModalChangeValue={LoginModalChangeValue}
            navigation={props.navigation}
            //Title={'우리가게공임표를 확인하려면 로그인이 필요합니다.'}
            //BottomText={'설정하러가기'}
            //LeftButtonTitle={'아니오'}
            //RightButtonTitle={'네'}
          ></LoginModal>
        ) : null}
      </SafeAreaView>
    </>
  );
};

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
export default ReviewView;
