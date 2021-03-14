import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FrequentlyQuestionMenu from '../../../components/More/Menu/frequentlyQuestionMenu.js';
import BracketDown from '../../../../assets/home/braket_down.svg';
import BracketUp from '../../../../assets/home/braket_up.svg';
import X from '../../../../assets/home/x_black.svg';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import {useSelector} from 'react-redux';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const OneOnOneRevise = (props) => {
  const reduexState = useSelector((state) => state);
  const [contentsLengthModal, setContentsLengthModal] = React.useState(false);
  const ContentsLengthModalChangeValue = (text) => setContentsLengthModal(text);
  const [title, setTitle] = React.useState(props.route.params.item.title);
  const [contents, setContents] = React.useState(
    props.route.params.item.contents,
  );
  const sendData = () => {
    try {
      if (contents.length > 9) {
      } else {
        setContentsLengthModal(true);
        return false;
      }
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'question/revise';
          let data = {
            _id: reduexState.loginDataCheck.login.data._id,
            question_id: props.route.params.item._id,
            title: title,
            contents: contents,
          };
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            props.navigation.navigate('OneOnOne');
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
  return (
    <DismissKeyboard>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'#FFFFFF'}></StatusBar>
        <Tabbar Title={'1:1문의'} navigation={props.navigation}></Tabbar>
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
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            onChangeText={(title) => setTitle(title)}
            value={title}
            placeholderStyle={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#A1A1A1',
              textAlignVertical: 'center',
            }}
            style={{
              width: Width_convert(305),
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
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(contents) => setContents(contents)}
              value={contents}
              placeholderStyle={{
                minHeight: Height_convert(812),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(15),
                color: '#A1A1A1',
                textAlignVertical: 'top',
              }}
              style={{
                width: Width_convert(305),
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              sendData();
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(18),
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              수정완료
            </Text>
          </TouchableOpacity>
        </View>
        {contentsLengthModal ? (
          <AlertModal1
            ShowModalChangeValue={ContentsLengthModalChangeValue}
            navigation={props.navigation}
            Title={'내용을 10자 이상 입력해주세요.'}
            //BottomText={''}
            CenterButtonText={'확인'}></AlertModal1>
        ) : null}
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
    </DismissKeyboard>
  );
};

export default OneOnOneRevise;
