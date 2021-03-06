import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
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
import X from '../../../../assets/home/x_black.svg';
import DismissKeyboard from '../../../components/DismissKeyboard.js';
import AlertModal1 from '../../../components/Modal/AlertModal1.js';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Domain2 from '../../../../key/Domain2.js';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
const Feedback = (props) => {
  const reduexState = useSelector((state) => state);
  const [networkModal, setNetworkModal] = React.useState(false);
  const NetworkModalChangeValue = (text) => setNetworkModal(text);
  const [feedBackCompleteModel, setFeedBackCompleteModel] = React.useState(
    false,
  );
  const FeedBackCompleteModelChangeValue = (text) =>
    setFeedBackCompleteModel(text);
  const [title, setTitle] = React.useState('');
  const [contents, setContents] = React.useState('');

  const sendData = () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
          let url = Domain2 + 'feedback/register';
          let data = {};
          if (reduexState.loginDataCheck.login.login == true) {
            data = {
              _id: reduexState.loginDataCheck.login.data._id,
              title: title,
              contents: contents,
            };
          } else {
            data = {
              _id: 'no',
              title: title,
              contents: contents,
            };
          }
          data.getUniqueId = DeviceInfo.getUniqueId();
          data.getDeviceId = DeviceInfo.getDeviceId();
          data.getModel = DeviceInfo.getModel();
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data[0].message == 'ok') {
            setFeedBackCompleteModel(true);
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
  return (
    <DismissKeyboard>
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
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(contents) => setContents(contents)}
              value={contents}
              placeholder="투닝에게 뼈가 되고 살이 되는 피드백을 해주세요!"
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
              작성완료
            </Text>
          </TouchableOpacity>
        </View>
        {feedBackCompleteModel ? (
          <AlertModal1
            type={2}
            ShowModalChangeValue={FeedBackCompleteModelChangeValue}
            navigation={props.navigation}
            Title={
              '투닝에게 피드백을 해주셔서 감사합니다.\n\n여러분과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다!'
            }
            //BottomText={''}
            CenterButtonText={'확인'}></AlertModal1>
        ) : null}
        {networkModal ? (
          <AlertModal1
            type={1}
            ShowModalChangeValue={NetworkModalChangeValue}
            navigation={props.navigation}
            Title={'인터넷 연결을 확인해주세요.'}
            //BottomText={''}
            CenterButtonText={'닫기'}></AlertModal1>
        ) : null}
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default Feedback;
