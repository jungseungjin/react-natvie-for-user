import React from 'react';
import {Modal, View, TouchableOpacity, StatusBar} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import X from '../../../assets/home/x.svg';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Width_convert.js';
import StatusBarHeight from '../StatusBarHeight.js';
const ImageModal = (props) => {
  return (
    <Modal
      style={{flex: 1, backgroundColor: 'black'}}
      visible={props.visible}
      presentationStyle={'overFullScreen'}
      transparent={true}
      statusBarTranslucent={true}>
      <View
        style={{
          position: 'absolute',
          left: 20,
          right: 0,
          top: 40,
          zIndex: 13,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.setIsVisible(false);
          }}>
          <X width={16} height={16}></X>
        </TouchableOpacity>
      </View>
      <ImageViewer
        useNativeDriver={true}
        backgroundColor={'black'}
        enableSwipeDown={true}
        onRequestClose={() => {
          props.setIsVisible(false);
        }}
        onSwipeDown={() => {
          props.setIsVisible(false);
        }}
        index={props.visibleIndex}
        imageUrls={getImageSource(props.imageUrls)}
      />
      <View
        style={{
          width: Width_convert(375),
          height: 50,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          justifyContent: 'center',
          backgroundColor: 'black',
        }}></View>
    </Modal>
  );
};
const getImageSource = (image) => {
  let newArr = [];
  image.map((item) => {
    if (typeof item == 'number') {
    } else {
      newArr.push({
        url: item.toString(),
      });
    }
  });
  return newArr;
};

export default ImageModal;
