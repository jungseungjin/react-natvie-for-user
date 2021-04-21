import React, {memo} from 'react';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import Width_convert from '../Width_convert.js';
import Height_convert from '../Height_convert.js';
import Fonts from '../Fonts.js';
import Font_normalize from '../Font_normalize.js';
const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(32, 32, 32, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNested: (type) => {
    return {
      width: Width_convert(331),
      height:
        type === 1 || type === '1-1'
          ? Width_convert(158)
          : type === 2
          ? Width_convert(231)
          : type === 3
          ? Width_convert(185)
          : null,
    };
  },
  viewNestedNested: (type) => {
    return {
      borderTopRightRadius: Font_normalize(7),
      borderTopLeftRadius: Font_normalize(7),
      width: Width_convert(331),
      height: Width_convert(102),
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#DBDBDB',
      borderBottomWidth: 1,
      height:
        type === 1
          ? Width_convert(102)
          : type === 2
          ? Width_convert(175)
          : type === '1-1'
          ? Width_convert(102)
          : null,
    };
  },
  viewNestedNestedText: (type) => {
    return {
      fontFamily: Fonts?.NanumGothicRegular || null,
      fontWeight: '400',
      fontSize: Font_normalize(16),
      color: '#000000',
      textAlign: type === 1 ? 'center' : null,
      width:
        type === 2 || type === 3
          ? Width_convert(289)
          : type === '1-1'
          ? Width_convert(289)
          : null,
    };
  },
  touch: {
    borderBottomWidth: 1,
    borderBottomColor: '#946AEF',
    marginTop: Height_convert(14),
    marginRight: Width_convert(27),
    marginLeft: 'auto',
  },
  text: {
    fontFamily: Fonts?.NanumGothicRegular || null,
    fontSize: Font_normalize(12),
    fontWeight: '400',
    color: '#946AEF',
  },
  touch2: {
    borderBottomRightRadius: Font_normalize(7),
    borderBottomLeftRadius: Font_normalize(7),
    width: Width_convert(331),
    height: Width_convert(56),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  text2: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(16),
    fontWeight: '700',
    color: '#53A9F8',
  },
});
const AlertModal1 = (props) => {
  return (
    <>
      <View style={styles.view}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgba(32, 32, 32, 0.5)'}></StatusBar>
        <Modal
          //isVisible Props에 State 값을 물려주어 On/off control
          isVisible={true}
          //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          onRequestClose={() => {
            props.Title === '24시간 이내에는 재가입이 불가합니다.' &&
              props.SendData();
            props.ShowModalChangeValue(false);
          }}
          backdropColor={'#202020'}
          backdropOpacity={0.3}
          style={styles.modal}>
          <View style={styles.viewNested(props.type)}>
            <View style={styles.viewNestedNested(props.type)}>
              <View>
                <Text style={styles.viewNestedNestedText(props.type)}>
                  {props.Title}
                </Text>
              </View>
              {props.BottomText && (
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
                  style={styles.touch}>
                  <Text style={styles.text}>{props.BottomText}</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.touch2}
              onPress={() => {
                if (
                  props.Title ==
                  '투닝에게 피드백을 해주셔서 감사합니다.\n\n여러분과 함께 튜닝시장을 변화시켜나가는 투닝이 되도록 노력하겠습니다!'
                ) {
                  props.ShowModalChangeValue(false);
                  props.navigation.goBack();
                } else if (
                  props.Title ==
                  '비밀번호가 변경되어 로그아웃 되었습니다.\n 로그인 페이지로 이동합니다.'
                ) {
                  props.ShowModalChangeValue(false);
                } else if (
                  props.Title === '24시간 이내에는 재가입이 불가합니다.'
                ) {
                  props.SendData();
                  props.ShowModalChangeValue(false);
                } else {
                  props.ShowModalChangeValue(false);
                }
              }}>
              <Text style={styles.text2}>{props.CenterButtonText}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default AlertModal1;
