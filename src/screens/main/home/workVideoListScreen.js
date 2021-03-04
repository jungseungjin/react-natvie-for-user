import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import OwnersWork from '../../../components/Home/horizontalScroll/ownersWork.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import IsLoading from '../../../components/ActivityIndicator';
import Height_convert from '../../../components/Height_convert.js';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
const WorkVideoListScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [viewWorkList, setViewWorkList] = React.useState([]);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const getData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = `${Domain2}videolist`;
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setViewWorkList(result.data[0].RecommendVideoList);
          } else {
            console.log(result.data[0]);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
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
          Title={'사장님의 작업영상'}
          navigation={props.navigation}></Tabbar>

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{minHeight: Height_convert(812)}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={viewWorkList}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) => (
            <>
              <OwnersWork
                From={'workVideo'}
                item={{
                  show: true,
                  url: item.url, //사진url
                  videoUrl: item.videoUrl,
                  title: item.Title, //영상제목
                  ownersImage: item.ownersImage, //채널이미지
                  ownersname: item.ownersname, //채널명
                }}
                navigation={props.navigation}
                Index={viewWorkList.indexOf(item)}></OwnersWork>
              {viewWorkList.indexOf(item) == viewWorkList.length - 1 ? (
                <View style={{height: Height_convert(390)}}></View>
              ) : null}
            </>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
      </SafeAreaView>
      {networkModal ? (
        <ButtonOneModal
          ShowModalChangeValue={NetworkModalChangeValue}
          navigation={props.navigation}
          Title={'인터넷 연결을 확인해주세요'}
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

export default WorkVideoListScreen;
