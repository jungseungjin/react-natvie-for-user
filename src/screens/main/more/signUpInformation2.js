import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import {TextInput} from 'react-native-gesture-handler';
import XButton from '../../../../assets/home/x_button.svg';
import Search from '../../../../assets/home/search.svg';
const SignUpInformation = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [authButtonClick, setAuthButtonClick] = React.useState(false);
  const [authNumber, setAuthNumber] = React.useState('');
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'회원가입2'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          marginLeft: Width_convert(24),
          marginRight: Width_convert(24),
          marginTop: Height_convert(50),
          width: Width_convert(327),
          height: Width_convert(95),
        }}>
        {/*차량검색 */}
        <View
          style={{
            width: Width_convert(327),
            height: Width_convert(35),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              width: Width_convert(285),
              height: Width_convert(35),
            }}>
            <TextInput
              placeholder="회원님의 소중한 차량은 무엇인가요?"
              placeholderTextColor="#CCCCCC"
              value={phoneNumber}
              onChangeText={(value) => {
                setPhoneNumber(value);
              }}
              placeholderStyle={{
                paddingLeft: Width_convert(10),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
                lineHeight: Font_normalize(14),
              }}
              style={{
                height: Width_convert(40),
                paddingLeft: Width_convert(5),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(14),
                fontWeight: '400',
                color: '#000000',
                lineHeight: Font_normalize(14),
              }}></TextInput>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: Width_convert(35),
              height: Width_convert(35),
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomColor: '#CCCCCC',
              borderTopColor: '#CCCCCC',
              borderLeftColor: '#CCCCCC',
              borderRightColor: '#CCCCCC',
              borderRadius: Font_normalize(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Search></Search>
          </TouchableOpacity>
        </View>
        {/*차량검색 */}
      </View>
    </SafeAreaView>
  );
};
export default SignUpInformation;
