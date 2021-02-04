import React from 'react';
import {View, StatusBar, SafeAreaView, Text, NativeModules} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FrequentlyQuestionMenu from '../../../components/More/Menu/frequentlyQuestionMenu.js';
import BracketDown from '../../../../assets/home/braket_down.svg';
import BracketUp from '../../../../assets/home/braket_up.svg';
const {StatusBarManager} = NativeModules;
import X from '../../../../assets/home/x_black.svg';
const Feedback = (props) => {
  const [page, setPage] = React.useState('TOP5');
  const PageChangeValue = (text) => setPage(text);
  const [dataList, setDataList] = React.useState([]);
  const [statusBar, setStatusBar] = React.useState(0);
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'피드백주기'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          borderBottomColor: 'rgba(219, 219, 219, 0.35)',
          borderBottomWidth: 1,
        }}></View>
      <View
        style={{
          marginLeft: Width_convert(35),
          marginTop: Height_convert(27),
          width: Width_convert(305),
          height: Width_convert(46),
          borderRadius: Font_normalize(5),
          backgroundColor: '#EDEDED',
          justifyContent: 'center',
        }}>
        <TextInput
          placeholder="제목"
          placeholderStyle={{
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '700',
            fontSize: Font_normalize(15),
            color: '#A1A1A1',
            textAlignVertical: 'center',
          }}
          style={{
            paddingLeft: Width_convert(7),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '700',
            fontSize: Font_normalize(15),
            color: '#000000',
            textAlignVertical: 'center',
          }}></TextInput>
      </View>
      <View
        style={{
          marginLeft: Width_convert(35),
          marginTop: Height_convert(10),
          width: Width_convert(305),
          height: Width_convert(391),
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopColor: '#000000',
          borderBottomWColor: '#000000',
          borderLeftColor: '#000000',
          borderRightColor: '#000000',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            multiline={true}
            placeholder="문의 내용을 10자 이상 입력해주세요"
            placeholderStyle={{
              minHeight: Height_convert(812),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#A1A1A1',
              textAlignVertical: 'top',
            }}
            style={{
              minHeight: Height_convert(812),
              paddingLeft: Width_convert(7),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#000000',
              textAlignVertical: 'top',
            }}></TextInput>
        </ScrollView>
      </View>
      <View
        style={{
          width: Width_convert(305),
          marginLeft: Width_convert(35),
          height: Width_convert(46),
          marginTop: Height_convert(22),
          backgroundColor: '#946AEF',
          borderRadius: Font_normalize(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontSize: Font_normalize(18),
              fontWeight: '700',
              color: '#FFFFFF',
            }}>
            작성완료
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
