import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import IframeRenderer from '@native-html/iframe-plugin';
const renderers = {
  iframe: IframeRenderer,
};
import OwnersWork from '../../../components/Home/horizontalScroll/ownersWork.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import FastImage from 'react-native-fast-image';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import Domain from '../../../../key/Domain.js';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const WorkVideoScreen = (props) => {
  const contentWidth = useWindowDimensions().width;
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [relatedVideoList, setRelatedVideoList] = React.useState([]);
  const getData = (RelatedVideo) => {
    try {
      let result;
      let url = Domain + 'relatedVideoList';
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              RelatedVideos: RelatedVideo,
            },
          });
          if (result.data[0].message == 'ok') {
            setRelatedVideoList(result.data[0].RelatedVideoList);
          } else {
            console.log(result.data[0]);
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
  React.useEffect(() => {
    getData(props.route.params.item.RelatedVideo);
  }, [props.route.params.item.ownersname]);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          Title={'사장님의 작업영상'}
          navigation={props.navigation}></Tabbar>
        <View
          style={{
            width: Width_convert(375),
            height: Width_convert(286),
            borderBottomColor: '#F3F3F3',
            borderBottomWidth: Font_normalize(3),
          }}>
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(220),
            }}>
            <ScrollView
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}>
              <HTML
                renderers={renderers}
                source={{
                  html: props.route.params.item.videoUrl,
                }}
                contentWidth={contentWidth}
                WebView={WebView}
                defaultWebViewProps={
                  {
                    /* Any prop you want to pass to all WebViews */
                  }
                }
                renderersProps={{iframe: {scalesPageToFit: true}}}
              />
            </ScrollView>
          </View>
          <View
            style={{
              width: Width_convert(343),
              marginLeft: Width_convert(13),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: Width_convert(28),
                marginRight: Width_convert(11),
                marginTop: Width_convert(5),
              }}>
              <FastImage
                style={{
                  width: Width_convert(28),
                  height: Width_convert(28),
                  borderRadius: Width_convert(28),
                }}
                source={{
                  uri: props.route.params.item.url,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}></FastImage>
            </View>
            <View
              style={{
                width: Width_convert(304),
                marginTop: Width_convert(5),
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSquareRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(13),
                    color: '#000000',
                  }}>
                  {props.route.params.item.title}
                </Text>
              </View>
              <View style={{marginTop: Width_convert(3)}}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(10),
                    color: '#6F6F6F',
                  }}>
                  {props.route.params.item.ownersname}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginLeft: Width_convert(13),
              marginTop: Width_convert(27),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(14),
              fontWeight: '700',
              color: '#000000',
            }}>
            관련 추천 동영상
          </Text>
          {relatedVideoList.map((item) => (
            <OwnersWork
              key={item._id}
              From={'workVideo'}
              item={item}
              navigation={props.navigation}
              Index={relatedVideoList.indexOf(item)}></OwnersWork>
          ))}
        </ScrollView>
      </SafeAreaView>
      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
    </>
  );
};

export default WorkVideoScreen;
