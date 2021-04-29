import React from 'react';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
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
import Domain from '../../../../key/Domain.js';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const Feedback = (props) => {
  const reduxState = useSelector((state) => state);
  const [isLoadingAndModal, setIsLoadingAndModal] = React.useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
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
          let url = `${Domain}api/customer/save/feedback`;
          let data = {};
          let newTitle = title;
          let newContents = contents;
          newTitle = newTitle.replace(/</gi, '');
          newTitle = newTitle.replace(/>/gi, '');
          newContents = newContents.replace(/</gi, '');
          newContents = newContents.replace(/>/gi, '');
          if (reduxState.loginDataCheck.login.login == true) {
            data = {
              writer: reduxState.loginDataCheck.login.data._id,
              device: {
                getUniqueId: DeviceInfo.getUniqueId(),
                getDeviceId: DeviceInfo.getDeviceId(),
                getModel: DeviceInfo.getModel(),
              },
              title: newTitle,
              contents: newContents,
            };
          } else {
            data = {
              writer: null,
              device: {
                getUniqueId: DeviceInfo.getUniqueId(),
                getDeviceId: DeviceInfo.getDeviceId(),
                getModel: DeviceInfo.getModel(),
              },
              title: newTitle,
              contents: newContents,
            };
          }
          let result = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (result.data.success === true) {
            setFeedBackCompleteModel(true);
          } else {
            setIsLoadingAndModal(3);
          }
        } else {
          setIsLoadingAndModal(2);
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoadingAndModal(3);
    }
  };
  return (
    <DismissKeyboard>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'#FFFFFF'}></StatusBar>
        <Tabbar
          left={'X'}
          Title={'피드백주기'}
          navigation={props.navigation}></Tabbar>
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
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
                paddingTop: Height_convert(15),
                paddingLeft: Width_convert(10),
                paddingRight: Width_convert(10),
                width: contents ? Width_convert(305) : Width_convert(375),
                minHeight: '100%',
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(15),
                color: '#000000',
                textAlignVertical: 'top',
              }}></TextInput>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            sendData();
          }}>
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
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(18),
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              작성완료
            </Text>
          </View>
        </TouchableOpacity>
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

export default Feedback;
