import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
const entryQuestion = (props) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'투닝 입점문의'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          borderBottomColor: 'rgba(219, 219, 219, 0.35)',
          borderBottomWidth: 1,
        }}></View>
    </SafeAreaView>
  );
};

export default entryQuestion;
