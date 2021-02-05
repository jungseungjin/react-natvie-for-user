import React from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Height from '../../../components/Height.js';
import Width from '../../../components/Width.js';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Tabbar from '../../../components/Pick/Tabbar/tabbar.js';
import TabBarBottom from '../../../components/Pick/Tabbar/tabbarBottom.js';
import WorkPick from '../../../components/Pick/Work/workPick.js';
import StorePick from '../../../components/Pick/Store/storePick.js';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
const PickScreen = (props) => {
  const reduexState = useSelector((state) => state);
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState('work');
  const [workList, setWorkList] = React.useState([
    {tt: '1', _id: '1'},
    {tt: '2', _id: '2'},
    {tt: '3', _id: '3'},
    {tt: '4', _id: '4'},
  ]);
  const [storeList, setStoreList] = React.useState([
    {tt: '1', _id: '11'},
    {tt: '2', _id: '22'},
    {tt: '3', _id: '33'},
    {tt: '4', _id: '44'},
  ]);
  const PageChangeValue = (text) => {
    setPage(text);
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar Title={'찜한작업'}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={[
            {title: '튜닝작업', value: 'work'},
            {title: '튜닝샵', value: 'store'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          data={page == 'work' ? workList : page == 'store' ? storeList : null}
          windowSize={2}
          initialNumToRender={10}
          renderItem={({item}) =>
            page == 'work' ? (
              <WorkPick
                key={item.tt}
                editMode={reduexState.editModeCheck.editMode}></WorkPick>
            ) : page == 'store' ? (
              <StorePick
                key={item.tt}
                editMode={reduexState.editModeCheck.editMode}></StorePick>
            ) : null
          }
          keyExtractor={(item) => String(item._id)}></FlatList>
        {reduexState.editModeCheck.editMode ? (
          <View
            style={{
              width: Width_convert(375),
              height: Width_convert(55) + Height_convert(insets.bottom),
            }}></View>
        ) : null}
        {/*하단 초기화 삭제하기버튼 시작*/}
        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        {reduexState.editModeCheck.editMode ? (
          <>
            <View
              style={{
                width: Width_convert(375),
                height: Width_convert(55) + Height_convert(insets.bottom),
                position: 'absolute',
                bottom: 0,
              }}>
              <View
                style={{
                  height: Width_convert(55),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {}}
                  style={{
                    height: Width_convert(55),
                    width: Width_convert(375) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#818181',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(15),
                      fontWeight: '700',
                      color: '#FFFFFF',
                    }}>
                    초기화
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (reduexState.editModeCheck.editMode) {
                      props.updateEditMode(!reduexState.editModeCheck.editMode);
                    }
                  }}
                  style={{
                    height: Width_convert(55),
                    width: Width_convert(375) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#946AEF',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(15),
                      fontWeight: '700',
                      color: '#EEEEEE',
                    }}>
                    삭제하기
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: Height_convert(insets.bottom),
                  backgroundColor: '#FFFFFF',
                }}></View>
            </View>
          </>
        ) : null}
        {/*하단 초기화 삭제하기버튼 끝*/}
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
  );
};

function mapStateToProps(state) {
  return {
    editMode: state.editMode,
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEditMode: (boo) => {
      dispatch(ActionCreator.editModeCheck(boo));
    },
    // updateFirst:(num) => {
    //     dispatch(ActionCreator.updateSumValueFirst(num));

    // },
    // updateSecond:(num) => {
    //     dispatch(ActionCreator.updateSumValueSecond(num));
    // }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PickScreen);
