import React from 'react';
import {View, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import OwnersWork from '../../../components/Home/horizontalScroll/ownersWork.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import IsLoading from '../../../components/ActivityIndicator';
const WorkVideoListScreen = (props) => {
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
              url: 'https://unsplash.it/400/400?image=6', //사진url
              videoUrl:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/oOcnauhMJJE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
              title:
                '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈', //영상제목
              ownersImage: 'https://unsplash.it/400/400?image=6', //채널이미지
              ownersname: '배말랭', //채널명
            }}
            Index={1}></OwnersWork>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default WorkVideoListScreen;
