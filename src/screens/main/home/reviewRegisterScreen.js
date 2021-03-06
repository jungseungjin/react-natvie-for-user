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
  TextInput,
} from 'react-native';

import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Star from '../../../../assets/home/star.svg';
import StarGrey from '../../../../assets/home/star_grey.svg';
import PicktureNestedPlus from '../../../../assets/home/pickture_nestedPlus.svg';
import StatusBarHeight from '../../../components/StatusBarHeight.js';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import key from '../../../../key/key.js';
import moment from 'moment';
import S3 from 'aws-sdk/clients/s3';
import fs from 'react-native-fs';
import base64_arraybuffer from 'base64-arraybuffer';
import {Braket} from 'aws-sdk';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import {useSelector} from 'react-redux';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import {openSettings} from 'react-native-permissions';
const ReviewRegister = (props) => {
  const reduxState = useSelector((state) => state);
  const [page, setPage] = React.useState('');
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [showModal, setShowModal] = React.useState(false);
  const ShowModalChangeValue = (text) => setShowModal(text);
  const [showModalTitle, setShowModalTitle] = React.useState('');
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [starCount, setStarCount] = React.useState([
    {value: 0, index: 0},
    {value: 0, index: 1},
    {value: 0, index: 2},
    {value: 0, index: 3},
    {value: 0, index: 4},
  ]);
  const [contents, setContents] = React.useState('');
  const [imageList, setImageList] = React.useState([0, 1, 2, 3]);
  const addImage = () => {
    try {
      ImagePicker.openPicker({
        height: 1280,
        compressImageMaxWidth: 1280,
        width: 960,
        compressImageMaxHeight: 960,
        multiple: true,
        maxFiles: 4,
      })
        .then((images) => {
          uploadImageOnS3(images);
        })
        .catch((e) => {
          console.log('err pickWithCamera: ', e);
          //openSettings();
        });
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImageOnS3 = async (file) => {
    const s3bucket = new S3({
      accessKeyId: key.amazonID,
      secretAccessKey: key.amazonSECRET,
      Bucket: key.amazonBUCKET_NAME,
      signatureVersion: 'v4',
    });
    await s3bucket.createBucket(async () => {
      let newArr = [0, 1, 2, 3];
      for (var a = 0; a < file.length; a++) {
        if (a > 3) {
          break;
        }
        let contentType = 'image/jpeg';
        let contentDeposition =
          'review_image/' + moment().valueOf() + file[a].filename;
        let base64 = await fs.readFile(file[a].path, 'base64');
        let arrayBuffer = base64_arraybuffer.decode(base64);
        let params = {
          Bucket: key.amazonBUCKET_NAME,
          Key: contentDeposition,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
        };
        await s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log('error in callback');
          }
          for (var b = 0; b < 4; b++) {
            if (typeof newArr[b] == 'number') {
              newArr[b] = data.Location;
              //newArr.push(data.Location);
              setImageList(newArr);
              forceUpdate();
              break;
            }
          }
        });
      }
    });
  };
  const sendData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let data = {};
          let url = `${Domain}api/review/save`;
          if (reduxState.loginDataCheck.login.login === true) {
            let starValue = 0;
            for (var a = 0; a < starCount.length; a++) {
              if (starCount[a].value == 1) {
                starValue++;
              }
            }
            if (starValue === 0) {
              setShowModalTitle('평점을 평가해주세요.');
              setShowModal(true);
              return false;
            } else if (contents === '') {
              setShowModalTitle('후기 내용을 입력해주세요.');
              setShowModal(true);
              return false;
            }
            data = {
              workid: props.route.params.item._id,
              workname: props.route.params.item.name,
              storeid: props.route.params.item.storeId,
              storename: props.route.params.item.store.name,
              userid: reduxState.loginDataCheck.login.data._id,
              usernickname: reduxState.loginDataCheck.login.data.iu_nickname,
              userimage:
                reduxState.loginDataCheck.login?.data?.review_user_iu_image,
              comment: contents,
              grade: starValue,
              imagelist: imageList,
            };
          } else {
            return false;
          }
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            props.navigation.goBack();
            props.navigation.goBack();
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  return (
    <DismissKeyboard>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'#FFFFFF'}></StatusBar>
        {Platform.OS == 'android' ? (
          <View
            style={{
              width: Width_convert(375),
              height: StatusBarHeight,
            }}></View>
        ) : null}
        <Tabbar
          left={'back'}
          Title={'후기작성'}
          navigation={props.navigation}></Tabbar>
        {/*  작업명, 샵이름, 별점 시작 */}
        <View style={{alignItems: 'center', width: Width_convert(375)}}>
          <View>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(16),
                color: '#000000',
              }}>
              {props.route.params.item.name}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                marginTop: Height_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '400',
                fontSize: Font_normalize(10),
                color: '#000000',
              }}>
              {props.route.params.item.store.name}
            </Text>
          </View>
          <View
            style={{
              marginTop: Height_convert(14),
              flexDirection: 'row',
            }}>
            {starCount.map((item) =>
              item.value == 0 ? (
                <TouchableOpacity
                  key={item.index}
                  activeOpacity={1}
                  onPress={() => {
                    let newArr = [];
                    for (var a = 0; a < 5; a++) {
                      if (item.index >= a) {
                        newArr.push({value: 1, index: a});
                      } else {
                        newArr.push({value: 0, index: a});
                      }
                    }
                    setStarCount(newArr);
                  }}>
                  <StarGrey
                    width={Width_convert(20)}
                    height={Height_convert(20)}
                    style={{marginRight: Width_convert(7)}}></StarGrey>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={item.index}
                  activeOpacity={1}
                  onPress={() => {
                    let newArr = [];
                    for (var a = 0; a < 5; a++) {
                      if (item.index >= a) {
                        newArr.push({value: 1, index: a});
                      } else {
                        newArr.push({value: 0, index: a});
                      }
                    }
                    setStarCount(newArr);
                  }}>
                  <Star
                    width={Width_convert(20)}
                    height={Height_convert(20)}
                    style={{marginRight: Width_convert(7)}}></Star>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        {/*  작업명, 샵이름, 별점 끝 */}
        <View
          style={{
            marginTop: Height_convert(17),
            width: Width_convert(375),
            height: Width_convert(479),
            alignItems: 'center',
          }}>
          {/*후기 글작성 시작 */}
          <View
            style={{
              width: Width_convert(339),
              height: Height_convert(391),
              borderBottomWidth: 1,
              borderBottomColor: '#BFBFBF',
              borderTopWidth: 1,
              borderTopColor: '#BFBFBF',
              borderLeftWidth: 1,
              borderLeftColor: '#BFBFBF',
              borderRightWidth: 1,
              borderRightColor: '#BFBFBF',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: Width_convert(339),
                height: Height_convert(391),
              }}>
              <TextInput
                placeholder="여러분의 후기를 통해, 튜닝정보가 더욱 투명해지고 열린 정보가 되어 활기찬 튜닝문화를 만들어 나갈 수 있습니다"
                multiline={true}
                autoCapitalize={'none'}
                autoCompleteType={'off'}
                autoCorrect={false}
                onChangeText={(contents) => setContents(contents)}
                value={contents}
                placeholderStyle={{
                  minHeight: Height_convert(812),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#A1A1A1',
                  textAlignVertical: 'top',
                }}
                style={{
                  width: Width_convert(339),
                  minHeight: Height_convert(812),
                  paddingLeft: Width_convert(7),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(15),
                  color: '#000000',
                  textAlignVertical: 'top',
                }}></TextInput>
            </ScrollView>
          </View>
          {/*후기 글작성 끝 */}
          {/* 하단 사진추가버튼 시작 */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              addImage();
            }}
            style={{
              width: Width_convert(339),
              height: Width_convert(71),
              marginTop: Height_convert(17),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {imageList.map((item) => (
              <View
                key={item}
                style={{
                  width: Width_convert(71),
                  height: Width_convert(71),
                  marginRight: Width_convert(18),
                  borderBottomWidth: 1,
                  borderBottomColor: '#BFBFBF',
                  borderTopWidth: 1,
                  borderTopColor: '#BFBFBF',
                  borderLeftWidth: 1,
                  borderLeftColor: '#BFBFBF',
                  borderRightWidth: 1,
                  borderRightColor: '#BFBFBF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {typeof item == 'number' ? (
                  <PicktureNestedPlus></PicktureNestedPlus>
                ) : (
                  <FastImage
                    style={{
                      width: Width_convert(71),
                      height: Width_convert(71),
                    }}
                    source={{
                      uri: item,
                      //headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}></FastImage>
                )}
              </View>
            ))}
          </TouchableOpacity>
          {/* 하단 사진추가버튼 끝 */}
          <View
            style={{
              marginTop: Height_convert(30),
              width: Width_convert(375),
              height: Width_convert(46),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                sendData();
              }}
              style={{
                width: Width_convert(339),
                height: Width_convert(46),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Font_normalize(5),
                backgroundColor: '#946AEF',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(16),
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}>
                작성완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showModal ? (
          <AlertModal1
            type={1}
            ShowModalChangeValue={ShowModalChangeValue}
            navigation={props.navigation}
            Title={showModalTitle}
            //BottomText={''}
            CenterButtonText={'확인'}></AlertModal1>
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
    </DismissKeyboard>
  );
};
export default ReviewRegister;
