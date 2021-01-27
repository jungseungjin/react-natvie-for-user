import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
const CategoryScreen = ({navigation}) => {
  const [page, setPage] = React.useState('dressup');
  const PageChangeValue = (text) => setPage(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'작업종류'} navigation={navigation}></Tabbar>
        <TabBarBottom
          Title={[
            {title: '드레스업', value: 'dressup'},
            {title: '퍼포먼스', value: 'perfomance'},
            {title: '편의장치', value: 'convenience'},
            {title: '캠핑카', value: 'camping'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
      </SafeAreaView>
    </>
  );
};
export default CategoryScreen;
