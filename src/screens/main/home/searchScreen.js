import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeModules,
} from 'react-native';

const {StatusBarManager} = NativeModules;
const SearchScreen = ({navigation}) => {
  console.log(navigation);
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
  const [searchText, setSearchText] = React.useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          height: Height_convert(88) - statusBar,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: 'rgba(219,219,219,0.35)',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginLeft: Width_convert(22),
            marginRight: Width_convert(15),
            width: Width_convert(14),
            height: Height_convert(16),
          }}>
          <GoBack></GoBack>
        </TouchableOpacity>
        <TextInput
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          keyboardType="default"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          returnKeyType={'search'}
          onSubmitEditing={() => {}}
          style={{
            width: Width_convert(280),
            fontSize: Font_normalize(16),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '400',
            paddingTop: 0,
            paddingBottom: 0,
          }}
          placeholderTextColor="#A1A1A1"
          placeholder={'튜닝부품 or 작업, 튜닝샵 검색'}
          //onKeyPress={this.handleKeyDown}
          // /handleKeyDown: function(e) {
          //   if(e.nativeEvent.key == "Enter"){
          //     dismissKeyboard();
          // }
        ></TextInput>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            marginRight: Width_convert(22),
            width: Width_convert(20),
            height: Height_convert(20),
          }}>
          <Search></Search>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    //borderBottomColor: 'rgba(219,219,219,1)',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
});
export default SearchScreen;
