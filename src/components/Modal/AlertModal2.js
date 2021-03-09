import React from 'react';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  View,
  Linking,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';

const AlertModal2 = (props) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(32, 32, 32, 0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgba(32, 32, 32, 0.5)'}></StatusBar>
        <Modal
          //isVisible Props에 State 값을 물려주어 On/off control
          isVisible={true}
          //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          backdropColor={'#202020'}
          backdropOpacity={0.3}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              {
                width: Width_convert(331),
              },
              props.type === 1
                ? {
                    height: Width_convert(158),
                  }
                : props.type === 2
                ? {
                    height: Width_convert(185),
                  }
                : {},
            ]}>
            <View
              style={[
                {
                  borderTopRightRadius: Font_normalize(7),
                  borderTopLeftRadius: Font_normalize(7),
                  width: Width_convert(331),
                  height: Width_convert(102),
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#DBDBDB',
                  borderBottomWidth: 1,
                },
                props.type === 1
                  ? {
                      height: Width_convert(102),
                    }
                  : props.type === 2
                  ? {
                      height: Width_convert(129),
                    }
                  : {},
              ]}>
              <View>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontWeight: '400',
                      fontSize: Font_normalize(16),
                      color: '#000000',
                    },
                    props.type === 1
                      ? {
                          textAlign: 'center',
                        }
                      : props.type === 2
                      ? {
                          width: Width_convert(289),
                        }
                      : {},
                  ]}>
                  {props.Title}
                </Text>
              </View>
              {props.BottomText ? (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (
                      props.Title ===
                      "'홈화면 > 설정' 에서 지역설정을 해주셔야만 가까운 순 필터 사용이 가능합니다."
                    ) {
                      props.ShowModalChangeValue(false);
                      props.navigation.navigate('Setting');
                    } else {
                      props.ShowModalChangeValue(false);
                      props.navigation.navigate('Setting');
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#946AEF',
                    marginTop: Height_convert(14),
                    marginRight: Width_convert(27),
                    marginLeft: 'auto',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.NanumGothicRegular || null,
                      fontSize: Font_normalize(14),
                      fontWeight: '400',
                      color: '#946AEF',
                    }}>
                    {props.BottomText}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  borderBottomLeftRadius: Font_normalize(7),
                  width: Width_convert(331) / 2,
                  borderRightWidth: 1,
                  borderRightColor: '#DBDBDB',
                  height: Width_convert(56),
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 9999,
                }}
                onPress={() => {
                  if (
                    props.Title ===
                      '지역 설정 검색을 위해서 권한이 필요합니다. 권한을 허용하시겠습니까?' &&
                    props.LocationChangeValue
                  ) {
                    //아니오 누름 -> 주소검색창으로 이동
                    props.ShowModalChangeValue(false);
                    props.PageChangeValue('mapSearch');
                  } else {
                    props.ShowModalChangeValue(false);
                  }
                }}>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(16),
                      fontWeight: '700',
                      color: '#53A9F8',
                    },
                  ]}>
                  {props.LeftButtonTitle}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={{
                  borderBottomRightRadius: Font_normalize(7),
                  width: Width_convert(331) / 2,
                  height: Width_convert(56),
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 9999,
                }}
                onPress={() => {
                  if (
                    props.Title ===
                      '지역 설정을 위해 위치서비스를 켜 주세요.' ||
                    props.Title ===
                      '지역 설정 검색을 위해서 권한이 필요합니다. 권한을 허용하시겠습니까?'
                  ) {
                    props.ShowModalChangeValue(false);
                    Linking.openSettings();
                  } else if (
                    props.Title ===
                    '고객님의 차종과 지역을 설정하지 않은 경우에는 임의 작업이 검색됩니다.'
                  ) {
                    props.ShowModalChangeValue(false);
                    props.navigation.navigate('Category', {
                      Title: props.pickButtonTitle,
                    });
                  } else if (
                    props.Title ===
                    "'홈화면 > 설정' 에서 지역설정을 해주셔야만 가까운 순 필터 사용이 가능합니다."
                  ) {
                    props.ShowModalChangeValue(false);
                  } else if (props.Title == '문의를 삭제하시겠습니까?') {
                    props.ShowModalChangeValue(false);
                    props.DeleteQuestion();
                  } else if (props.Title == '후기를 삭제하시겠습니까?') {
                    props.ShowModalChangeValue(false);
                    props.DeleteReview();
                  } else if (
                    props.Title == '찜한 항목을 삭제하시겠습니까?' ||
                    props.Title == '최근 본 항목을 삭제하시겠습니까?'
                  ) {
                    props.ShowModalChangeValue(false);
                    props.Delete();
                  }
                }}>
                <Text
                  style={[
                    {
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(16),
                      fontWeight: '700',
                      color: '#53A9F8',
                    },
                  ]}>
                  {props.RightButtonTitle}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default AlertModal2;
