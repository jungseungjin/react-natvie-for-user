import React from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import X from '../../../assets/home/x.svg';
const ImageModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      presentationStyle={'fullScreen'}
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
        props: {
          // headers: ...
        },
      });
    }
  });
  return newArr;
};

export default ImageModal;
