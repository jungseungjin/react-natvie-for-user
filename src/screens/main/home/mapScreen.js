import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x.svg';
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

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
const {StatusBarManager} = NativeModules;
const MapScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = React.useState(false);
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
  const [resentSearch, setResentSearch] = React.useState([]);
  React.useEffect(() => {
    getValue();
  }, []);

  const [searchText, setSearchText] = React.useState('');

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  function gotToMyLocation() {
    console.log('gotToMyLocation is called');
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        console.log('curent location: ', coords);
        console.log(this.map);
        if (this.map) {
          console.log('curent location: ', coords);
          this.map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      },
      (error) => alert('Error: Are location services on?'),
      {enableHighAccuracy: true},
    );
  }
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
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
            onChangeText={() => {}}
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
            placeholder={'주소검색'}
            //onKeyPress={this.handleKeyDown}
            // /handleKeyDown: function(e) {
            //   if(e.nativeEvent.key == "Enter"){
            //     dismissKeyboard();
            // }
          ></TextInput>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('MapSearch');
            }}
            style={{
              marginRight: Width_convert(22),
              width: Width_convert(20),
              height: Height_convert(20),
            }}>
            <Search></Search>
          </TouchableOpacity>
        </View>
        <View style={{width: Width_convert(375), height: Height_convert(600)}}>
          <NaverMapView
            style={{width: '100%', height: '100%', position: 'absolute'}}
            center={{...P0, zoom: 16}}
            scaleBar={false}
            zoomControl={false}
            rotateGesturesEnabled={false}
            useTextureView={false}
            onTouch={(e) =>
              console.warn('onTouch', JSON.stringify(e.nativeEvent))
            }
            onCameraChange={(e) =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={P0}
              onClick={() => console.warn('onClick! p0')}
            />
          </NaverMapView>
          <TouchableOpacity
            onPress={() => {
              alert('gdgd');
            }}
            style={{
              zIndex: 9999,
              width: 60,
              height: 60,
              position: 'absolute',
              bottom: 20,
              right: 20,
              borderRadius: 30,
              backgroundColor: '#d2d2d2',
            }}>
            <Text>gdgdgd</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: Width_convert(339),
              height: Height_convert(46),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Font_normalize(3),
              backgroundColor: '#946AEF',
              marginTop: Height_convert(18),
            }}>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              설정완료
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? <IsLoading></IsLoading> : null}
    </>
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
export default MapScreen;
