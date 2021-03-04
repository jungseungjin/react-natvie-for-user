import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  RefreshControl,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import IsLoading from '../../../components/ActivityIndicator';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import moment from 'moment';

const NoticeBoardScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const getData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = `${Domain2}noticelist`;
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setBoardList(result.data[0].result);
          } else {
          }
        } else {
          setNetworkModal(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);
  const [boardList, setBoardList] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                    props.navigation.navigate('NoticeBoardView', {item: item});
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
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(10),
                      fontWeight: '400',
                      color: '#000000',
                    }}>
                    {moment(item.regDate).format('YYYY년 MM월 DD일')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => String(item._id)}></FlatList>
        </View>
        {networkModal ? (
          <ButtonOneModal
            ShowModalChangeValue={NetworkModalChangeValue}
            navigation={props.navigation}
            Title={'인터넷 연결을 확인해주세요'}
            //BottomText={''}
            CenterButtonText={'닫기'}></ButtonOneModal>
        ) : null}
        {isLoading ? <IsLoading></IsLoading> : null}
      </SafeAreaView>
    </>
  );
};

export default NoticeBoardScreen;
