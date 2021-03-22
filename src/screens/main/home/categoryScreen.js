import React from 'react';
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
import Domain from '../../../../key/Domain.js';
import MiddleCategory from '../../../components/Home/Category/middleCategory.js';
import SmallCategory from '../../../components/Home/Category/smallCategory.js';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import {useSelector} from 'react-redux';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';

const CategoryScreen = (props) => {
  const reduxState = useSelector((state) => state);
  //완료버튼이 중분류 소분류까지 가능. 대분류는 말고!
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);

  const [searchModal, setSearchModal] = React.useState(false);
  const SearchModalChangeValue = (text) => setSearchModal(text);
  const [page, setPage] = React.useState(
    props.route.params.Title == '드레스업'
      ? 'dressup'
      : props.route.params.Title == '퍼포먼스'
      ? 'perfomance'
      : props.route.params.Title == '편의장치'
      ? 'convenience'
      : props.route.params.Title == '캠핑카 튜닝'
      ? 'camping'
      : 'dressup',
  );
  const [middleCategoryList, setMiddleCategoryList] = React.useState([]);
  const [pickMiddleCategory, setPickMiddleCategory] = React.useState({});
  const PickMiddleCategoryChangeValue = (object) =>
    setPickMiddleCategory(object);
  const get_middle_category_data = async (props) => {
    try {
      if (page) {
        let work_type;
        if (page == 'dressup') {
          work_type = 1;
        } else if (page == 'perfomance') {
          work_type = 2;
        } else if (page == 'convenience') {
          work_type = 3;
        } else if (page == 'camping') {
          work_type = 4;
        } else {
          return false;
        }

        NetInfo.addEventListener(async (state) => {
          if (state.isConnected) {
            let url = Domain + 'work_findAll?work_type=' + work_type;
            setIsLoadingAndModal(1);
            let result = await axios.get(url);
            setIsLoadingAndModal(0);
            if (result.data[0].type) {
              //get에서 type이 있으면 잘못된거
              alert(result.data[0].message);
            } else {
              setMiddleCategoryList(result.data);
              setPickMiddleCategory({});
              setSmallCategoryList([]);
              setPickSmallCategory({});
            }
          } else {
            setIsLoadingAndModal(2);
          }
        });
      }
    } catch (err) {
      console.log(err);
      setMiddleCategoryList([]);
      alert('잠시 후에 다시해주세요');
    }
  };
  const [smallCategoryList, setSmallCategoryList] = React.useState([]);
  const [pickSmallCategory, setPickSmallCategory] = React.useState({});
  const PickSmallCategoryChangeValue = (object) => setPickSmallCategory(object);
  const get_small_category_data = async (props) => {
    try {
      let work_sub_type_name;
      if (pickMiddleCategory?.work_sub_type_name) {
        work_sub_type_name = pickMiddleCategory.work_sub_type_name;
      } else {
        return false;
      }

      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url =
            Domain + 'work_findAll?work_sub_type_name=' + work_sub_type_name;
          setIsLoadingAndModal(1);
          let result = await axios.get(url);
          setIsLoadingAndModal(0);
          if (result.data[0].type) {
            //get에서 type이 있으면 잘못된거
            alert(result.data[0].message);
          } else {
            setSmallCategoryList(result.data);
            setPickSmallCategory({});
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setSmallCategoryList([]);
      alert('잠시 후에 다시해주세요');
    }
  };
  React.useEffect(() => {
    get_middle_category_data(props);
  }, [page]);
  React.useEffect(() => {
    get_small_category_data(props);
  }, [pickMiddleCategory]);
  const PageChangeValue = (text) => setPage(text);

  const getDataAndNavigate = () => {
    //props.route.params.Title 값으로 서버에서 작업데이터 가져오기.
    try {
      //선택한 작업종류를 가지고 백에서 데이터 받아서 ㄲ  필요한 데이터 -> 작업종류나열된것, 작업리스트
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          if (pickMiddleCategory._id) {
            //중분류 찍혀있음
            let url = `${Domain2}categoryworklist/first`;
            let result = await axios.get(url, {
              headers: {
                'Content-Type': 'application/json',
              },
              params: {
                page: page,
                middle: pickMiddleCategory.work_sub_type_name,
                small: pickSmallCategory._id,
                iu_car:
                  reduxState.loginDataCheck.login?.iu_car[0]?.pickModelDetail
                    ?.info_car_id || undefined,
                longitude:
                  reduxState.loginDataCheck.login?.location?.location
                    ?.longitude || undefined,
                latitude:
                  reduxState.loginDataCheck.login?.location?.location
                    ?.latitude || undefined,
              },
            });
            if (result.data[0].status == 'ok') {
              //무슨페이지인지
              //찍은 중분류가 무엇인지  나머지 중분류는 무엇인지
              //소분류 찍혔는지  찍혓다면 어떤??  나머지 소분류는 무엇인지
              props.navigation.navigate('CategoryDetail', {
                Page: page,
                SmallCategory: result.data[0].SmallCategory,
                MiddleCategory: result.data[0].MiddleCategory,
                WorkList: result.data[0].WorkList,
                PickMiddle: pickMiddleCategory.work_sub_type_name,
                PickSmall: pickSmallCategory._id,
                random: result.data[0].randomNumber,
              });
            } else {
            }
          } else {
            setSearchModal(true);
            //중분류도 안찍혀있음 -> 아무것도 안해  --- 나중에 모달띄우기 넣지
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          Title={'작업종류'}
          navigation={props.navigation}
          getDataAndNavigate={getDataAndNavigate}
          Page={page}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={[
            {title: '드레스업', value: 'dressup'},
            {title: '퍼포먼스', value: 'perfomance'},
            {title: '편의장치', value: 'convenience'},
            {title: '캠핑카', value: 'camping'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {/*카테고리 - 중분류 리스트 및 선택 시작 */}
          <View style={{width: Width_convert(125), backgroundColor: '#F1F1F1'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              style={{flex: 1}}
              data={middleCategoryList}
              windowSize={2}
              initialNumToRender={10}
              renderItem={({item}) => (
                <MiddleCategory
                  item={item}
                  PickMiddleCategory={
                    pickMiddleCategory == item ? pickMiddleCategory : null
                  }
                  PickMiddleCategoryChangeValue={
                    PickMiddleCategoryChangeValue
                  }></MiddleCategory>
              )}
              keyExtractor={(item) => String(item._id)}></FlatList>
          </View>
          {/*카테고리 - 중분류 리스트 및 선택 끝 */}
          {/*카테고리 - 소분류 리스트 및 선택 시작 */}
          <View style={{width: Width_convert(250), backgroundColor: '#FFFFFF'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              style={{flex: 1}}
              data={smallCategoryList}
              windowSize={2}
              initialNumToRender={10}
              renderItem={({item}) => (
                <SmallCategory
                  item={item}
                  PickSmallCategory={
                    pickSmallCategory == item ? pickSmallCategory : null
                  }
                  PickSmallCategoryChangeValue={
                    PickSmallCategoryChangeValue
                  }></SmallCategory>
              )}
              keyExtractor={(item) => String(item._id)}></FlatList>
          </View>
          {/*카테고리 - 소분류 리스트 및 선택 끝 */}
        </View>
      </SafeAreaView>
      {searchModal ? (
        <AlertModal1
          type={'1-1'}
          ShowModalChangeValue={SearchModalChangeValue}
          navigation={props.navigation}
          Title={"'대분류(상단메뉴) > 중분류(좌측메뉴)'까지 선택해주세요."}
          //BottomText={''}
          CenterButtonText={'확인'}></AlertModal1>
      ) : null}
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
