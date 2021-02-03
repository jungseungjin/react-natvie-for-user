import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const NoticeBoardScreen = (props) => {
  const [boardList, setBoardList] = React.useState([{_id: '1'}, {_id: '2'}]);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}></SafeAreaView>
      <Tabbar
        Title={'공지사항 및 이벤트'}
        navigation={props.navigation}></Tabbar>
      <View
        style={{
          width: Width_convert(375),
          height: Height_convert(812),
          backgroundColor: '#FFFFFF',
        }}>
        <FlatList
          style={{minHeight: Height_convert(812)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          data={boardList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <View
              key={item._id}
              style={{
                width: Width_convert(375),
                height: Height_convert(93),
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  props.navigation.navigate('NoticeBoardView');
                }}
                style={{
                  marginLeft: Width_convert(17),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(16),
                    fontWeight: '700',
                    color: '#000000',
                  }}>
                  2020년 7월 31일 업데이트 내용공지
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontSize: Font_normalize(10),
                    fontWeight: '400',
                    color: '#000000',
                  }}>
                  2020년 7월 31일
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
      </View>
    </>
  );
};

export default NoticeBoardScreen;
