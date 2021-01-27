import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Height_convert from '../../../components/Height_convert.js';
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: Width_convert(125)}}>
            <ScrollView style={{backgroundColor: '#F1F1F1'}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: Width_convert(125),
                  height: Width_convert(52),
                  backgroundColor: '#DBDBDB',
                  borderBottomColor: '#FFFFFF',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  바디파츠
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: Width_convert(125),
                  height: Width_convert(52),
                  backgroundColor: '#F1F1F1',
                  borderBottomColor: '#FFFFFF',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  휠/타이어/캘리퍼
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: Width_convert(125),
                  height: Width_convert(52),
                  backgroundColor: '#F1F1F1',
                  borderBottomColor: '#FFFFFF',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '400',
                    fontSize: Font_normalize(14),
                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  LED/램프류
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{width: Width_convert(250)}}>
            <ScrollView style={{backgroundColor: '#FFFFFF'}}>
              <View style={{marginLeft: Width_convert(28)}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    marginTop: Height_convert(20),
                    marginBottom: Height_convert(5),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(14),
                      color: '#946AEF',
                    }}>
                    바디킷 및 패키지
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: Width_convert(28)}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    marginTop: Height_convert(10),
                    marginBottom: Height_convert(5),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(14),
                      color: '#000000',
                    }}>
                    프론트범퍼
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default CategoryScreen;
