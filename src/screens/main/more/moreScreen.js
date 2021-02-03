import React from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Menu from '../../../components/More/Menu/Menu.js';
const MoreScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(812),
            borderBottomWidth: 1,
          }}>
          <Tabbar Title={'더보기'}></Tabbar>
          <Menu Title={'내정보'} navigation={props.navigation}></Menu>
          {/*리덕스에서 로그인 유무 구분해서 버튼 표시하기 */}
          <Menu Title={'로그인하기'} navigation={props.navigation}></Menu>
          <Menu Title={'후기관리'} navigation={props.navigation}></Menu>
          <Menu Title={'최근 본 작업'} navigation={props.navigation}></Menu>
          <Menu
            Title={'공지사항 및 이벤트'}
            navigation={props.navigation}></Menu>
          <Menu Title={'고객센터'} navigation={props.navigation}></Menu>
          <Menu Title={'설정'} navigation={props.navigation}></Menu>
          <Menu
            Title={'투닝 가게 입점 문의'}
            navigation={props.navigation}></Menu>
        </View>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};
export default MoreScreen;
