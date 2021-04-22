import React, {useState, useEffect, useRef} from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import TabBarBottom from '../../../components/Home/Tabbar/tabbarBottom.js';
import axios from 'axios';
import MiddleCategory from '../../../components/Home/Category/middleCategory.js';
import SmallCategory from '../../../components/Home/Category/smallCategory.js';
import NetInfo from '@react-native-community/netinfo';
import Domain from '../../../../key/Domain.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import {useSelector} from 'react-redux';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const tabbarBottomValue = [
  {_id: 0, title: '드레스업', value: 'dressup'},
  {_id: 1, title: '퍼포먼스', value: 'perfomance'},
  {_id: 2, title: '편의장치', value: 'convenience'},
  {_id: 3, title: '캠핑카', value: 'camping'},
];
const CategoryScreen = (props) => {
  const reduxState = useSelector((state) => state);
  //완료버튼이 중분류 소분류까지 가능. 대분류는 말고!
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  const [searchModal, setSearchModal] = useState(false);
  const SearchModalChangeValue = (text) => setSearchModal(text);
  const nextPage = () => {
    try {
      if (pickSecondCategory._id !== undefined) {
        //중분류 찍혀있음 넘어가도됨.
        props.navigation.navigate('CategoryDetail', {
          Page: pages[page],
          pickThirdCategory: pickThirdCategory,
          pickSecondCategory: pickSecondCategory,
        });
      } else {
        setSearchModal(true);
        //중분류도 안찍혀있음 -> 아무것도 안해  --- 나중에 모달띄우기 넣지
      }
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };

  const getData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let Data = await axios.get(`${Domain}api/category/getdata/all`, {
            headers: {'Content-Type': 'application/json'},
          });
          setPages(Data.data.result);
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [page, setPage] = React.useState(0);
  const [pages, setPages] = React.useState([
    {_id: 0, name: '드레스업', category: [{}]},
    {_id: 1, name: '퍼포먼스', category: [{}]},
    {_id: 2, name: '편의장치', category: [{}]},
    {_id: 3, name: '캠핑카 튜닝', category: [{}]},
  ]);
  const scrollRef = useRef();
  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / Width_convert(375),
    );
    setPage(newPage);
  };

  const PageChangeValue = (Number) => {
    scrollRef.current?.scrollToIndex({animated: false, index: Number});
  };
  const [pickSecondCategory, setPickSecondCategory] = useState({});
  const PickSecondCategoryChangeValue = (object) => {
    setPickThirdCategory({});
    setPickSecondCategory(object);
  };
  const [pickThirdCategory, setPickThirdCategory] = useState({});
  const PickThirdCategoryChangeValue = (object) => {
    setPickThirdCategory(object);
  };
  const renderItem = (item) => {
    return (
      <>
        <View style={{width: Width_convert(125), backgroundColor: '#F1F1F1'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
            style={{flex: 1}}
            data={pages[item.index]?.category}
            windowSize={2}
            initialNumToRender={10}
            renderItem={(item2) => (
              <MiddleCategory
                item={item2}
                topIndex={item.index}
                pickSecondCategory={
                  pickSecondCategory?._id === item2.item._id
                    ? pickSecondCategory._id
                    : null
                }
                PickSecondCategoryChangeValue={
                  PickSecondCategoryChangeValue
                }></MiddleCategory>
            )}
            keyExtractor={(item) => String(item._id)}></FlatList>
        </View>
        <View style={{width: Width_convert(250), backgroundColor: '#FFFFFF'}}>
          {pickSecondCategory.index === item.index && (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              style={{flex: 1}}
              data={
                pickSecondCategory.index === item.index &&
                pickSecondCategory.category
              }
              windowSize={2}
              initialNumToRender={10}
              renderItem={(item3) => (
                <SmallCategory
                  item={item3}
                  PickThirdCategory={
                    pickThirdCategory?._id === item3.item._id
                      ? pickThirdCategory?._id
                      : null
                  }
                  PickThirdCategoryChangeValue={
                    PickThirdCategoryChangeValue
                  }></SmallCategory>
              )}
              keyExtractor={(item) => String(item._id)}></FlatList>
          )}
        </View>
      </>
    );
  };
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          left={'X'}
          Title={'작업종류'}
          navigation={props.navigation}
          nextPage={nextPage}
          Page={page}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={tabbarBottomValue}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FlatList
            ref={scrollRef}
            style={{
              height: '100%',
              width: '100%',
            }}
            automaticallyAdjustContentInsets={false}
            data={pages}
            decelerationRate="fast"
            horizontal
            keyExtractor={(item) => String(item._id)}
            onScroll={onScroll}
            pagingEnabled
            renderItem={renderItem}
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: Width_convert(375),
              offset: Width_convert(375) * index,
              index,
            })}
            initialScrollIndex={
              props.route.params.Title === '드레스업'
                ? 0
                : props.route.params.Title === '퍼포먼스'
                ? 1
                : props.route.params.Title === '편의장치'
                ? 2
                : props.route.params.Title === '캠핑카 튜닝'
                ? 3
                : 0
            }></FlatList>
        </View>
      </SafeAreaView>
      {searchModal && (
        <AlertModal1
          type={'1-1'}
          ShowModalChangeValue={SearchModalChangeValue}
          navigation={props.navigation}
          Title={"'대분류(상단메뉴) > 중분류(좌측메뉴)'까지 선택해주세요."}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      )}
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
export default CategoryScreen;
