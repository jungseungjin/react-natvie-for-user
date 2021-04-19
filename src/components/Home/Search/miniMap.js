import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import NaverMapView, {Marker} from 'react-native-nmap';
const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: Width_convert(194),
    alignItems: 'center',
  },
  naverMapView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
const miniMap = (props) => {
  let coordinate = {
    latitude: parseFloat(props.coordinates[1]),
    longitude: parseFloat(props.coordinates[0]),
    zoom: 14,
  };
  return (
    <View style={styles.view}>
      <NaverMapView
        style={styles.naverMapView}
        center={coordinate}
        scaleBar={false}
        zoomControl={false}
        rotateGesturesEnabled={false}
        useTextureView={false}
        scrollGesturesEnabled={false}>
        <Marker coordinate={coordinate} pinColor={'green'} onClick={() => {}} />
      </NaverMapView>
    </View>
  );
};

export default memo(miniMap);
