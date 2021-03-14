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
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import moment from 'moment';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const NoticeBoardScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [refreshing, setRefreshing] = React.useState(false);
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
          setIsLoadingAndModal(2);
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
        {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
          <IsLoading></IsLoading>
        ) : isLoadingAndModal === 2 ? (
          <NetworkErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NetworkErrModal>
        ) : isLoadingAndModal === 3 ? (
          <NormalErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NormalErrModal>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default NoticeBoardScreen;
