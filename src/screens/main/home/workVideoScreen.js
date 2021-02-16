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
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import FastImage from 'react-native-fast-image';

const WorkVideoScreen = (props) => {
  const contentWidth = useWindowDimensions().width;
  const [isLoading, setIsLoading] = React.useState(false);
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
            height: Width_convert(291),
            borderBottomColor: '#F3F3F3',
            borderBottomWidth: Font_normalize(3),
          }}>
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(208),
            }}>
            <ScrollView alwaysBounceVertical={false} style={{flex: 1}}>
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
                marginTop: Width_convert(10),
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
                marginTop: Width_convert(10),
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
          <OwnersWork
            From={'workVideo'}
            item={{
              show: true,
              url: 'https://unsplash.it/400/400?image=6', //사진url
              videoUrl:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/oOcnauhMJJE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
              title:
                '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈', //영상제목
              ownersImage: 'https://unsplash.it/400/400?image=6', //채널이미지
              ownersname: '배말랭', //채널명
            }}
            Index={0}></OwnersWork>
          <OwnersWork
            From={'workVideo'}
            item={{
              show: true,
              url: 'https://unsplash.it/400/400?image=7', //사진url
              videoUrl:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/9u2Lmc-vRHo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
              title: '지거브모든거거거것', //영상제목
              ownersImage: 'https://unsplash.it/400/400?image=7', //채널이미지
              ownersname: '직모', //채널명
            }}
            Index={1}></OwnersWork>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default WorkVideoScreen;
