import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import SignUp from '../../../components/Home/SignUp/signUp.js';
import CarSetting from '../../../components/Home/Setting/carSetting.js';
import LocationSetting from '../../../components/Home/Setting/locationSetting.js';
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
        {page == 'car' ? (
          <CarSetting></CarSetting>
        ) : (
          <LocationSetting navigation={navigation}></LocationSetting>
        )}
        <SignUp></SignUp>
      </SafeAreaView>
    </>
  );
};
export default SettingScreen;
