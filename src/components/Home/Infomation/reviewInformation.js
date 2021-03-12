import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import StarGrey from '../../../../assets/home/star_grey.svg';
import moment from 'moment';
import 'moment/locale/ko';
import ImageView from 'react-native-image-viewing';

const ReviewInformation = (props) => {
  moment.locale('ko');

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
            props.navigation.navigate('WorkDetail', {
              item: result.data[0].result[0],
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
  const [visible, setIsVisible] = React.useState(false);
  const [visibleImage, setVisibleImage] = React.useState([]);
  const [visibleIndex, setVisibleIndex] = React.useState(0);

  const getImageSource = (image) => {
    let newArr = [];
    image.map((item) => {
      if (typeof item == 'number') {
      } else {
        newArr.push({
          uri: item.toString(),
          source:
            'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
        });
      }
    });
    return newArr;
  };
  return (
    <View
      style={{
        minHeight: Height_convert(812),
      }}>
      <View
        style={{
          marginTop: Height_convert(20),
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
            {props.item.length}개
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
            {props.reviewGrade
              ? props.reviewGrade % 1 === 0
                ? props.reviewGrade + '.0'
                : parseFloat(props.reviewGrade.toFixed(1))
              : '0.0'}
          </Text>
        </View>
      </View>
      {props.item.map((item) => (
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
                  uri: item.info_user[0].review_user_iu_image,
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
                  {item.info_user[0].iu_nickname}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Height_convert(4),
                }}>
                {StarRender(item.review_reply_grade)}
                <Text
                  style={{
                    fontFamily: Fonts?.NanumGothicRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(9),
                    color: '#8D8D8D',
                  }}>
                  {moment(item.review_work_regdate, 'YYYY-MM-DD HH:mm:ss')
                    .add(9, 'h')
                    .fromNow()}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => {
                  getDataAndNavigate('work', item._id);
                }}
                style={{marginTop: Height_convert(8)}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(9),
                    fontWeight: '700',
                    color: '#A1A1A1',
                  }}>
                  {item.store_work[0].store_work_name}
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
                  {item.review_reply_contents}
                </Text>
              </View>
              <ScrollView
                style={{
                  marginTop: Height_convert(21),
                  minWidth: Width_convert(375),
                }}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {item.review_reply_image.map((imageItem) =>
                  typeof imageItem == 'number' ? null : (
                    <TouchableOpacity
                      activeOpacity={1}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => {
                        setIsVisible(true);
                        setVisibleImage(item.review_reply_image);
                        setVisibleIndex(
                          item.review_reply_image.indexOf(imageItem),
                        );
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
                        resizeMode={FastImage.resizeMode.stretch}></FastImage>
                    </TouchableOpacity>
                  ),
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      ))}
      <ImageView
        images={getImageSource(visibleImage)}
        imageIndex={visibleIndex}
        presentationStyle="overFullScreen"
        visible={visible}
        onRequestClose={() => setIsVisible(false)}></ImageView>
    </View>
  );
};
export default ReviewInformation;
