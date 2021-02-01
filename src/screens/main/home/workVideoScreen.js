import React from 'react';
import {View, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import OwnersWork from '../../../components/Home/horizontalScroll/ownersWork.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import IsLoading from '../../../components/ActivityIndicator';
const WorkVideoScreen = (props) => {
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
            Title={
              '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈'
            }
            ImageUrl={'https://unsplash.it/400/400?image=1'}
            OwnersImage={'https://unsplash.it/400/400?image=1'}
            OwnersStore={'모토리 튜닝샵'}
            Index={0}></OwnersWork>
          <OwnersWork
            From={'workVideo'}
            Title={
              '너도나도 같은 배기음? 소리박 제품은 달라! 소리나 한번 들어보고 가슈'
            }
            ImageUrl={'https://unsplash.it/400/400?image=1'}
            OwnersImage={'https://unsplash.it/400/400?image=1'}
            OwnersStore={'모토리 튜닝샵'}
            Index={1}></OwnersWork>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default WorkVideoScreen;
