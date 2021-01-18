import React, {Component} from 'react';
import {
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

export default function NaverMap() {
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
      <NaverMapView
        style={{width: '100%', height: '100%', position: 'absolute'}}
        center={{...P0, zoom: 16}}
        scaleBar={false}
        zoomControl={false}
        rotateGesturesEnabled={false}
        useTextureView={false}
        onTouch={(e) => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={(e) =>
          console.warn('onCameraChange', JSON.stringify(e))
        }
        onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
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
    </>
  );
}
