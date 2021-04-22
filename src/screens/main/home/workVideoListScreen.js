import React, {useState} from 'react';
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
import Height_convert from '../../../components/Height_convert.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
import _ from 'lodash';

const WorkVideoListScreen = (props) => {
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [refreshing, setRefreshing] = React.useState(false);
  const [viewWorkList, setViewWorkList] = React.useState([]);
  const [backendPage, setBackendPage] = useState(1);
  const throttleGetData = _.throttle((Number) => getData(true), 300, {
    leading: true,
    trailing: false,
  });
  const getData = (scrolling) => {
    try {
      let page;
      if (scrolling) page = backendPage;
      else page = 0;
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = `${Domain}api/home/get/video`;
          let result = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              page: page,
            },
          });
          if (result.data.success === true) {
            if (page) {
              setViewWorkList([...viewWorkList, ...result.data.result]);
            } else {
              setViewWorkList([...result.data.result]);
            }
            if (scrolling) {
              setBackendPage((prevState) => {
                return prevState + 1;
              });
            }
          } else {
            console.log(result.data);
            setIsLoadingAndModal(3);
          }
        } else {
          //인터넷 연결이 안되어있으면 인터넷 연결을 해주세요
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
          left={'back'}
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
          onEndReached={throttleGetData}
          onEndReachedThreshold={50}
          renderItem={({item}) => (
            <>
              <OwnersWork
                From={'workVideo'}
                item={item}
                navigation={props.navigation}
                Index={viewWorkList.indexOf(item)}></OwnersWork>
              {viewWorkList.indexOf(item) === viewWorkList.length - 1 ? (
                <View style={{height: Height_convert(390)}}></View>
              ) : null}
            </>
          )}
          keyExtractor={(item) => String(item._id)}></FlatList>
      </SafeAreaView>

      {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
        <IsLoading></IsLoading>
      ) : isLoadingAndModal === 2 ? (
        <NetworkErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NetworkErrModal>
      ) : isLoadingAndModal === 3 ? (
        <NormalErrModal
          ShowModalChangeValue={IsLoadingAndModalChangeValue}></NormalErrModal>
      ) : null}
    </>
  );
};

export default WorkVideoListScreen;
