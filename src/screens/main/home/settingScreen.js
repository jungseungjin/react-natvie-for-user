import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
const SettingScreen = ({navigation}) => {
  const [page, setPage] = React.useState('car');
  const PageChangeValue = (text) => setPage(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'설정'} navigation={navigation}></Tabbar>
        <TabBarBottom
          Title={[
            {title: '차량선택', value: 'car'},
            {title: '지역설정', value: 'location'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
      </SafeAreaView>
    </>
  );
};
export default SettingScreen;
