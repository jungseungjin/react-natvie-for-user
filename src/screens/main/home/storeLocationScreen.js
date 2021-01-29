import React from 'react';
import {
  View,
  NativeModules,
  StatusBar,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import GoBackWhite from '../../../../assets/home/goBackWhite.svg';
const {StatusBarManager} = NativeModules;
const StoreLocationScreen = ({navigation}) => {
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <StatusBar
          translucent
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(94) - statusBar,
            position: 'absolute',
            flexDirection: 'row',
            top: statusBar,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={{}}
              onPress={() => {
                navigation.goBack();
              }}>
              <GoBackWhite
                fill={'#000000'}
                style={{
                  marginLeft: Width_convert(22),
                }}></GoBackWhite>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(16),
                fontWeight: '700',
                color: '#000000',
                textAlign: 'center',
              }}>
              MOTION튜닝
            </Text>
          </View>
          <View
            style={{
              marginRight: Width_convert(17),
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: 'row',
              }}
              onPress={() => {}}>
              {/* <HeartWhite
          fill={'#000000'}></HeartWhite>
        <Text
          style={[
            {
              marginTop: 'auto',
              marginBottom: 0,
              fontFamily: Fonts?.NanumSquareRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(6),
            },
            scrollValue > Width_convert(240) - statusBar
              ? {color: '#000000'}
              : {color: '#FFFFFF'},
          ]}>
          123
        </Text> */}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(812) - (Height_convert(94) - statusBar),
            position: 'absolute',
            top: Height_convert(94),
          }}>
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
      </SafeAreaView>
    </>
  );
};
export default StoreLocationScreen;
