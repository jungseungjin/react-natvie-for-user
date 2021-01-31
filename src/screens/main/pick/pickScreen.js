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
const PickScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState('work');
  const [editMode, setEditMode] = React.useState(route.params.editMode);
  console.log(editMode);
  const [workList, setWorkList] = React.useState([
    {tt: '1'},
    {tt: '2'},
    {tt: '3'},
    {tt: '4'},
  ]);
  const [storeList, setStoreList] = React.useState([
    {tt: '1'},
    {tt: '2'},
    {tt: '3'},
    {tt: '4'},
  ]);
  const PageChangeValue = (text) => {
    setPage(text);
  };
  const EditModeChangeValue = (text) => {
    setEditMode(text);
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          Title={'찜한작업'}
          EditMode={editMode}
          EditModeChangeValue={EditModeChangeValue}></Tabbar>
        <TabBarBottom
          from={'category'}
          Title={[
            {title: '튜닝작업', value: 'work'},
            {title: '튜닝샵', value: 'store'},
          ]}
          nowValue={page}
          PageChangeValue={PageChangeValue}></TabBarBottom>
        <ScrollView>
          {page == 'work'
            ? workList.length > 0
              ? workList.map((item) => <WorkPick key={item.tt}></WorkPick>)
              : null
            : page == 'store'
            ? storeList.length > 0
              ? storeList.map((item) => <StorePick key={item.tt}></StorePick>)
              : null
            : null}
        </ScrollView>
        {/*하단 초기화 삭제하기버튼 시작*/}
        {/*SafeAreaView안쓸때 bottom:0 이랑 쓸때 bottom:0의 위치가 다를거야. */}
        {editMode ? (
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
                onPress={() => {}}
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
        ) : null}
        {/*하단 초기화 삭제하기버튼 끝*/}
      </SafeAreaView>
    </>
  );
};
export default PickScreen;
